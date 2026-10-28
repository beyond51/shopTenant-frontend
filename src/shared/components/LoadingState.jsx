import React from "react";

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col items-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <svg
            className="h-8 w-8 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M3 10h18M5 10l1.5-5h11L19 10M5 10v9h14v-9M9 19v-5h6v5"
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-slate-900">
          Loading your shops
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Just a moment, we're getting things ready.
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600" />
          <span className="ml-2 text-xs text-slate-500">Please wait...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
