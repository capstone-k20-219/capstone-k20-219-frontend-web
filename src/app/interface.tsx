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
  align?: "center";
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
  id: "name" | "bookingFee" | "parkingFee" | "action";
  label: string;
  minWidth?: number;
  align?: "center";
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
  align?: "center";
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
  align?: "center";
  format?: (value: number) => string;
}

export interface ServiceRequestData {
  [key: string]: any;
  plate: string;
  phone: string;
  time: string;
}

// Type for input component
export interface InputComponentType {
  label: string;
  value?: string;
  type: string;
  name: string;
  placeholder?: string;
  disable?: boolean;
  onChangeFunction?: (value: any) => void;
}
