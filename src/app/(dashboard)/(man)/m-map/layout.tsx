import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager | Map Management",
  description: "The manager manages the map of the parking lot.",
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
