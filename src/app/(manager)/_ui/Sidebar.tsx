"use client";

// Assets
import Logo from "../../../img/logo-white.png";
import DashboardIcon from "../../../img/dashboard.png";
import MapIcon from "../../../img/map.png";
import EmployeeIcon from "../../../img/employee.png";
import ServiceIcon from "../../../img/service.png";
import VehicleTypeIcon from "../../../img/vehicle-type.png";
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
import { useState } from "react";
import Link from "next/link";

// Setup
interface NavItem {
  name: string;
  icon?: any;
  link: string;
}

const NavListItemMain: NavItem[] = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    link: "/m-home",
  },
  {
    name: "Employee",
    icon: EmployeeIcon,
    link: "/m-employee",
  },
  {
    name: "Map",
    icon: MapIcon,
    link: "/m-map",
  },
  {
    name: "Vehicle type",
    icon: VehicleTypeIcon,
    link: "/m-vehicle",
  },
  {
    name: "Service",
    icon: ServiceIcon,
    link: "/m-service",
  },
];

const NavListItemSecondary: NavItem[] = [
  {
    name: "Help",
    icon: HelpIcon,
    link: "/m-home",
  },
  {
    name: "Setting",
    icon: SettingIcon,
    link: "/m-home",
  },
];

// Component(s)
export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div className="w-64 h-full bg-neutral-900 flex flex-col">
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
                onClick={(event) => handleListItemClick(event, index)}
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
                onClick={(event) => handleListItemClick(event, index + 5)}
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
