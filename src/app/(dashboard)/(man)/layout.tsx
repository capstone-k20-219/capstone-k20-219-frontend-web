"use client";

import { statusAction } from "@/lib/helpers";
import useToken from "@/lib/hooks/refresh-token";
import { checkingPermission } from "@/lib/services/users";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allow, setAllow] = useState(false);
  const { refreshToken, token } = useToken();
  const router = useRouter();

  if (!token) {
    redirect("/login");
  }

  useEffect(() => {
    const checkRole = async () => {
      try {
        let isUnauthorized = false;
        let newToken = token;
        do {
          if (isUnauthorized) {
            const isRefreshed = await refreshToken();
            if (!isRefreshed.valid) return;
            newToken = isRefreshed.access_token;
            isUnauthorized = false;
          }
          const res = await checkingPermission(newToken, "manager");
          if (res.status === 201) {
            if (!res.data) router.replace("/e-map");
            else setAllow(true);
            return;
          } else if (res.status === 401) {
            isUnauthorized = true;
          } else {
            statusAction(res.status);
            return;
          }
        } while (true);
      } catch (error) {
        toast.error("Server error when checking permission!");
      }
    };
    checkRole();
  }, []);

  if (allow) return <>{children}</>;
  return null;
}
