"use client";

import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = useAppSelector((state) => state.auth.value.isAuth);
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) router.replace("login");
  });
  return children;
}
