const nodemailer = require('nodemailer');

// Fires a Slack incoming webhook. No-ops (logs only) if SLACK_WEBHOOK_URL
// isn't set, so this is safe to call in dev without Slack configured.
async function notifySlack(project) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log('[notify] SLACK_WEBHOOK_URL not set, skipping Slack notification');
    return;
  }

  const text = [
    `:memo: *New project ready for build* (#${project._id})`,
    `*Description:* ${project.description}`,
    `*Tweaks used:* ${project.tweaksUsed}/5`,
    `*Brief:* ${project.finalBrief.slice(0, 500)}${project.finalBrief.length > 500 ? '…' : ''}`,
  ].join('\n');

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  } catch (err) {
    // Notification failures should never break the finalize flow itself —
    // the project is already saved as pending_build regardless.
    console.error('[notify] Slack webhook failed:', err.message);
  }
}

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST) return null;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

// Sends an email to your team inbox. No-ops (logs only) if SMTP env vars
// aren't configured.
async function notifyEmail(project) {
  const t = getTransporter();
  const teamEmail = process.env.TEAM_NOTIFICATION_EMAIL;

  if (!t || !teamEmail) {
    console.log('[notify] SMTP or TEAM_NOTIFICATION_EMAIL not set, skipping email notification');
    return;
  }

  try {
    await t.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@yourapp.com',
      to: teamEmail,
      subject: `New project ready for build (#${project._id})`,
      text: `Description: ${project.description}\n\nTweaks used: ${project.tweaksUsed}/5\n\nBrief:\n${project.finalBrief}`,
    });
  } catch (err) {
    console.error('[notify] Email send failed:', err.message);
  }
}

// Fires both notification channels. Each is independently optional and
// independently non-blocking to the finalize flow.
async function notifyTeamProjectFinalized(project) {
  await Promise.allSettled([notifySlack(project), notifyEmail(project)]);
}

module.exports = { notifyTeamProjectFinalized };