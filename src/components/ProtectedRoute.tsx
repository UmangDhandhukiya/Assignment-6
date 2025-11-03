import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Defines a higher-order component (HOC) used to protect routes that require user authentication.
 * Parameters: { children } (The component(s) to render if the user is authenticated).
 * The component checks the authentication status from the Redux store. If authenticated, it renders the children; otherwise, it redirects the user to the login page.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
