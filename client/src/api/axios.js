import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach the stored JWT to every request automatically, so individual
// pages/components never have to remember to set the header themselves.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('shalom_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;