import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoggedInRoute = ({ children }) => {
  const { token, initialized } = useContext(AuthContext);
  if (!initialized) return null;            // 초기 로딩 대기
  return token ? <Navigate to="/myaccount" replace /> : children;
};

export default LoggedInRoute;
