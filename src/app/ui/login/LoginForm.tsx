import React from "react";
import { FormEvent } from "react";

const LoginForm = () => {
  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={(e) => onLogin(e)}
      className="flex flex-col ml-px gap-6 w-full items-start"
    >
      <div className="flex flex-col gap-1 w-full items-start">
        <div className="text-black/70">Username</div>
        <input
          type="text"
          name="username"
          className="p-3 w-full border border-solid border-black/30 rounded"
        />
      </div>
      <div className="flex flex-col gap-1 w-full items-start">
        <div className="text-black/70">Password</div>
        <input
          type="password"
          name="password"
          className="p-3 w-full border border-solid border-black/30 rounded"
        />
      </div>
      <button className="text-3xl font-bold text-white bg-[#151718] flex justify-center p-2 w-full items-center rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
