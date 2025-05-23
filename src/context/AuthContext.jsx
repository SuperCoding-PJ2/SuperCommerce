/* src/context/AuthContext.jsx */
import React, { createContext, useState, useEffect } from 'react';
import {
  signup as apiSignup,
  login as apiLogin,
  logout as apiLogout,
  getUserProfile as apiGetUserProfile,
} from '../services/authService';
import axios from 'axios';

export const AuthContext = createContext({
  token: null,
  user: null,
  loading: false,
  signup: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 토큰이 바뀔 때마다 axios 헤더 설정 & 프로필 fetch
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // 로그인 상태 복원 시에는 프로필도 다시 가져오기
      apiGetUserProfile()
          .then(profile => setUser(profile))
          .catch(() => {
            // 실패 시 토큰 무효 처리
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          });
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
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
      // 1) 토큰 발급
      const jwt = await apiLogin(credentials);
      localStorage.setItem('token', jwt);
      setToken(jwt);

      // 2) 유저 프로필 조회
      const profile = await apiGetUserProfile();
      setUser(profile);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
    } finally {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  return (
      <AuthContext.Provider value={{ token, user, loading, signup, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};
