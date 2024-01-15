"use client";

// Assets
import Logo from "../../../img/logo-white.png";
import MapIcon from "../../../img/map.png";
import ServiceIcon from "../../../img/service.png";
import HelpIcon from "../../../img/help.png";
import SettingIcon from "../../../img/setting.png";

// Libraries
import Image from "next/image";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";

// Setup
interface NavItem {
  name: string;
  icon?: any;
  link: string;
}

const NavListItemMain: NavItem[] = [
  {
    name: "Map",
    icon: MapIcon,
    link: "/e-map",
  },
  {
    name: "Service",
    icon: ServiceIcon,
    link: "/e-service",
  },
];

const NavListItemSecondary: NavItem[] = [
  {
    name: "Help",
    icon: HelpIcon,
    link: "/e-map",
  },
  {
    name: "Setting",
    icon: SettingIcon,
    link: "/e-map",
  },
];

const ListNav = ["Map", "Service", "Help", "Setting"];

// Component(s)
export default function Sidebar({
  onCurrentpage,
  currentpage,
}: {
  onCurrentpage: Dispatch<SetStateAction<string>>;
  currentpage: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    name: string
  ) => {
    setSelectedIndex(index);
    onCurrentpage(name);
  };

  useEffect(() => {
    if (ListNav.includes(currentpage)) {
      setSelectedIndex(ListNav.indexOf(currentpage));
    } else {
      setSelectedIndex(-1);
    }
  }, []);

  return (
    <div className="w-64 h-full bg-neutral-900 flex flex-col">
      <h1>Hello</h1>
      <div className="flex justify-center items-center w-full h-20">
        <Image
          src={Logo}
          alt="Logo"
          id="logo"
          className="h-9 aspect-[116.49/36]"
        />
      </div>
      <div className="w-full text-neutral-500">
        <List component="nav" aria-label="main">
          {NavListItemMain.map((item, index) => {
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
                <Link href={item.link} className="w-full flex gap-3 text-white">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    id={item.name}
                    className="h-6 aspect-square"
                  />
                  <ListItemText primary={item.name} />
                </Link>
              </ListItemButton>
            );
          })}
        </List>
        <div className="w-4/5 border-b border-b-neutral-500 m-auto"></div>
        <List component="nav" aria-label="secondary">
          {NavListItemSecondary.map((item, index) => {
            const isSelected = selectedIndex === index + 5;
            return (
              <ListItemButton
                key={index + 5}
                selected={isSelected}
                onClick={(event) =>
                  handleListItemClick(event, index + 5, "Map")
                }
                className={isSelected ? "opacity-100" : "opacity-70"}
              >
                <div
                  className={`w-1 h-3/5 bg-white absolute left-0 top-1/2 -translate-y-1/2 ${
                    isSelected ? "block indicator" : "hidden"
                  }`}
                />
                <Link href={item.link} className="w-full flex gap-3 text-white">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    id={item.name}
                    className="h-6 aspect-square"
                  />
                  <ListItemText primary={item.name} />
                </Link>
              </ListItemButton>
            );
          })}
        </List>
      </div>
    </div>
  );
}
