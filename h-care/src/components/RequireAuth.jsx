import React from 'react';
import { Navigate } from 'react-router-dom';
import { currentUser } from '../utils/auth.js';

const RequireAuth = ({ children }) => {
  const user = currentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;
