import Logo from "@/img/logo-black.png";
import React from "react";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PakiSlot | Login",
  description: "The user login to system by account.",
};

export default function Login() {
  return (
    <div
      id="login-page"
      className="flex justify-center w-full h-dvh items-center text-base"
    >
      <div className="shadow-none sm:shadow-lg bg-none sm:bg-white flex flex-col gap-8 w-full items-start p-10 rounded-lg sm:w-3/5 lg:w-2/5">
        <div className="flex flex-col ml-px gap-3 w-full items-start">
          <Image
            src={Logo}
            loading="lazy"
            alt="Logo"
            id="logo"
            className="h-[60px] aspect-[178.476/60]"
          />
          <div className="bg-[#d9d9d9] w-full h-px rounded-[99px]" />
        </div>
        <div className="text-lg sm:text-2xl font-bold">
          Welcome back, Login.
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
