import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager | Dashboard",
  description: "The manager's dashboard of the parking lot.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
