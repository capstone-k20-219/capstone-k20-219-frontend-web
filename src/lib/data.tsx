import {
  EmployeeData,
  NavItem,
  ServiceData,
  ServiceRequestData,
  VehicleTypeData,
} from "./type";
import DashboardIcon from "@/img/dashboard.png";
import MapIcon from "@/img/map.png";
import EmployeeIcon from "@/img/employee.png";
import ServiceIcon from "@/img/service.png";
import VehicleTypeIcon from "@/img/vehicle-type.png";
import HelpIcon from "@/img/help.png";
import SettingIcon from "@/img/setting.png";
import { TbChartTreemap, TbLayoutDashboard } from "react-icons/tb";
import { MdOutlineDesignServices } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { IoCarSport, IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";

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

export const ServiceRequestRows: ServiceRequestData[] = [
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
];
export const ServiceRequestRows2: ServiceRequestData[] = [
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
];
export const ServiceRequestRows3: ServiceRequestData[] = [
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
];

export const mockData: {
  [key: string]: any;
} = {
  washing: ServiceRequestRows,
  charging: ServiceRequestRows2,
  maintaining: null,
};

export const ServiceList = ["Washing", "Charging", "Maintaining"];

export const employeeRows: EmployeeData[] = [
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
];

export const ServiceRows: ServiceData[] = [
  {
    name: "Charging",
    price: 10,
    typ: "E-car",
  },
  {
    name: "Washing",
    price: 10,
    typ: "Car",
  },
  {
    name: "Washing",
    price: 6,
    typ: "Motobike",
  },
  {
    name: "Maintenance",
    price: 25,
    typ: "Car",
  },
];

export const vehicleTypeRows: VehicleTypeData[] = [
  {
    id: "12345",
    name: "Motobike",
    bookingFee: 2,
    parkingFee: 4,
  },
  {
    id: "12346",
    name: "Bikecycle",
    bookingFee: 2,
    parkingFee: 4,
  },
  {
    id: "12347",
    name: "Car",
    bookingFee: 2,
    parkingFee: 4,
  },
  {
    id: "12348",
    name: "Truck",
    bookingFee: 2,
    parkingFee: 4,
  },
];

export const mockDataProfile = {
  id: "MPL2354",
  role: "Manager",
  username: "Nguyen Huu Duc",
  fullname: "Nguyen Huu Duc",
  dob: "2002-07-29",
  password: "Hoa29072002",
} as const;

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
