import React from "react";

const PublicProblem = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">
          why to use ? Selling on WhatsApp feels messy.
        </h2>

        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {[
            "Lost chats",
            "Missed orders",
            "Manual replies",
            "No customer data",
          ].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl p-6 shadow-sm text-center font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicProblem;
