const Project = require('../models/Project');
const { generateMockup, applyTweak, summarizeBrief } = require('../services/openaiService');
const { notifyTeamProjectFinalized } = require('../services/notificationService');

const VALID_STATUSES = ['generating', 'reviewing', 'pending_build', 'in_development', 'live'];

// Shared ownership check: a project can only be viewed/modified by the user
// who created it, or by an admin. Returns the project doc if allowed, or
// sends a response and returns null if not.
async function loadOwnedProject(req, res) {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return null;
  }

  const isOwner = project.userId.toString() === req.user.id;
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    res.status(403).json({ error: 'You do not have access to this project' });
    return null;
  }

  return project;
}

async function createProject(req, res) {
  try {
    const { description } = req.body;

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide a description (at least 10 characters)' });
    }

    const project = await Project.create({
      userId: req.user.id,
      description: description.trim(),
      status: 'generating',
      conversation: [{ role: 'user', message: description.trim() }],
    });

    const { code } = await generateMockup(description.trim());

    project.mockupCode = code;
    project.mockupHistory.push({ code });
    project.status = 'reviewing';
    await project.save();

    return res.status(201).json(project);
  } catch (err) {
    console.error('createProject error:', err);
    return res.status(500).json({ error: 'Failed to generate your mockup. Please try again.' });
  }
}

async function getProject(req, res) {
  try {
    const project = await loadOwnedProject(req, res);
    if (!project) return; // response already sent by loadOwnedProject

    return res.status(200).json(project);
  } catch (err) {
    console.error('getProject error:', err);
    return res.status(500).json({ error: 'Failed to fetch project' });
  }
}

async function tweakProject(req, res) {
  try {
    const project = await loadOwnedProject(req, res);
    if (!project) return;

    const { message } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Tweak message is required' });
    }

    if (project.status !== 'reviewing') {
      return res.status(400).json({ error: 'This project is no longer open for tweaks' });
    }
    if (project.tweaksUsed >= 5) {
      return res.status(400).json({ error: 'You have used all 5 available tweaks for this project' });
    }

    const { code, assistantReply } = await applyTweak(
      project.mockupCode,
      project.conversation,
      message.trim()
    );

    project.conversation.push({ role: 'user', message: message.trim() });
    project.conversation.push({ role: 'assistant', message: assistantReply });
    project.mockupHistory.push({ code });
    project.mockupCode = code;
    project.tweaksUsed += 1;

    await project.save();

    return res.status(200).json(project);
  } catch (err) {
    console.error('tweakProject error:', err);
    return res.status(500).json({ error: 'Failed to apply your tweak. Please try again.' });
  }
}

async function finalizeProject(req, res) {
  try {
    const project = await loadOwnedProject(req, res);
    if (!project) return;

    if (project.status !== 'reviewing') {
      return res.status(400).json({ error: 'This project cannot be finalized in its current state' });
    }

    const brief = await summarizeBrief(project.description, project.conversation);

    project.finalBrief = JSON.stringify(brief, null, 2);
    project.status = 'pending_build';
    await project.save();

    // Notification failures should never block finalize from succeeding —
    // the project is already saved as pending_build at this point.
    notifyTeamProjectFinalized(project).catch((err) =>
      console.error('finalizeProject notification error:', err)
    );

    return res.status(200).json(project);
  } catch (err) {
    console.error('finalizeProject error:', err);
    return res.status(500).json({ error: 'Failed to finalize your project. Please try again.' });
  }
}

// Admin-only: a human builder updates a project's pipeline status, and
// optionally attaches the live URL once deployed.
async function updateStatus(req, res) {
  try {
    const { status, liveUrl, assignedTo } = req.body;

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (status) project.status = status;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (assignedTo !== undefined) project.assignedTo = assignedTo;

    await project.save();
    return res.status(200).json(project);
  } catch (err) {
    console.error('updateStatus error:', err);
    return res.status(500).json({ error: 'Failed to update project status' });
  }
}

module.exports = { createProject, getProject, tweakProject, finalizeProject, updateStatus };