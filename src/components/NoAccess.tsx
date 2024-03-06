"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function NoAccess() {
  const router = useRouter();
  return (
    <div
      className="w-full h-full flex flex-col gap-4
    items-center justify-center text-2xl font-bold"
    >
      NoAccess
      <Button
        type={"button"}
        name="Go Back"
        className="text-lg py-3 px-4 rounded-md"
        onClickFunction={() => {
          router.back();
        }}
      />
    </div>
  );
}
