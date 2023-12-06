"use client";
import NextTopLoader from "nextjs-toploader";

export const TopLoaderProvider = () => {
  return (
    <NextTopLoader
      height={2}
      color="#27AE60"
      easing="cubic-bezier(0.5,0.21,0,1)"
      showSpinner={false}
    />
  );
};
