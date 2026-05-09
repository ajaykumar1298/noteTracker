import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteLogin({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return <Navigate to="/note" replace />;
  }

  return children;
}

export default ProtectedRouteLogin;
