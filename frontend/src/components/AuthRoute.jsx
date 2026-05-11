import React from "react";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    return <Navigate to="/note" replace />;
  }

  return children;
}

export default AuthRoute;
