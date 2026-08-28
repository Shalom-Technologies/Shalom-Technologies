const express = require('express');
const { rateLimit, ipKeyGenerator } = require('express-rate-limit');
const {
  createProject,
  listProjects,
  getProject,
  tweakProject,
  selectAddOns,
  payDeposit,
  finalizeProject,
  updateStatus,
} = require('../controllers/projectController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// These two routes trigger paid OpenAI calls, so they're the ones that most
// need protection against runaway cost from a single user hammering the API.
// Keyed by user id (not IP) since these routes are already behind
// requireAuth — that's a more meaningful limit than per-IP for logged-in
// endpoints, and avoids punishing multiple users behind the same IP (e.g.
// office/school networks). The req.ip fallback (for the rare case req.user
// is somehow missing) is run through ipKeyGenerator so IPv6 addresses are
// normalized consistently and can't be used to dodge the limit.
function perUserKey(req) {
  return req.user?.id || ipKeyGenerator(req.ip);
}

const createProjectLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 new projects per user per hour
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: perUserKey,
  message: { error: 'Too many projects created recently. Please try again later.' },
});

const tweakLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // well above the natural cap of 5 tweaks/project, just guards against abuse across many projects
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: perUserKey,
  message: { error: 'Too many tweak requests recently. Please try again later.' },
});

router.post('/', requireAuth, createProjectLimiter, createProject);
router.get('/', requireAuth, listProjects);
router.get('/:id', requireAuth, getProject);
router.post('/:id/tweak', requireAuth, tweakLimiter, tweakProject);
router.post('/:id/addons', requireAuth, selectAddOns);
router.post('/:id/pay-deposit', requireAuth, payDeposit);
router.post('/:id/finalize', requireAuth, finalizeProject);
router.patch('/:id/status', requireAuth, requireAdmin, updateStatus);

module.exports = router;