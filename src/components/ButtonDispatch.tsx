"use client";

import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";

export default function ButtonDispatch() {
  const router = useRouter();
  const { token, role } = useAppSelector((state) => state.auth.value);

  const handleSubmit = () => {
    if (!token) router.push("/login");
    else if (role === "manager") {
      router.push(`/m-home`);
    } else {
      router.push(`/e-map`);
    }
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
