"use client";
import NoAccess from "@/components/NoAccess";
import { useAppSelector } from "@/redux/store";
import { redirect } from "next/navigation";
import React from "react";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, role } = useAppSelector((state) => state.auth.value);

  if (!isAuth) redirect("/login");
  else if (role == "e") return children;
  else return <NoAccess />;
}
