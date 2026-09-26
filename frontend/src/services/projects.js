import api from './api';

export const listProjects = async (includeArchived = false, includeStats = true) => {
  const response = await api.get('/projects/', { params: { include_archived: includeArchived, include_stats: includeStats } });
  return response.data;
};

export const getProject = async (projectId, includeStats = true) => {
  const response = await api.get(`/projects/${projectId}`, { params: { include_stats: includeStats } });
  return response.data;
};

export const createProject = async (payload) => {
  const response = await api.post('/projects/', payload);
  return response.data;
};

export const updateProject = async (projectId, payload) => {
  const response = await api.put(`/projects/${projectId}`, payload);
  return response.data;
};

export const archiveProject = async (projectId) => {
  const response = await api.delete(`/projects/${projectId}`);
  return response.data;
};

export const restoreProject = async (projectId) => {
  const response = await api.post(`/projects/${projectId}/restore`);
  return response.data;
};

export const deleteProjectPermanent = async (projectId) => {
  const response = await api.delete(`/projects/${projectId}`, { params: { permanent: true } });
  return response.data;
};
