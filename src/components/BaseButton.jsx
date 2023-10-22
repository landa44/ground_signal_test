import React from "react";

export default function BaseButton({ children, handleClick = () => {} }) {
  return (
    <button
      className="m-2 bg-blue-500 rounded py-2 px-4 text-white shadow-md hover:bg-blue-300 transition-all"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
