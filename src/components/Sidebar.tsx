"use client";

import Logo from "@/img/logo-white.png";
import Logo2 from "@/img/logo.png";
import Image from "next/image";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { NavItem, RoleType } from "@/lib/type";
import {
  ListNavEmployee,
  ListNavManager,
  NavListItemMainEmployee,
  NavListItemMainManager,
  NavListItemSecondary,
} from "@/lib/data";
import { FiMenu } from "react-icons/fi";
// import { TbChartTreemap } from "react-icons/tb";

export default function Sidebar({
  role = null,
  setOpen,
  open,
  toggleWdith,
  setWidthSidebar,
}: {
  role: RoleType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  toggleWdith: boolean;
  setWidthSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navListItemMain: NavItem[] =
    role === "m" ? NavListItemMainManager : NavListItemMainEmployee;
  const listNav: string[] = role === "m" ? ListNavManager : ListNavEmployee;
  const [currentpage, setCurrentpage] = useState<string>(
    role === "m" ? "Dashboard" : "Map"
  );

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    name: string
  ) => {
    setSelectedIndex(index);
    setCurrentpage(name);
  };

  const handleMenuButton = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
      setWidthSidebar(false);
    } else {
      setWidthSidebar((prev) => !prev);
    }
  };

  useEffect(() => {
    if (listNav.includes(currentpage)) {
      setSelectedIndex(listNav.indexOf(currentpage));
    } else {
      setSelectedIndex(-1);
    }
  }, []);

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
          {navListItemMain.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <ListItemButton
                key={index}
                selected={isSelected}
                onClick={(event) =>
                  handleListItemClick(event, index, item.name)
                }
                className={isSelected ? "opacity-100" : "opacity-70"}
              >
                <div
                  className={`w-1 h-3/5 bg-white absolute left-0 top-1/2 -translate-y-1/2 ${
                    isSelected ? "block indicator" : "hidden"
                  }`}
                />
                <Link
                  href={item.link}
                  className="w-full flex gap-2 text-white items-center"
                >
                  <span>{item.icon}</span>
                  {toggleWdith && <p>{item.name}</p>}
                </Link>
              </ListItemButton>
            );
          })}
        </List>
        <div className="w-4/5 border-b border-b-neutral-500 m-auto"></div>
        <List component="nav" aria-label="secondary">
          {NavListItemSecondary.map((item, index) => {
            return (
              <ListItemButton key={index + 5} className="opacity-70">
                <div className="w-1 h-3/5 bg-white absolute left-0 top-1/2 -translate-y-1/2 hidden" />
                <div className="w-full flex gap-3 text-white">
                  <span>{item.icon}</span>
                  {toggleWdith && <p>{item.name}</p>}
                </div>
              </ListItemButton>
            );
          })}
        </List>
      </div>
    </div>
  );
}
