import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import LoadingState from "../../shared/components/LoadingState";

const ProtectedDashboard = () => {
  let { isAuthenticated, isloading } = useSelector((Store) => Store.Auth);

  if (isloading)
    return (
      <div className="h-screen w-screen flex align-center justify-center">
        <LoadingState />
      </div>
    );
  if (!isAuthenticated) return <Navigate to={"/auth/login"} />;
  return <Outlet />;
};

export default ProtectedDashboard;
