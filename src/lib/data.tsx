import {
  EmployeeData,
  FeedbackData,
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
import { SlotBlock } from "@/components/ParkingLotMap";
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

const FeedbackRows: FeedbackData[] = [
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 5,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
  {
    id: 1,
    rate: 3,
    date: "2024-03-12",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum fugit ut laudantium voluptate nihil alias facere sequi, minima nesciunt reprehenderit consectetur rem perspiciatis ipsum explicabo magni, tempore, atque laboriosam recusandae?",
  },
];
const FeedbackRows2: FeedbackData[] = [];
const FeedbackRows3: FeedbackData[] = [];

export const mockFeedbackData: {
  [key: string]: any;
} = {
  washing: FeedbackRows,
  charging: FeedbackRows2,
  maintaining: FeedbackRows3,
};

export const mockServiceRequestData: {
  [key: string]: any;
} = {
  washing: ServiceRequestRows,
  charging: ServiceRequestRows2,
  maintaining: ServiceRequestRows3,
};

export const ServiceList = ["Washing", "Charging", "Maintaining"];

export const employeeRows: EmployeeData[] = [
  {
    id: "MPL23456",
    name: "Thai Tai",
    phone: "0983786674",
    email: "example123@gmail.com",
    dob: "25/10/2002",
  },
  {
    id: "MPL23457",
    name: "Pham Huu Duc",
    phone: "0983786674",
    email: "example234@gmail.com",
    dob: "22/11/2002",
  },
  {
    id: "MPL23458",
    name: "Nguyen Viet Hoa",
    phone: "0983786674",
    email: "example345@gmail.com",
    dob: "18/06/2002",
  },
  {
    id: "MPL23459",
    name: "Pham Chau Thanh",
    phone: "0983786674",
    email: "example456@gmail.com",
    dob: "07/07/2002",
  },
  {
    id: "MPL23460",
    name: "Tran Cong An",
    phone: "0983786674",
    email: "example567@gmail.com",
    dob: "27/02/2002",
  },
  {
    id: "MPL23461",
    name: "Nguyen Huy Hoang",
    phone: "0983786674",
    email: "example678@gmail.com",
    dob: "13/04/2002",
  },
  {
    id: "MPL23462",
    name: "Nguyen Huu Phuoc",
    phone: "0983786674",
    email: "example789@gmail.com",
    dob: "01/09/2002",
  },
  {
    id: "MPL23463",
    name: "Nguyen Van A",
    phone: "0983786674",
    email: "example890@gmail.com",
    dob: "15/08/2002",
  },
];

export const ServiceRows: ServiceData[] = [
  {
    id: "1",
    name: "Charging",
    price: 10,
    typ: "Truck",
  },
  {
    id: "2",
    name: "Washing",
    price: 10,
    typ: "Car",
  },
  {
    id: "3",
    name: "Washing",
    price: 6,
    typ: "Motobike",
  },
  {
    id: "4",
    name: "Maintenance",
    price: 25,
    typ: "Car",
  },
];

export const vehicleTypeRows: VehicleTypeData[] = [
  {
    id: 12345,
    name: "Motobike",
    bookingFee: 2,
    parkingFee: 4,
  },
  {
    id: 12346,
    name: "Bikecycle",
    bookingFee: 2,
    parkingFee: 4,
  },
  {
    id: 12347,
    name: "Car",
    bookingFee: 2,
    parkingFee: 4,
  },
  {
    id: 12348,
    name: "Truck",
    bookingFee: 2,
    parkingFee: 4,
  },
];

// export const mockDataProfile = null;
export const mockDataProfile = {
  id: "MPL2354",
  role: "Manager",
  name: "Nguyen Huu Duc",
  email: "example123@gmail.com",
  phone: "0983786674",
  dob: "2002-07-29",
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

export let SlotList: SlotBlock[] = [
  {
    id: "123",
    coordinate: {
      startX: 120,
      startY: 120,
      endX: 168,
      endY: 216,
    },
    acceptedVehicleType: 12345,
  },
  {
    id: "124",
    coordinate: { startX: 168, startY: 120, endX: 216, endY: 216 },
    acceptedVehicleType: 12345,
  },
  {
    id: "125",
    coordinate: { startX: 216, startY: 120, endX: 264, endY: 216 },
    acceptedVehicleType: 12345,
  },
  {
    id: "126",
    coordinate: { startX: 264, startY: 120, endX: 312, endY: 216 },
    acceptedVehicleType: 12345,
  },
  {
    id: "127",
    coordinate: { startX: 312, startY: 120, endX: 360, endY: 216 },
    acceptedVehicleType: 12345,
  },
];
