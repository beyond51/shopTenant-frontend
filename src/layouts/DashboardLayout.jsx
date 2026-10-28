import React from "react";
// import { removeUser } from "../shared/Slices/LoginSlice";
import SellerNavbar from "../shared/components/Navbar";

import Sidebar from "../shared/components/Sidebar";
import Navbar from "../shared/components/Navbar";
import { Outlet } from "react-router";
const DashboardLayout = () => {
  return (
    <div className="container-shell">
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <main className="content-area">
        {/* Navbar */}
        <Navbar />
        {/* Content */}
        <div className="page-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
