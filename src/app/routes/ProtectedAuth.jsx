import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedAuth = () => {
  let { isAuthenticated, tenant } = useSelector((Store) => Store.Auth);
  
  if (isAuthenticated)
    return <Navigate to={`/${tenant.shopDomain}/dashboard`} />;
  return <Outlet />;
};

export default ProtectedAuth;
