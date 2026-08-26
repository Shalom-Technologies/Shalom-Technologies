const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

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
  const response = await openai.chat.completions.create({
    model: MODEL,
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

  const parsed = JSON.parse(response.choices[0].message.content);
  return parsed; // { code }
}

/**
 * Apply a single tweak instruction to the existing mockup, using the
 * conversation so far as context for tone/intent.
 * @param {string} currentCode
 * @param {Array<{role: 'user'|'assistant', message: string}>} conversationHistory
 * @param {string} tweakInstruction
 * @returns {Promise<{ code: string, assistantReply: string }>}
 */
async function applyTweak(currentCode, conversationHistory, tweakInstruction) {
  const historyText = conversationHistory
    .map((entry) => `${entry.role.toUpperCase()}: ${entry.message}`)
    .join('\n');

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: MOCKUP_CONSTRAINTS },
      {
        role: 'user',
        content: `Here is the current mockup HTML:\n\n${currentCode}\n\nConversation so far:\n${historyText}\n\nNew tweak request: "${tweakInstruction}"\n\nApply ONLY this tweak (plus anything it necessarily implies), keep everything else the same, and return the full updated HTML document. Also return a short, friendly one-sentence reply confirming what you changed, to show the client in the chat.`,
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'tweak_response',
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
      },
    },
  });

  const parsed = JSON.parse(response.choices[0].message.content);
  return parsed; // { code, assistantReply }
}

/**
 * Summarize the original description + full tweak conversation into a
 * structured brief a human developer can build from directly.
 * @param {string} description
 * @param {Array<{role: 'user'|'assistant', message: string}>} conversationHistory
 * @returns {Promise<{ summary: string, pages: string[], features: string[], styleNotes: string[], openQuestions: string[] }>}
 */
async function summarizeBrief(description, conversationHistory) {
  const historyText = conversationHistory
    .map((entry) => `${entry.role.toUpperCase()}: ${entry.message}`)
    .join('\n');

  const response = await openai.chat.completions.create({
    model: MODEL,
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

  const parsed = JSON.parse(response.choices[0].message.content);
  return parsed;
}

module.exports = {
  generateMockup,
  applyTweak,
  summarizeBrief,
};