"use client";

import { useEffect, useState } from "react";

export default function HeaderTimer() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timerInterval = setInterval(
      () => setDate(new Date().toUTCString()),
      1000
    );
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="mr-auto text-neutral-500 text-sm font-medium">
      {date.slice(0, -3)}
    </div>
  );
}
