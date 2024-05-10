"use client";

import { BLOCK_SIZE } from "@/lib/data";

function MapBackGround({ size }: { size: number }) {
  return (
    <div>
      {[...Array(size / BLOCK_SIZE - 1)].map((_, index) => (
        <div
          key={"horizontal" + index}
          style={{
            top: (index + 1) * BLOCK_SIZE,
          }}
          className={`w-full absolute left-0 border-b border-b-gray-100`}
        ></div>
      ))}
      {[...Array(size / BLOCK_SIZE - 1)].map((_, index) => (
        <div
          key={"vertical" + index}
          style={{
            left: (index + 1) * BLOCK_SIZE,
          }}
          className={`h-full absolute top-0 border-l border-l-gray-100`}
        ></div>
      ))}
    </div>
  );
}

export { MapBackGround };
