"use client";

import Button from "@/components/Button";
import InputComponent from "@/components/InputComponent";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { statusAction, validateEmail, validatePassword } from "@/lib/helpers";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { AuthState, SelfUserDBGetType } from "@/lib/type";
import { getSelfUser } from "@/lib/services/users";
import toast from "react-hot-toast";
import { authenticate } from "@/lib/services/auth";
import { AiOutlineLoading } from "react-icons/ai";

export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const refForm = useRef<HTMLFormElement>(null);

  const handleUserLogin = async (formData: FormData) => {
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const validEmail = validateEmail(email);
      if (!validEmail.valid) {
        setError(validEmail.message);
        setIsLoading(false);
        return;
      }

      const validPass = validatePassword(password);
      if (!validPass.valid) {
        setError(validPass.message);
        setIsLoading(false);
        return;
      }

      const data = await authenticate(validEmail.data, validPass.data);

      if (data.status === 401) {
        setError("Incorrect password or email!");
        setIsLoading(false);
        return;
      }

      const user = await getSelfUser(data.data.access_token);

      if (user.status !== 200) {
        statusAction(user.status);
        setIsLoading(false);
        return;
      }

      const userData: SelfUserDBGetType = user.data as SelfUserDBGetType;

      const isManager = userData.role.includes("manager");
      const isEmployee = userData.role.includes("employee");
      const role = isManager ? "manager" : isEmployee ? "employee" : null;

      if (role) {
        dispatch(
          logIn({
            token: data.data.access_token,
            uid: data.data.id,
            refresh_token: data.data.refresh_token,
            role: role,
          } as AuthState)
        );

        if (role === "manager") {
          router.push("/m-home");
        } else {
          router.push("/e-map");
        }
        setIsLoading(false);
        toast.success("Logging in successfully.");
      } else {
        setIsLoading(false);
        toast.error("You have no right to access this system!");
        dispatch(logOut());
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Server error when login!");
    }
  };

  return (
    <form
      ref={refForm}
      action={handleUserLogin}
      className="flex flex-col ml-px gap-6 w-full items-start"
    >
      <InputComponent type="text" name="email" label="Email" autoFocus={true} />
      <InputComponent type="password" name="password" label="Password" />
      {error.length > 0 && (
        <div className="text-red-500">
          <i>{error}</i>
        </div>
      )}
      {!isLoading && (
        <Button
          type="submit"
          name="Login"
          onClickFunction={() => {
            setIsLoading(true);
            setError("");
            refForm.current?.requestSubmit();
          }}
          className="text-xl p-2 w-full font-bold"
        />
      )}
      {isLoading && (
        <Button
          type="submit"
          name="Login"
          icon={
            <div className="animate-spin">
              <AiOutlineLoading />
            </div>
          }
          className="text-xl p-2 w-full font-bold"
        />
      )}
    </form>
  );
}
