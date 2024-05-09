"use client";

import Logo from "@/img/logo-white.png";
import Logo2 from "@/img/logo.png";
import Image from "next/image";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import { NavItem } from "@/lib/type";
import {
  NavListItemMainEmployee,
  NavListItemMainManager,
  NavListItemSecondary,
} from "@/lib/data";
import { FiMenu } from "react-icons/fi";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";

function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-neutral-900 bg-opacity-70 p-2 py-1.5 absolute top-1/2 left-[105%] -translate-y-1/2 opacity-100
    rounded shadow-md min-w-[80px] text-center border border-neutral-200 text-white"
    >
      {children}
    </div>
  );
}

export default function Sidebar({
  open,
  toggleWdith,
  setOpen,
  setWidthSidebar,
}: {
  open: boolean;
  toggleWdith: boolean;
  setOpen: (state?: boolean) => void;
  setWidthSidebar: (state?: boolean) => void;
}) {
  const { role } = useAppSelector((state) => state.auth.value);
  const navListItemMain: NavItem[] =
    role === "manager" ? NavListItemMainManager : NavListItemMainEmployee;
  const [openTooltip, setOpenTooltip] = useState<boolean[]>(
    new Array(navListItemMain.length + NavListItemSecondary.length).fill(false)
  );

  const handleMenuButton = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
      setWidthSidebar(false);
    } else {
      setWidthSidebar();
    }
  };

  const handleOpenTooltip = (index: number) => {
    const oldArr = [...openTooltip];
    oldArr[index] = true;
    setOpenTooltip(oldArr);
  };

  const handleCloseTooltip = (index: number) => {
    const oldArr = [...openTooltip];
    oldArr[index] = false;
    setOpenTooltip(oldArr);
  };

  return (
    <div
      className={`w-48 z-50 h-full bg-neutral-900 absolute transition-all duration-500 ease-out
      inset-0 md:relative md:block ${open ? "block" : "hidden"} ${
        !toggleWdith && "md:w-14"
      }`}
    >
      <div className="flex justify-center items-center w-full h-20 px-4">
        <Image
          src={toggleWdith ? Logo : Logo2}
          alt="Logo"
          id="logo"
          className={`aspect-[${toggleWdith ? "116.49/36" : "43.49/36"}]`}
        />
        <FiMenu
          style={{ width: 24, height: 24, color: "whitesmoke" }}
          className="ml-auto md:hidden"
          onClick={handleMenuButton}
        />
      </div>
      <div className="w-full text-neutral-500 text-sm">
        <List component="nav" aria-label="main">
          {navListItemMain.map((item, indexItem) => {
            return (
              <ListItemButton key={"nav" + indexItem} className="relative">
                <Link
                  href={item.link}
                  className="w-full flex gap-2 text-white items-center opacity-70"
                  onMouseOver={() => handleOpenTooltip(indexItem)}
                  onMouseLeave={() => handleCloseTooltip(indexItem)}
                >
                  <span>{item.icon}</span>
                  {toggleWdith && <p>{item.name}</p>}
                </Link>
                {openTooltip[indexItem] && <Tooltip>{item.name}</Tooltip>}
              </ListItemButton>
            );
          })}
        </List>
        <div className="w-4/5 border-b border-b-neutral-500 m-auto"></div>
        <List component="nav" aria-label="secondary">
          {NavListItemSecondary.map((item, indexItem) => {
            const newIndex = indexItem + navListItemMain.length;
            return (
              <ListItemButton key={"nav" + newIndex}>
                <div
                  className="w-full flex gap-2 text-white opacity-70"
                  onMouseOver={() => handleOpenTooltip(newIndex)}
                  onMouseLeave={() => handleCloseTooltip(newIndex)}
                >
                  <span>{item.icon}</span>
                  {toggleWdith && <p>{item.name}</p>}
                </div>
                {openTooltip[newIndex] && <Tooltip>{item.name}</Tooltip>}
              </ListItemButton>
            );
          })}
        </List>
      </div>
    </div>
  );
}
