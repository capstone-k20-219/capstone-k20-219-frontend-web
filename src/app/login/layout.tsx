"use client";

import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingRootPage from "../loading";
import toast from "react-hot-toast";

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initial, setInitial] = useState(false);
  const isAuth = useAppSelector((state) => state.auth.value.isAuth);
  const router = useRouter();
  useEffect(() => {
    if (isAuth) {
      toast("User has been authorized", {
        icon: "⚠️",
      });
      router.back();
    } else setInitial(true);
  }, []);

  if (!initial) return <LoadingRootPage />;
  return children;
}
