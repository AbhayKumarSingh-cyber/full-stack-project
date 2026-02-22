import axios from 'axios';
const API_BASE = 'http://localhost:5000/api/users';

export const getUsers = (page, limit) => axios.get(`${API_BASE}?page=${page}&limit=${limit}`);
export const searchUsers = (query) => axios.get(`${API_BASE}/search?q=${query}`);
export const addUser = (data) => axios.post(API_BASE, data);
export const editUser = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE}/${id}`);
export const exportUsers = () => axios.get(`${API_BASE}/export`, { responseType: 'blob' });