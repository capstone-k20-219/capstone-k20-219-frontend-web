import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee | Map Management",
  description: "The employee manages the current state of the parking lot.",
};

export default function EmployeeMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
