import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';


const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children;
};

export default ProtectedRoute;
