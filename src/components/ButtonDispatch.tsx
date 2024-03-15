"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";

export default function ButtonDispatch() {
  const router = useRouter();
  const { isAuth, role } = useAppSelector((state) => state.auth.value);

  const handleSubmit = () => {
    if (!isAuth) router.push("/login");
    else if (role === "m") router.push(`/${role}-home`);
    else router.push(`/${role}-map`);
  };
  return (
    <div className="animate-fadeTopIn2 delay-300">
      <Button
        name="My Dashboard"
        className="p-3 px-4"
        onClickFunction={handleSubmit}
      ></Button>
    </div>
  );
}
