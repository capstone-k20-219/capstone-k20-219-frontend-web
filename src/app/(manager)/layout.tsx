"use client";

// Assets
import Header from "./_ui/Header";

// Libraries
import { useEffect, useState } from "react";
import Sidebar from "./_ui/Sidebar";

export default function ManagerRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inital, setInitial] = useState(false);
  const [currentpage, setCurrentpage] = useState("Dashboard");

  useEffect(() => {
    setInitial(true);
  }, []);

  if (!inital) return null;
  else
    return (
      <div className="w-full h-dvh relative bg-stone-50 flex">
        {/* sidebar */}
        <Sidebar onCurrentpage={setCurrentpage} currentpage={currentpage} />
        {/* header */}
        <div className="flex flex-col w-full h-full">
          <Header />
          {children}
        </div>
      </div>
    );
}
