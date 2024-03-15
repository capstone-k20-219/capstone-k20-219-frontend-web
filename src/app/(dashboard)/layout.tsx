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

  return (
    <div className="w-full h-dvh relative bg-stone-50 flex">
      {/* sidebar */}
      <Sidebar
        setOpen={setOpen}
        open={open}
        toggleWdith={widthSideBar}
        setWidthSidebar={setWidthSideBar}
      />
      {/* header */}
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Header setOpenSidebar={setOpen} setWidthSidebar={setWidthSideBar} />
        <div className="Content w-full h-[calc(100%-68px)] p-6 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
