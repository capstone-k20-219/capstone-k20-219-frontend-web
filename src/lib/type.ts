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

export type UserDBPostType = {
  email: string;
  password?: string;
  name: string;
  dob: string;
  phone: string;
  image: string;
  bankAccount?: { id?: number; name: string; accountNo: string }[];
  role?: RoleType[];
};

export type SelfUserDBGetType = UserDBGetType & {
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

export type Coordinate = {
  x_start: number;
  x_end: number;
  y_start: number;
  y_end: number;
};

export type SlotBlock = {
  id: string;
  typeId: string; // accepted vehicle
} & Coordinate;

export type SlotBlockDBGetType = {
  type: { name: string };
} & SlotBlock;

export type ParkingTicketDBGetType = {
  checkOutTime: string;
  createdAt: string;
  id: string;
  isPaid: boolean;
  parkingCost: number;
  plateNo: string;
  slotId: string;
  updatedAt: string;
  userId: string;
};

export type VehicleValue = { name: string; value: number };
export type ServiceValue = VehicleValue;

export type TrafficDataType = {
  fromDate: string;
  toDate: string;
  dataIn: number[];
  dataOut: number[];
};

type ServiceBill = {
  serviceId: string;
  name: string;
  quantity: number;
  cost: number;
};

type TicketBaseInfo = {
  ticketId: string;
  plateNo: string;
  checkInTime: string;
  checkOutTime: string;
  slotId: string;
  parkingCost: number;
};

export type TicketCheckoutDBGetType = TicketBaseInfo & {
  services: ServiceBill[];
};

export type TicketCheckInDBGetType = TicketBaseInfo;

export type CheckInInfoType = {
  slotId: string;
  info: ParkingTicketDBGetType;
};

export type WeekRevenueType = {
  fromDate: string;
  toDate: string;
  data: number[];
};

export type ServiceBookingDBGetType = {
  [key: string]: any;
  createdAt: string;
  id: number; // id booking
  ticket: {
    id: string; // id ticket
    plateNo: string;
    slotId: string;
  };
};

export type ServiceRequestData = {
  [key: string]: any;
  id: number; // booking id
  slotId: string; //
  plateNo: string;
  createdAt: string;
};

export type ScanDataType = {
  plateNumberIn: string;
  plateNumberOut: string;
  qrCode: string;
};
