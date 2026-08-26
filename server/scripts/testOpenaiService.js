// server/scripts/testOpenaiService.js
require('dotenv').config();
const { generateMockup, applyTweak, summarizeBrief } = require('../services/openaiService');

(async () => {
  console.log('--- generateMockup ---');
  const mockup = await generateMockup('A portfolio site for a freelance photographer, moody dark theme');
  console.log(mockup.code.slice(0, 300), '...\n');

  console.log('--- applyTweak ---');
  const tweak = await applyTweak(
    mockup.code,
    [{ role: 'user', message: 'A portfolio site for a freelance photographer, moody dark theme' }],
    'Make the hero section full-screen and add a contact section at the bottom'
  );
  console.log(tweak.assistantReply);
  console.log(tweak.code.slice(0, 300), '...\n');

  console.log('--- summarizeBrief ---');
  const brief = await summarizeBrief(
    'A portfolio site for a freelance photographer, moody dark theme',
    [
      { role: 'user', message: 'Make the hero full-screen and add a contact section' },
      { role: 'assistant', message: 'Done — hero is now full-screen with a contact section added at the bottom.' },
    ]
  );
  console.log(JSON.stringify(brief, null, 2));
})();