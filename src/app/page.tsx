"use client";

import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isAuth, role } = useAppSelector((state) => state.auth.value);
  const router = useRouter();
  // check session & cookies
  //...

  useEffect(() => {
    if (!isAuth || !role) router.replace("/login");
    else if (role === "m") router.replace(`/${role}-home`);
    else router.replace(`/${role}-map`);
  }, [isAuth]);
}
