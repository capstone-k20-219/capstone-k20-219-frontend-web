import { NavItem, ServiceRequestData } from "./type";
import { TbChartTreemap, TbLayoutDashboard } from "react-icons/tb";
import { MdOutlineDesignServices } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { IoCarSport, IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";

export const temporaryLoginInfo = [
  {
    id: "jbfaue89869",
    username: "Manager",
    password: "manager123",
    role: "m",
  },
  {
    id: "lkbhlkblbliua86",
    username: "Employee",
    password: "employee123",
    role: "e",
  },
];

const ServiceRequestRows: ServiceRequestData[] = [
  {
    id: 1,
    plate: "HP234-23.444",
    phone: "0983786674",
    name: "Nguyen Huu Duc",
    time: "12:30 29/10/2023",
  },
  {
    id: 2,
    plate: "HP234-23.444",
    phone: "0983786674",
    name: "Nguyen Huu Duc",
    time: "12:30 29/10/2023",
  },
  {
    id: 3,
    plate: "HP234-23.444",
    phone: "0983786674",
    name: "Nguyen Huu Duc",
    time: "12:30 29/10/2023",
  },
  {
    id: 4,
    plate: "HP234-23.444",
    phone: "0983786674",
    name: "Nguyen Huu Duc",
    time: "12:30 29/10/2023",
  },
];
const ServiceRequestRows2: ServiceRequestData[] = [
  {
    id: 1,
    plate: "HP234-23.444",
    phone: "0983786674",
    name: "Nguyen Huu Duc",
    time: "12:30 29/10/2023",
  },
  {
    id: 2,
    plate: "HP234-23.444",
    phone: "0983786674",
    name: "Nguyen Huu Duc",
    time: "12:30 29/10/2023",
  },
];
const ServiceRequestRows3: ServiceRequestData[] = [
  {
    id: 1,
    plate: "HP234-23.444",
    phone: "0983786674",
    name: "Nguyen Huu Duc",
    time: "12:30 29/10/2023",
  },
];

export const mockServiceRequestData: {
  [key: string]: any;
} = {
  washing: ServiceRequestRows,
  charging: ServiceRequestRows2,
  maintaining: ServiceRequestRows3,
};

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

export const SmallStatistics = [
  {
    name: "Current vehicle",
    value: "60",
  },
  {
    name: "Current available slot",
    value: "34",
  },
  {
    name: "Today booking",
    value: "12",
  },
  {
    name: "Yesterday revenue",
    value: "$974,99",
  },
  {
    name: "Total service",
    value: "5",
  },
];
