"use client";

// Assets
import "./login.scss";
import Logo from "../../img/logo-black.png";

// Libraries
import React from "react";
import Image from "next/image";
import LoginForm from "../ui/login/LoginForm";

const Login = () => {
  return (
    <div
      id="login-page"
      className="bg-[#f9f9f9] flex justify-center w-full h-dvh items-center"
    >
      <div className="shadow-[4px_4px_50px_0px_rgba(0,_0,_0,_0.25)] bg-white flex flex-col gap-12 w-full items-start p-10 rounded-lg md:w-3/5">
        {/* Logo */}
        <div className="flex flex-col ml-px gap-3 w-full items-start">
          <Image
            src={Logo}
            alt="Logo"
            id="logo"
            className="h-[60px] aspect-[178.476/60]"
          />
          <div className="bg-[#d9d9d9] w-full h-px rounded-[99px]" />
        </div>
        {/* heading */}
        <div className="text-3xl font-bold text-[#151718]">
          Welcome back, Login.
        </div>
        {/* form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
