"use client";
import NoAccess from "@/components/NoAccess";
import { useAppSelector } from "@/redux/store";
import { redirect } from "next/navigation";
import React from "react";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, role } = useAppSelector((state) => state.authReducer.value);

  if (!isAuth) redirect("/login");
  else if (role == "m") return children;
  else <NoAccess />;
}
