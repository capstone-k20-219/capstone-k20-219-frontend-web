"use client";

import Logo from "@/img/logo-white.png";
import Logo2 from "@/img/logo.png";
import Image from "next/image";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { NavItem } from "@/lib/type";
import {
  NavListItemMainEmployee,
  NavListItemMainManager,
  NavListItemSecondary,
} from "@/lib/data";
import { FiMenu } from "react-icons/fi";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { onActive } from "@/redux/features/active-slice";

export default function Sidebar({
  open,
  toggleWdith,
  setOpen,
  setWidthSidebar,
}: {
  open: boolean;
  toggleWdith: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setWidthSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const { role, index, name } = useAppSelector((state) => state.active.value);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedIndex, setSelectedIndex] = useState<number>(index);
  const [currentpage, setCurrentpage] = useState<string>(name);
  const navListItemMain: NavItem[] =
    role === "m" ? NavListItemMainManager : NavListItemMainEmployee;

  const handleListItemClick = (indexActive: number, nameActive: string) => {
    setSelectedIndex(indexActive);
    setCurrentpage(nameActive);
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
    let ignore = false;
    if (selectedIndex !== index && !ignore) {
      dispatch(onActive({ role, index: selectedIndex, name: currentpage }));
    }

    return () => {
      ignore = true;
    };
  }, [selectedIndex]);

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
            const isSelected = indexItem === selectedIndex;
            return (
              <ListItemButton
                key={indexItem}
                selected={isSelected}
                className={isSelected ? "opacity-100" : "opacity-70"}
              >
                <div
                  className={`w-1 h-3/5 bg-white absolute left-0 top-1/2 -translate-y-1/2 ${
                    isSelected ? "block indicator" : "hidden"
                  }`}
                />
                <Link
                  href={item.link}
                  onClick={() => handleListItemClick(indexItem, item.name)}
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
          {NavListItemSecondary.map((item, indexItem) => {
            return (
              <ListItemButton key={indexItem + 5} className="opacity-70">
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
