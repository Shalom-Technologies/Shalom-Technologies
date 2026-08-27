import api from './axios';

export async function registerRequest({ email, password, name }) {
  const { data } = await api.post('/auth/register', { email, password, name });
  return data; // { token, user }
}

export async function loginRequest({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // { token, user }
}

export async function meRequest() {
  const { data } = await api.get('/auth/me');
  return data; // { user }
}