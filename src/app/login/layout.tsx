"use client";

import { useAppSelector } from "@/redux/store";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [init, setInit] = useState(false);
  const { token } = useAppSelector((state) => state.auth.value);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.back();
    } else {
      setInit(true);
    }
  }, [token, router]);

  if (init) return children;
  else return null;
}
