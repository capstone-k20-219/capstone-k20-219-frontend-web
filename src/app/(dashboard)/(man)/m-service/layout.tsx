import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager | Service Management",
  description: "The manager manages the service in the parking lot.",
};

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
