const crypto = require('crypto');
const { applyPatch } = require('diff');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30 * 1000,
});

// ---------------------------------------------------------------------------
// Model tiering: use the strongest model only where quality really matters
// (the initial mockup, since it's the client's first impression), and cheaper
// models for the higher-frequency / lower-stakes calls (tweaks happen up to
// 5x per project; summarization is pure text transformation).
// ---------------------------------------------------------------------------
const MOCKUP_MODEL = process.env.OPENAI_MOCKUP_MODEL || 'gpt-4o-mini';
const TWEAK_MODEL = process.env.OPENAI_TWEAK_MODEL || 'gpt-4o-mini';
const SUMMARY_MODEL = process.env.OPENAI_SUMMARY_MODEL || 'gpt-4o-mini';

// Hard caps on output length. Mockups are HTML documents so they need real
// room, but capping still protects you from a runaway/looping generation
// burning far more tokens (and money) than intended.
const MAX_TOKENS_MOCKUP = 4000;
const MAX_TOKENS_TWEAK_PATCH = 1500; // a diff patch is much smaller than a full doc
const MAX_TOKENS_TWEAK_FULL = 4000; // fallback path, same ceiling as initial generation
const MAX_TOKENS_SUMMARY = 800;

// Only this many most-recent conversation turns are sent as context to the
// model on each call. The full conversation is still stored in Mongo (the
// caller passes the whole array) — this just trims what gets sent to OpenAI,
// since input tokens are cost too and history grows every tweak.
const MAX_HISTORY_TURNS_FOR_CONTEXT = 6;

// Very small in-memory cache to avoid paying for an identical mockup twice
// (e.g. a user double-clicks submit, or a request gets retried after a
// network blip). Keyed by a hash of the description. For a single Node
// process this is fine; if you run multiple server instances, swap this for
// a shared cache (Redis) so the dedupe works across processes.
const mockupCache = new Map();
const CACHE_MAX_ENTRIES = 200;

function hashKey(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function trimHistory(conversationHistory) {
  return conversationHistory.slice(-MAX_HISTORY_TURNS_FOR_CONTEXT);
}

function historyToText(conversationHistory) {
  return trimHistory(conversationHistory)
    .map((entry) => `${entry.role.toUpperCase()}: ${entry.message}`)
    .join('\n');
}

// Logs token usage for every call so you can track real per-project spend.
// Swap this for a proper metrics/logging pipeline once you're past the
// prototype stage.
function logUsage(label, response) {
  const usage = response.usage;
  if (usage) {
    console.log(
      `[openai:${label}] prompt=${usage.prompt_tokens} completion=${usage.completion_tokens} total=${usage.total_tokens}`
    );
  }
}

// ---------------------------------------------------------------------------
// Shared system rules that every generation call must obey. Keeping this in
// one place means if you ever tighten the "no backend" constraint, you only
// have to edit it once.
// ---------------------------------------------------------------------------
const MOCKUP_CONSTRAINTS = `
You generate DEMO WEBSITE MOCKUPS ONLY. Strict rules:
- Output a single self-contained HTML document (inline <style> and <script> tags only).
- No external network calls: no fetch(), no XMLHttpRequest, no form actions pointing at real URLs, no imports of remote scripts except widely-used CDN libraries (e.g. Tailwind CDN, Google Fonts) if helpful.
- No real backend behavior. Forms and buttons may only simulate behavior client-side (e.g. show a fake "Message sent!" toast via JS), never actually submit anywhere.
- Do not include comments claiming functionality that isn't real.
- Keep it visually polished: real layout, spacing, color choices, responsive basics.
- Return ONLY valid JSON matching the provided schema. No markdown fences, no prose outside the JSON.
`;

/**
 * Generate an initial static mockup from a plain-language description.
 * @param {string} description
 * @returns {Promise<{ code: string }>}
 */
async function generateMockup(description) {
  const cacheKey = hashKey(description.trim().toLowerCase());
  if (mockupCache.has(cacheKey)) {
    console.log('[openai:generateMockup] cache hit — skipped API call');
    return mockupCache.get(cacheKey);
  }

  const response = await openai.chat.completions.create({
    model: MOCKUP_MODEL,
    max_tokens: MAX_TOKENS_MOCKUP,
    messages: [
      { role: 'system', content: MOCKUP_CONSTRAINTS },
      {
        role: 'user',
        content: `Build a demo mockup for this site description:\n\n"${description}"`,
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'mockup_response',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
              description: 'A complete, self-contained HTML document string.',
            },
          },
          required: ['code'],
          additionalProperties: false,
        },
      },
    },
  });

  logUsage('generateMockup', response);
  const parsed = JSON.parse(response.choices[0].message.content);

  if (mockupCache.size >= CACHE_MAX_ENTRIES) {
    const oldestKey = mockupCache.keys().next().value;
    mockupCache.delete(oldestKey);
  }
  mockupCache.set(cacheKey, parsed);

  return parsed; // { code }
}

const PATCH_SCHEMA = {
  name: 'tweak_patch_response',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      patch: {
        type: 'string',
        description:
          'A unified diff patch (standard `diff -u` format, with --- and +++ headers and @@ hunks) transforming the CURRENT HTML into the UPDATED HTML. Include only the changed lines plus a few lines of surrounding context per hunk — do not output the entire file.',
      },
      assistantReply: {
        type: 'string',
        description: 'A short, friendly confirmation of what changed, shown in the chat UI.',
      },
    },
    required: ['patch', 'assistantReply'],
    additionalProperties: false,
  },
};

const FULL_SCHEMA = {
  name: 'tweak_full_response',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'The full updated HTML document after applying the tweak.',
      },
      assistantReply: {
        type: 'string',
        description: 'A short, friendly confirmation of what changed, shown in the chat UI.',
      },
    },
    required: ['code', 'assistantReply'],
    additionalProperties: false,
  },
};

// The model occasionally returns a patch where line breaks are the literal
// two characters "\" + "n" rather than a real newline (0x0A) — this happens
// even though response_format enforces valid JSON, because the issue is in
// the *content* of the string, not the JSON encoding around it. A unified
// diff parser can't find line boundaries in that case. This repairs it when
// detected: if the patch has essentially no real newlines but does contain
// literal "\n" sequences, convert them to real breaks before parsing.
function normalizePatchText(patch) {
  const realNewlineCount = (patch.match(/\n/g) || []).length;
  const literalNewlineCount = (patch.match(/\\n/g) || []).length;

  if (realNewlineCount < 2 && literalNewlineCount > realNewlineCount) {
    return patch.replace(/\\n/g, '\n');
  }
  return patch;
}

// applyPatch() throws on a malformed patch rather than returning false, so
// this wrapper normalizes the answer to `null` on any parse/apply failure —
// callers can then fall back to full regeneration without a crash.
function tryApplyPatch(currentCode, patchText) {
  try {
    const normalized = normalizePatchText(patchText);
    const result = applyPatch(currentCode, normalized);
    return result === false ? null : result;
  } catch (err) {
    console.warn('[openai:applyTweak] patch parsing threw:', err.message);
    return null;
  }
}

/**
 * Apply a single tweak instruction to the existing mockup, using the
 * conversation so far as context for tone/intent.
 *
 * Cost optimization: the model is first asked for a small unified diff patch
 * rather than the full HTML document. A tweak like "make the button blue"
 * might touch 3 lines out of a 200-line file — asking for a patch instead of
 * a full regeneration cuts output tokens dramatically. If the patch fails to
 * apply cleanly (the model occasionally gets diff formatting wrong, or emits
 * malformed line breaks), we fall back to the more expensive full-regeneration
 * path so correctness is never sacrificed for cost savings.
 *
 * @param {string} currentCode
 * @param {Array<{role: 'user'|'assistant', message: string}>} conversationHistory
 * @param {string} tweakInstruction
 * @returns {Promise<{ code: string, assistantReply: string, method: 'patch'|'full' }>}
 */
async function applyTweak(currentCode, conversationHistory, tweakInstruction) {
  const historyText = historyToText(conversationHistory);

  const patchResponse = await openai.chat.completions.create({
    model: TWEAK_MODEL,
    max_tokens: MAX_TOKENS_TWEAK_PATCH,
    messages: [
      { role: 'system', content: MOCKUP_CONSTRAINTS },
      {
        role: 'user',
        content: `Here is the current mockup HTML:\n\n${currentCode}\n\nRecent conversation:\n${historyText}\n\nNew tweak request: "${tweakInstruction}"\n\nApply ONLY this tweak (plus anything it necessarily implies). Return a unified diff patch, not the full file. The patch must use REAL line breaks between lines — never the literal two characters backslash-n.`,
      },
    ],
    response_format: { type: 'json_schema', json_schema: PATCH_SCHEMA },
  });

  logUsage('applyTweak:patch', patchResponse);
  const patchParsed = JSON.parse(patchResponse.choices[0].message.content);

  const patched = tryApplyPatch(currentCode, patchParsed.patch);

  if (patched !== null) {
    return { code: patched, assistantReply: patchParsed.assistantReply, method: 'patch' };
  }

  // Patch didn't apply cleanly — fall back to asking for the full document.
  console.warn('[openai:applyTweak] falling back to full regeneration');

  const fullResponse = await openai.chat.completions.create({
    model: TWEAK_MODEL,
    max_tokens: MAX_TOKENS_TWEAK_FULL,
    messages: [
      { role: 'system', content: MOCKUP_CONSTRAINTS },
      {
        role: 'user',
        content: `Here is the current mockup HTML:\n\n${currentCode}\n\nRecent conversation:\n${historyText}\n\nNew tweak request: "${tweakInstruction}"\n\nApply ONLY this tweak (plus anything it necessarily implies), keep everything else the same, and return the full updated HTML document.`,
      },
    ],
    response_format: { type: 'json_schema', json_schema: FULL_SCHEMA },
  });

  logUsage('applyTweak:full-fallback', fullResponse);
  const fullParsed = JSON.parse(fullResponse.choices[0].message.content);
  return { code: fullParsed.code, assistantReply: fullParsed.assistantReply, method: 'full' };
}

/**
 * Summarize the original description + full tweak conversation into a
 * structured brief a human developer can build from directly.
 * @param {string} description
 * @param {Array<{role: 'user'|'assistant', message: string}>} conversationHistory
 * @returns {Promise<{ summary: string, pages: string[], features: string[], styleNotes: string[], openQuestions: string[] }>}
 */
async function summarizeBrief(description, conversationHistory) {
  // Unlike the tweak/generation calls, the brief genuinely benefits from the
  // FULL conversation (a developer needs the whole history, not just recent
  // turns) — so this is the one place we intentionally don't trim. It's a
  // single call per project though (not per-tweak), so the cost is bounded
  // regardless of how long the conversation gets.
  const historyText = conversationHistory
    .map((entry) => `${entry.role.toUpperCase()}: ${entry.message}`)
    .join('\n');

  const response = await openai.chat.completions.create({
    model: SUMMARY_MODEL,
    max_tokens: MAX_TOKENS_SUMMARY,
    messages: [
      {
        role: 'system',
        content:
          'You convert a client\'s site description and their back-and-forth tweak requests into a clear, structured build brief for a human web developer. Be concrete and specific. Do not invent requirements the client did not state or clearly imply.',
      },
      {
        role: 'user',
        content: `Original description:\n"${description}"\n\nFull tweak conversation:\n${historyText}\n\nProduce a structured brief for the developer who will build the real site.`,
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'brief_response',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            summary: {
              type: 'string',
              description: 'A 2-4 sentence plain-language overview of what the client wants.',
            },
            pages: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of pages/sections the site should have.',
            },
            features: {
              type: 'array',
              items: { type: 'string' },
              description: 'Specific functional requirements mentioned (e.g. "contact form that emails owner").',
            },
            styleNotes: {
              type: 'array',
              items: { type: 'string' },
              description: 'Visual/tone preferences (colors, mood, references to other sites, etc).',
            },
            openQuestions: {
              type: 'array',
              items: { type: 'string' },
              description: 'Anything ambiguous or unstated that the developer should confirm with the client.',
            },
          },
          required: ['summary', 'pages', 'features', 'styleNotes', 'openQuestions'],
          additionalProperties: false,
        },
      },
    },
  });

  logUsage('summarizeBrief', response);
  const parsed = JSON.parse(response.choices[0].message.content);
  return parsed;
}

module.exports = {
  generateMockup,
  applyTweak,
  summarizeBrief,
};