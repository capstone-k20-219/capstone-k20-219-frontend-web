export enum TableType {
  Employee,
  VehicleType,
  Service,
  ServiceRequest,
}

export type RoleType = "manager" | "employee" | "user";

export type EmployeeData = {
  [key: string]: any;
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
};

export type UserPersonalInfoType = {
  email: string;
  password: string;
  name: string;
  dob: string;
  phone: string;
  image: string;
};

export type UserDBGetType = UserPersonalInfoType & {
  [key: string]: any;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type UserListDBGetType = UserDBGetType & {
  role: RoleType[];
};

export type UserDBPostType = UserPersonalInfoType & {
  bankAccount: { id?: number; name: string; accountNo: string }[];
  role: RoleType[];
};

export type VehicleTypeData = {
  [key: string]: any;
  id: string;
  name: string;
  parkingFee: number;
  slotBookingFee: number;
};

export type ServicePrices = {
  [key: string]: any;
  typeId: string;
  unitPrice: number;
};

export type ServiceDBPostType = {
  name: string;
  prices: ServicePrices[];
};

export type ServiceDBPutType = {
  id: string;
} & ServiceDBPostType;

export type ServiceDBGetType = {
  id: string;
  name: string;
  prices: {
    type: {
      id: string;
      name: string;
    };
    unitPrice: number;
  }[];
};

export type ServiceData = {
  [key: string]: any;
  id: string;
  name: string;
  price: number;
  type: string;
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

export type AuthState = {
  token: string;
  uid: string;
  refresh_token: string;
  role: RoleType;
};

export type ActiveState = {
  role: RoleType;
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
  createdAt: string;
  id: string;
  content: string;
  rating: number;
  user: {
    id: string;
    name: string;
    image: string;
  };
};
