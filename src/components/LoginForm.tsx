"use client";

import Button from "@/components/Button";
import InputComponent from "@/components/InputComponent";
import { handleLogin } from "@/lib/actions";
import { logIn } from "@/redux/features/auth-slice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoginFormStateType, LoginType, RoleType } from "@/lib/type";
import { onActive } from "@/redux/features/active-slice";
import SelectOptionComponent from "./SelectOptionComponent";
import { useFormState } from "react-dom";

const RoleOption = [
  {
    value: "m",
    name: "Manager",
  },
  {
    value: "e",
    name: "Employee",
  },
];

const initialState: LoginFormStateType = {
  success: null,
  data: null,
};

export default function LoginForm() {
  const [formState, formAction] = useFormState(handleLogin, initialState);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (formState.success && formState.data !== null) {
      const data = formState.data;
      dispatch(logIn({ ...(data as LoginType) }));
      const role = data.role as RoleType;
      if (role === "m") {
        dispatch(onActive({ role: role, index: 0, name: "Dashboard" }));
        router.push(`/${role}-home`);
      } else {
        dispatch(onActive({ role: role, index: 0, name: "Map" }));
        router.push(`/${role}-map`);
      }
    }
  }, [formState, dispatch, router]);

  return (
    <form
      action={formAction}
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
      <SelectOptionComponent label="Role" name="role" options={RoleOption} />

      {formState.success === false && (
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
}
