import { IconType } from "react-icons";

export enum TableType {
  Employee,
  VehicleType,
  Service,
  ServiceRequest,
}

// Type for Employee Table
export interface EmployeeColumn {
  id: "id" | "name" | "phone" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: number) => string;
}

export interface EmployeeData {
  [key: string]: any;
  id: string;
  name: string;
  phone: string;
}

// Type for Vehicle Type Table
export interface VehicleTypeColumn {
  id: "id" | "name" | "bookingFee" | "parkingFee" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: number) => string;
}

export interface VehicleTypeData {
  [key: string]: any;
  name: string;
  bookingFee: number;
  parkingFee: number;
}

// Type for Service Table
export interface ServiceColumn {
  id: "name" | "price" | "typ" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: number) => string;
}

export interface ServiceData {
  [key: string]: any;
  name: string;
  price: number;
  typ: string;
}

// Type for Service Request Table
export interface ServiceRequestColumn {
  id: "plate" | "phone" | "time" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: number) => string;
}

export interface ServiceRequestData {
  [key: string]: any;
  plate: string;
  phone: string;
  time: string;
}

// Type for Table Data
export type tableColumn =
  | EmployeeColumn
  | ServiceColumn
  | VehicleTypeColumn
  | ServiceRequestColumn;
export type TableData =
  | EmployeeData[]
  | VehicleTypeData[]
  | ServiceData[]
  | ServiceRequestData[]
  | null;

// Type for input component
export interface InputComponentType {
  label: string;
  value?: string;
  type: string;
  name: string;
  placeholder?: string;
  disable?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  onChangeFunction?: (value: any) => void;
}

// Type for Sidebar nav items
export interface NavItem {
  name: string;
  icon?: JSX.Element;
  link: string;
}

// Type for Auth Reducer _ auth-slice
export type InitialState = {
  value: AuthState;
};

export type RoleType = "m" | "e" | null;

export type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
  role: RoleType;
};

export type LoginType = {
  username: string;
  id: string;
  role: RoleType;
};

export type ActiveState = {
  role: null | "m" | "e";
  index: number;
  name: string;
};

export type InitialActiveState = {
  value: ActiveState;
};
