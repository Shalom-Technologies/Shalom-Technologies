import api from './axios';

export async function getPricing() {
  const { data } = await api.get('/pricing');
  return data; // { currency, currencySymbol, basePrice, depositPercentage, addOns }
}

export async function selectAddOns(projectId, addOnIds) {
  const { data } = await api.post(`/projects/${projectId}/addons`, { addOnIds });
  return data; // updated project with subtotal/depositAmount
}

export async function payDeposit(projectId) {
  const { data } = await api.post(`/projects/${projectId}/pay-deposit`);
  return data; // updated project with depositPaid: true
}