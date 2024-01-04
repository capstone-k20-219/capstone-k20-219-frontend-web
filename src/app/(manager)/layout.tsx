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

export default function RootLayout({
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
        <Sidebar onCurrentpage={setCurrentpage} />
        {/* header */}
        <div className="flex flex-col w-full h-full">
          <Header />
          <div className="Content w-full h-full px-16 pt-6 pb-12 overflow-hidden">
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className="text-black text-opacity-70 text-base font-medium"
            >
              <Typography key="1" className="flex gap-2">
                <Image src={Home} alt="home-icon" className="w-6 h-6" />
                Home
              </Typography>
              ,<Typography key="2">{currentpage}</Typography>
            </Breadcrumbs>
            {children}
          </div>
        </div>
      </div>
    );
}
