import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager | Customer's Feedback",
  description:
    "The manager manages the customer's feedback about parking lot's services.",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
