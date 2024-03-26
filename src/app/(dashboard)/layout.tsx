"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [widthSideBar, setWidthSideBar] = useState(false);

  const handleSetWidthSideBar = (state?: boolean) => {
    if (state === undefined) {
      setWidthSideBar((prev) => !prev);
    } else setWidthSideBar(state as boolean);
  };

  const handleSetOpen = (state?: boolean) => {
    if (state === undefined) {
      setOpen((prev) => !prev);
    } else setOpen(state as boolean);
  };

  return (
    <div className="w-full h-dvh bg-stone-50 flex">
      {/* sidebar */}
      <Sidebar
        open={open}
        toggleWdith={widthSideBar}
        setOpen={handleSetOpen}
        setWidthSidebar={handleSetWidthSideBar}
      />
      {/* header */}
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Header
          setOpenSidebar={handleSetOpen}
          setWidthSidebar={handleSetWidthSideBar}
        />
        <div className="scrollbar-none w-full h-[calc(100%-68px)] p-6 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
