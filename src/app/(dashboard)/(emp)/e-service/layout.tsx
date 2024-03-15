import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee | Service Booking",
  description: "The employee manages the service booking from customers.",
};

export default function EmployeeServivceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
