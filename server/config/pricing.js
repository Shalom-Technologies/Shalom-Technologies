// ---------------------------------------------------------------------------
// PLACEHOLDER PRICING — adjust these to your real numbers whenever you're
// ready. Everything else in the app reads from this one file, so changing a
// number here is the only change needed to update pricing app-wide.
// Currency is USD here purely as a placeholder; swap CURRENCY/SYMBOL for KES
// (or per-country pricing) whenever you decide on your actual model.
// ---------------------------------------------------------------------------

const CURRENCY = 'USD';
const CURRENCY_SYMBOL = '$';

const BASE_SITE_PRICE = 300; // flat price for the base website build

const DEPOSIT_PERCENTAGE = 0.15; // 15% deposit, per your spec

const ADD_ONS = [
  {
    id: 'seo',
    name: 'SEO Optimization',
    description:
      'Search-engine-friendly structure, meta tags, and content guidance so customers can find your site.',
    price: 80,
  },
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    description: 'A built-in AI assistant that answers customer questions and captures leads 24/7.',
    price: 150,
  },
];

function getAddOnById(id) {
  return ADD_ONS.find((a) => a.id === id);
}

module.exports = {
  CURRENCY,
  CURRENCY_SYMBOL,
  BASE_SITE_PRICE,
  DEPOSIT_PERCENTAGE,
  ADD_ONS,
  getAddOnById,
};