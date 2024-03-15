import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager | Vehicle Management",
  description: "The manager manages the vehicle type in the parking lot.",
};

export default function VehicleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
