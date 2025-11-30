import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`px-3 py-2 border border-white/20 bg-white/10 backdrop-blur-xl text-white rounded-xl outline-none focus:border-white/40 transition ${className}`}
    />
  );
}
