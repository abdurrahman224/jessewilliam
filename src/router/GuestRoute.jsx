import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = () => {
  // Simulated auth info (replace with real auth context)
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/dash/gpt" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
