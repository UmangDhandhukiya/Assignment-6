import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
