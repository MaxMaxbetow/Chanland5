import React from "react";

export function Button({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 text-white transition ${className}`}
    >
      {children}
    </button>
  );
}
