import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth.js';

const RequireAuth = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  if (isAuth === null) {
    // Loading state
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default RequireAuth;
