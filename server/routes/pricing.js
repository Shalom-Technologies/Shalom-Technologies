const express = require('express');
const { ADD_ONS, BASE_SITE_PRICE, DEPOSIT_PERCENTAGE, CURRENCY, CURRENCY_SYMBOL } = require('../config/pricing');

const router = express.Router();

// Public and read-only — just exposes the current catalog/pricing config so
// the frontend always reflects the real, authoritative numbers rather than a
// hand-maintained duplicate that can drift out of sync.
router.get('/', (req, res) => {
  res.status(200).json({
    currency: CURRENCY,
    currencySymbol: CURRENCY_SYMBOL,
    basePrice: BASE_SITE_PRICE,
    depositPercentage: DEPOSIT_PERCENTAGE,
    addOns: ADD_ONS,
  });
});

module.exports = router;