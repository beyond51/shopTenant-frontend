import React from "react";

const PublicWork = () => {
  return (
    <section id="how" className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            ["1", "Create Store"],
            ["2", "Share on WhatsApp"],
            ["3", "Get Orders & Manage"],
          ].map(([num, title]) => (
            <div
              key={num}
              className="bg-white rounded-3xl p-8 text-center shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto font-bold">
                {num}
              </div>

              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicWork;
