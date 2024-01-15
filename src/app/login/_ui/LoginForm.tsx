import Button from "@/app/(manager)/_ui/Button";
import { InputComponent } from "@/app/(manager)/m-profile/page";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormEvent } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const router = useRouter();
  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // router.replace("/m-home");
    if (username === "Manager" && password === "Admin123")
      router.replace("/m-home");
    else if (username === "Employee" && password === "Admin456")
      router.replace("/e-map");
    else setErr(true);
  };

  return (
    <form
      onSubmit={(e) => onLogin(e)}
      className="flex flex-col ml-px gap-6 w-full items-start"
    >
      <div className="flex flex-col gap-1 w-full items-start">
        <InputComponent
          type="text"
          name="username"
          value={username}
          label="Username"
          onChangeFunction={(e) => {
            setErr(false);
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1 w-full items-start">
        <InputComponent
          type="password"
          name="password"
          value={password}
          label="Password"
          onChangeFunction={(e) => {
            setErr(false);
            setPassword(e.target.value);
          }}
        />
      </div>
      {err && (
        <div className="text-red-500">
          <i>Username or password is wrong</i>
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
