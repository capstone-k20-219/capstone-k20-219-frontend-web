import { NavItem } from "./type";
import { TbChartTreemap, TbLayoutDashboard } from "react-icons/tb";
import { MdOutlineDesignServices } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { IoCarSport, IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";

const styleIcon = {
  width: 24,
  height: 24,
  color: "#fff",
};

export const NavListItemMainManager: NavItem[] = [
  {
    name: "Dashboard",
    icon: <TbLayoutDashboard style={styleIcon} />,
    link: "/m-home",
  },
  {
    name: "Map",
    icon: <TbChartTreemap style={styleIcon} />,
    link: "/m-map",
  },
  {
    name: "Employee",
    icon: <BsPeople style={styleIcon} />,
    link: "/m-employee",
  },
  {
    name: "Vehicle",
    icon: <IoCarSport style={styleIcon} />,
    link: "/m-vehicle",
  },
  {
    name: "Service",
    icon: <MdOutlineDesignServices style={styleIcon} />,
    link: "/m-service",
  },
  {
    name: "Feedback",
    icon: <VscFeedback style={styleIcon} />,
    link: "/m-feedback",
  },
];

export const NavListItemMainEmployee: NavItem[] = [
  {
    name: "Map",
    icon: <TbChartTreemap style={styleIcon} />,
    link: "/e-map",
  },
  {
    name: "Service",
    icon: <MdOutlineDesignServices style={styleIcon} />,
    link: "/e-service",
  },
];

export const NavListItemSecondary: NavItem[] = [
  {
    name: "Help",
    icon: <IoMdHelpCircleOutline style={styleIcon} />,
    link: "",
  },
  {
    name: "Setting",
    icon: <IoSettingsOutline style={styleIcon} />,
    link: "",
  },
];

export const ListNavEmployee = ["Map", "Service", "Help", "Setting"];

export const ListNavManager = [
  "Dashboard",
  "Map",
  "Employee",
  "Vehicle Type",
  "Service",
  "Help",
  "Setting",
];

export const BLOCK_SIZE = 24; // px

export const MAP_SIZE = 4800; // 4800px == 200 block
