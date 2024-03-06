"use client";

import Button from "@/components/Button";
import InputComponent from "@/components/InputComponent";
import { onLogin } from "@/action/auth";
import { logIn } from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RoleType } from "@/lib/type";

const LoginForm = () => {
  const [role, setRole] = useState<RoleType>(null);
  const [err, setErr] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  // const onLogin = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // if (username === "Manager" && password === "Admin123")
  //   //   router.replace("/m-home");
  //   // else if (username === "Employee" && password === "Admin456")
  //   //   router.replace("/e-map");
  //   // else setErr(true);
  //   // const id = "567890987654gdajbk"; // get after validation
  //   // dispatch(logIn({ username, role, id }));
  // };

  return (
    <form
      // onSubmit={(e) => onLogin(e)}
      action={async (formData) => {
        if (!role) {
          setErr(true);
          return;
        }
        formData.append("role", role as string);
        const data = await onLogin(formData);
        if (!data) {
          setErr(true);
          return;
        } else {
          setErr(false);
          const username = data.username as string;
          const id = data.id; // get after validation
          dispatch(logIn({ username, role, id }));
          if (role === "m") router.push(`/${role}-home`);
          else router.push(`/${role}-map`);
        }
      }}
      className="flex flex-col ml-px gap-6 w-full items-start"
    >
      <InputComponent
        type="text"
        name="username"
        label="Username"
        autoFocus={true}
        required={true}
      />
      <InputComponent
        type="password"
        name="password"
        label="Password"
        required={true}
      />
      <select
        className="w-full px-2 py-1.5 rounded-md border border-neutral-300 font-normal text-base"
        onChange={(e) => {
          setRole(e.target.value as RoleType);
        }}
      >
        <option value="">User role</option>
        <option value="m">Manager</option>
        <option value="e">Employee</option>
      </select>
      {err && (
        <div className="text-red-500">
          <i>The account information is incorrect.</i>
        </div>
      )}
      <Button
        type="submit"
        name="Login"
        className="text-xl p-2 w-full font-bold"
      />
    </form>
  );
};

export default LoginForm;
