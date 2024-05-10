import React from "react";

export default function LoadingIcon({
  size,
  ringSize,
}: {
  size: number;
  ringSize: number;
}) {
  return (
    <div
      className="rounded-full border-white border-opacity-50
    border-t-neutral-700 animate-[spin_3s_linear_finite]"
      style={{ width: size, height: size, borderWidth: ringSize }}
    ></div>
  );
}
