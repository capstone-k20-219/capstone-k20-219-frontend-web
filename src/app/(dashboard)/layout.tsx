"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inital, setInitial] = useState(false);
  const [open, setOpen] = useState(false);
  const [widthSideBar, setWidthSideBar] = useState(false);
  const { role } = useAppSelector((state) => state.authReducer.value);

  useEffect(() => {
    setInitial(true);
  }, []);

  if (!inital) return null;
  else
    return (
      <div className="w-full h-dvh relative bg-stone-50 flex">
        {/* sidebar */}
        <Sidebar
          role={role}
          setOpen={setOpen}
          open={open}
          toggleWdith={widthSideBar}
          setWidthSidebar={setWidthSideBar}
        />
        {/* header */}
        <div className="flex flex-col w-full h-full overflow-hidden">
          <Header
            setOpenSidebar={setOpen}
            role={role}
            setWidthSidebar={setWidthSideBar}
          />
          <div className="Content w-full h-[calc(100%-68px)] p-6 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    );
}
