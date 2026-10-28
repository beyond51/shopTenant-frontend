import React from "react";

const PublicPricing = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Simple Pricing</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="border rounded-3xl p-8">
            <h3 className="text-xl font-semibold">Free</h3>
            <p className="text-4xl font-bold mt-4">₹0</p>
            <ul className="mt-6 space-y-2 text-slate-600">
              <li>10 products</li>
              <li>Basic dashboard</li>
              <li>WhatsApp links</li>
            </ul>
          </div>

          <div className="border-2 border-green-600 rounded-3xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold">Pro</h3>
            <p className="text-4xl font-bold mt-4">₹299</p>
            <ul className="mt-6 space-y-2 text-slate-600">
              <li>Unlimited products</li>
              <li>Orders + CRM</li>
              <li>Analytics</li>
            </ul>
          </div>

          <div className="border rounded-3xl p-8">
            <h3 className="text-xl font-semibold">Growth</h3>
            <p className="text-4xl font-bold mt-4">₹999</p>
            <ul className="mt-6 space-y-2 text-slate-600">
              <li>Team members</li>
              <li>Automation</li>
              <li>Priority support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicPricing;
