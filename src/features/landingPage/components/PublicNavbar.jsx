import React from "react";
import { useNavigate } from "react-router";

const PublicNavbar = () => {
  let navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-600">ChatSell</h1>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#features">Features</a>
          <a href="#how">How it Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/auth/login")}
            className="px-4 py-2 rounded-xl border"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth/login")}
            className="px-4 py-2 rounded-xl bg-green-600 text-white"
          >
            Start Free
          </button>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
