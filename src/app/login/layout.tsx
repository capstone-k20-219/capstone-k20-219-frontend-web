"use client";

import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [init, setInit] = useState(false);
  const { token, role } = useAppSelector((state) => state.auth.value);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      if (role === "manager") {
        router.replace("/m-home");
      } else if (role === "employee") {
        router.replace("/e-map");
      }
    } else {
      setInit(true);
    }
  }, [token, router]);

  if (init) return children;
  else return null;
}
