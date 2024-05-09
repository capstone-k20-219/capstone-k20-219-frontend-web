"use client";

import Button from "./Button";
import { useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { onActive } from "@/redux/features/active-slice";

export default function ButtonDispatch() {
  const router = useRouter();
  const { token, role } = useAppSelector((state) => state.auth.value);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (!token) router.push("/login");
    else if (role === "manager") {
      dispatch(onActive({ role: role, index: 0, name: "Dashboard" }));
      router.push(`/m-home`);
    } else {
      dispatch(onActive({ role: role, index: 0, name: "Map" }));
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
