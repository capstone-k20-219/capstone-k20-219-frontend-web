"use client";

import React from "react";
import LoadingIcon from "./LoadingIcon";

export default function Loading() {
  return (
    <div
      className="w-full h-full flex items-center justify-center 
    text-2xl font-bold bg-black/10"
    >
      <LoadingIcon />
    </div>
  );
}
