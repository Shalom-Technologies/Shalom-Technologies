import api from './axios';

export async function createProject(description) {
  const { data } = await api.post('/projects', { description });
  return data; // project object
}

export async function getProject(id) {
  const { data } = await api.get(`/projects/${id}`);
  return data; // project object
}

export async function tweakProject(id, message) {
  const { data } = await api.post(`/projects/${id}/tweak`, { message });
  return data; // updated project object
}

export async function finalizeProject(id) {
  const { data } = await api.post(`/projects/${id}/finalize`);
  return data; // updated project object
}