import React from "react";
import jwt_decode from "jwt-decode";
import { Outlet } from "react-router-dom";
import { getToken } from "./utils/utils";

/**
 * ProtectedRoutes
 * Return component asked if user authentificate or redirect to the home page
 * @returns {Component}
 */
const ProtectedRoutes = () => {
  var token = getToken();

  if (token) {
    const user = jwt_decode(token);
    if (!user) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return null;
    }
    return <Outlet />;
  } else {
    window.location.href = "/login";
    return null;
  }
};

export default ProtectedRoutes;
