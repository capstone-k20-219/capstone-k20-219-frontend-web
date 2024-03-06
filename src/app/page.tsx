// import Image from "next/image";
"use client";

import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isAuth, role } = useAppSelector((state) => state.authReducer.value);
  const router = useRouter();
  // check session & cookies
  //...

  useEffect(() => {
    if (!isAuth || !role) router.push("/login");
    else if (role === "m") router.push(`/${role}-home`);
    else router.push(`/${role}-map`);
  }, []);
}
