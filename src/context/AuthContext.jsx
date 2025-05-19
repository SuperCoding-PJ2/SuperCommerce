/* src/context/AuthContext.jsx */
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
    }
  }, [token]);

  const signup = async (data) => {
    setLoading(true);
    try {
      await apiSignup(data);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const token = await apiLogin(credentials);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setToken(token);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
