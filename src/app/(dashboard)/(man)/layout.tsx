"use client";

import { checkingPermission } from "@/lib/services/users";
import { useAppSelector } from "@/redux/store";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allow, setAllow] = useState(false);
  const { token } = useAppSelector((state) => state.auth.value);
  const router = useRouter();

  if (!token) {
    redirect("/login");
  }

  useEffect(() => {
    checkingPermission(token, "manager").then((data) => {
      if (!data) router.replace("/e-map");
      else setAllow(true);
    });
  }, []);

  if (allow) return <>{children}</>;
  return null;
}
