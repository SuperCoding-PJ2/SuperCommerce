/* src/services/authService.js */
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://52.79.184.1:8080/api/v1/auth',
});

export const signup = async ({ email, password, phone, address, gender }) => {
  const res = await API.post('/signup', { email, password, phone, address, gender });
  return res.data;
};

export const login = async ({ email, password }) => {
  const res = await API.post('/login', { email, password });
  return res.data.token;
};

export const logout = async () => {
  await API.post('/logout');
};