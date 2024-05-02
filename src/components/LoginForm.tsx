"use client";

import Button from "@/components/Button";
import InputComponent from "@/components/InputComponent";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { onActive } from "@/redux/features/active-slice";
import { validateEmail, validatePassword } from "@/lib/helpers";
import { logIn } from "@/redux/features/auth-slice";
import { ActiveState, AuthState } from "@/lib/type";
import { getUserById } from "@/lib/services/users";
import toast from "react-hot-toast";
import { authenticate } from "@/lib/services/auth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleUserLogin = async (formData: FormData) => {
    try {
      setError("");

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const validEmail = validateEmail(email);
      if (!validEmail.valid) {
        setError(validEmail.message);
        return;
      }

      const validPass = validatePassword(password);
      if (!validPass.valid) {
        setError(validPass.message);
        return;
      }

      const data = await authenticate(validEmail.data, validPass.data);

      const user = await getUserById(data.access_token);

      const isManager = user.role.includes("manager");
      const isEmployee = user.role.includes("employee");
      const role = isManager ? "manager" : isEmployee ? "employee" : null;

      if (role) {
        dispatch(
          logIn({
            token: data.access_token,
            uid: data.id,
            refresh_token: data.refresh_token,
            role: role,
          } as AuthState)
        );

        const activeState: ActiveState = {
          role: role,
          index: 0,
          name: isManager ? "Dashboard" : "Map",
        };
        dispatch(onActive(activeState));

        if (role === "manager") {
          router.push("/m-home");
        } else {
          router.push("/e-map");
        }
      } else {
        toast.error("You have no right to access this system!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action={handleUserLogin}
      className="flex flex-col ml-px gap-6 w-full items-start"
    >
      <InputComponent
        type="text"
        name="email"
        label="Email"
        autoFocus={true}
        required={true}
      />
      <InputComponent
        type="password"
        name="password"
        label="Password"
        required={true}
      />
      {error.length > 0 && (
        <div className="text-red-500">
          <i>{error}</i>
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
