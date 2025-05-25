// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { signup as apiSignup, login as apiLogin, logout as apiLogout } from '../services/authService';
import axios from 'axios';

const API_BASE_URL = 'http://52.79.184.1:8080';

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false); // ✅ 추가

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setInitialized(true); // ✅ 초기화 완료 시점
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
      delete API.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const signup = async data => {
    setLoading(true);
    try {
      await apiSignup(data);
    } finally {
      setLoading(false);
    }
  };

  const login = async credentials => {
    setLoading(true);
    try {
      const jwt = await apiLogin(credentials);
      localStorage.setItem('token', jwt);
      setToken(jwt);
    } finally {
      setLoading(false);
    }
  };

  const oauthLogin = async ({ provider, code }) => {
    setLoading(true);
    try {
      const res = await API.get(`/api/v1/auth/oauth2/code/${provider}?code=${code}`);
      const jwt = res.data.token;
      localStorage.setItem('token', jwt);
      setToken(jwt);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, initialized, signup, login, oauthLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
