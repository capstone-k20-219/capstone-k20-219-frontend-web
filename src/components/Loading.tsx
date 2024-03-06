"use client";

import React from "react";

export default function Loading() {
  return (
    <div
      className="w-full h-[100dvh] flex items-center justify-center 
    text-2xl font-bold bg-black/10"
    >
      <div className="loading-ring"></div>
    </div>
  );
}
