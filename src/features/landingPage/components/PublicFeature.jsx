import React from "react";

const PublicFeature = () => {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Everything You Need</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            ["Catalog", "Create shareable product store"],
            ["Orders", "Track every order status"],
            ["Customers", "See repeat buyers"],
            ["Quick Replies", "Save time instantly"],
            ["Payments", "Collect UPI links"],
            ["Analytics", "Know what sells"],
          ].map(([title, desc]) => (
            <div key={title} className="border rounded-3xl p-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicFeature;
