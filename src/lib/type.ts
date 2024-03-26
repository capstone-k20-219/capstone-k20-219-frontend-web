export enum TableType {
  Employee,
  VehicleType,
  Service,
  ServiceRequest,
}

type AdminData = EmployeeData & { role: RoleType };

export type EmployeeData = {
  [key: string]: any;
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
};

export type VehicleTypeData = {
  [key: string]: any;
  id: string;
  name: string;
  bookingFee: number;
  parkingFee: number;
};

export type ServiceData = {
  [key: string]: any;
  id: string;
  name: string;
  price: number;
  typ: string;
};

export type ServiceRequestData = {
  [key: string]: any;
  id: number; // booking id
  name: string; // get from customer id
  phone: string; //
  plate: string; // get from vehicle id
  time: string;
};

export type TableData =
  | EmployeeData[]
  | VehicleTypeData[]
  | ServiceData[]
  | ServiceRequestData[]
  | null;

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

export interface ProfileType {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
}

export type FormStateType = {
  error: {
    [key: string]: string;
  } | null;
  success: boolean;
  data: unknown;
};

export interface OptionType {
  value: string;
  name: string;
}

export interface LoginFormStateType {
  success: boolean | null;
  data: { username: string; role: string; id: string } | null;
}

export type FeedbackData = {
  id: number | string;
  content: string;
  rate: number;
  date: string;
};
