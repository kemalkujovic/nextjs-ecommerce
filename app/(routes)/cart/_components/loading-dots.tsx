import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <span className="sr-only">Loading...</span>
      <div className="h-3 w-3 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 bg-neutral-400 rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingDots;
