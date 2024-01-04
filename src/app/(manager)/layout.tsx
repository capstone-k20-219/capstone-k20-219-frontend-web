"use client";

import { useEffect, useState } from "react";
// Assets
import Logo from "../../img/logo-white.png";
import Header from "./_ui/Header";

// Libraries
import Sidebar from "./_ui/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inital, setInitial] = useState(false);

  useEffect(() => {
    setInitial(true);
  }, []);

  if (!inital) return null;
  else
    return (
      <div className="w-full h-dvh relative bg-stone-50 flex">
        {/* sidebar */}
        <Sidebar />
        {/* header */}
        <div className="flex flex-col w-full h-full">
          <Header />
          <div className="overflow-hidden">{children}</div>
        </div>
      </div>
    );
}
