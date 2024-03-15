import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager | Employee Management",
  description: "The manager manages the employees of the parking lot.",
};

export default function EmployeeManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
