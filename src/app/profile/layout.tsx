"use client";

import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAppSelector((state) => state.auth.value);
  const router = useRouter();
  useEffect(() => {
    if (!token) router.replace("login");
  });
  return children;
}
