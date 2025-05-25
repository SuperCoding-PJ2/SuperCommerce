// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { signup as apiSignup, login as apiLogin, logout as apiLogout } from '../services/authService';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
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
      // 백엔드에서 code 교환 후 JWT 리턴
      const res = await axios.get(`/api/v1/auth/oauth2/code/${provider}?code=${code}`);
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
  };

  return (
    <AuthContext.Provider value={{ token, loading, signup, login, oauthLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
