"use client";

// Assets
import Header from "./_ui/Header";
import Home from "../../img/home-outline.png";

// Libraries
import { useEffect, useState } from "react";
import Sidebar from "./_ui/Sidebar";
import Image from "next/image";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

export default function EmployeeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inital, setInitial] = useState(false);
  const [currentpage, setCurrentpage] = useState("Map");

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
