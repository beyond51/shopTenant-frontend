import React from "react";
import { useNavigate } from "react-router";

const PublicHero = () => {
  let navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
          Built for WhatsApp Sellers
        </p>

        <h2 className="text-5xl font-bold leading-tight">
          Turn WhatsApp Chats Into Real Orders
        </h2>

        <p className="mt-5 text-lg text-slate-600">
          Create a catalog, manage orders, track customers and grow your
          business from one clean dashboard.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/auth/login")}
            className="px-6 py-3 rounded-2xl bg-green-600 text-white font-semibold"
          >
            Start Free
          </button>

          <button className="px-6 py-3 rounded-2xl border font-semibold">
            Watch Demo
          </button>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-sm text-slate-500">Sellers</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">10k+</h3>
            <p className="text-sm text-slate-500">Orders</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">24/7</h3>
            <p className="text-sm text-slate-500">Support</p>
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="bg-slate-100 rounded-3xl p-6 shadow-xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4">
            <p className="text-sm text-slate-500">Orders</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>

          <div className="bg-white rounded-2xl p-4">
            <p className="text-sm text-slate-500">Revenue</p>
            <h3 className="text-2xl font-bold">₹8,450</h3>
          </div>

          <div className="bg-white rounded-2xl p-4">
            <p className="text-sm text-slate-500">Pending</p>
            <h3 className="text-2xl font-bold">3</h3>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-4">
          <h3 className="font-semibold mb-4">Recent Orders</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Riya - Kurti</span>
              <span className="text-green-600">New</span>
            </div>

            <div className="flex justify-between">
              <span>Aman - Saree</span>
              <span>Packed</span>
            </div>

            <div className="flex justify-between">
              <span>Neha - Suit</span>
              <span>Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicHero;
