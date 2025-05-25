import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, initialized } = useContext(AuthContext);
  if (!initialized) return null;
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
