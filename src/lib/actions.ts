// "use server";

import {
  ServiceList,
  ServiceRows,
  SlotList,
  employeeRows,
  mockFeedbackData,
  mockServiceRequestData,
  temporaryLoginInfo,
  vehicleTypeRows,
} from "./data";
import { FormStateType, LoginFormStateType } from "./type";

export const getServiceListName = async () => {
  // fetch something
  // ...
  return ServiceList;
};

export const getServiceReservationsByName = async (serviceName: string) => {
  try {
    if (!serviceName) {
      throw new Error();
    } else {
      const key = serviceName.toLowerCase();
      // fetch something
      // ...
      return mockServiceRequestData[key];
    }
  } catch (e) {
    return "Cannot find service reservations.";
  }
};

export const getFeedbacksByName = async (serviceName: string) => {
  try {
    if (!serviceName) {
      throw new Error();
    } else {
      const key = serviceName.toLowerCase();
      // fetch something
      // ...
      return mockFeedbackData[key];
    }
  } catch (e) {
    return "Cannot find service feedbacks.";
  }
};

export const validateKeySearch = async (
  previousState: string,
  formData: FormData
) => {
  const keySearch: string = formData.get("key-search") as string;
  // validate the key in string

  return keySearch;
};

export const getEmployeeList = async (keySearch: string) => {
  //fetch something
  // ...

  if (keySearch === "") {
    return employeeRows;
  } else {
    const key = keySearch.toLowerCase();
    const res = employeeRows.filter((item) => {
      return (
        item.id.toLowerCase().includes(key) ||
        item.name.toLowerCase().includes(key) ||
        item.phone.includes(key)
      );
    });
    return res;
  }
};

export const getVehicleTypeList = async (keySearch: string) => {
  //fetch something
  // ...

  if (keySearch === "") {
    return vehicleTypeRows;
  } else {
    const key = keySearch.toLowerCase();
    const res = vehicleTypeRows.filter((item) => {
      return (
        String(item.id).toLowerCase().includes(key) ||
        item.name.toLowerCase().includes(key)
      );
    });
    return res;
  }
};

export const getServiceList = async (keySearch: string) => {
  //fetch something
  // ...

  if (keySearch === "") {
    return ServiceRows;
  } else {
    const key = keySearch.toLowerCase();
    const res = ServiceRows.filter((item) => {
      return (
        item.name.toLowerCase().includes(key) ||
        item.typ.toLowerCase().includes(key)
      );
    });
    return res;
  }
};

export const getSlotList = async () => {
  const res = SlotList; // fetch api later

  if (!res) {
    return {
      success: false,
      data: [],
    };
  } else {
    return {
      success: true,
      data: res,
    };
  }
};

export const getVehicleTypeNames = () => {
  const list = vehicleTypeRows;

  if (list === null || list.length === 0) return [];
  return list.map((type) => type.name);
};

export const updateService = (currState: FormStateType, formData: FormData) => {
  // validate the form data
  // ...
  const id = formData.get("id") as string;
  if (id === "") {
    // add new record
  } else {
    // update record
  }
};

export const checkAuthorization = (
  username: string,
  password: string,
  role: string
) => {
  console.log("username:", username, "\npsswd:", password, "\nrole:", role);
  let id = "";
  const isValid: boolean = temporaryLoginInfo.some((e) => {
    if (e.username === username && e.password === password && e.role === role) {
      id = e.id;
      return true;
    }
  });
  return { isValid, id };
};

export const handleLogin = async (
  currState: LoginFormStateType,
  formData: FormData
) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const { isValid, id } = checkAuthorization(username, password, role);
  console.log(isValid);
  if (isValid) {
    return {
      success: isValid,
      data: { username, role, id },
    };
  } else {
    return {
      success: isValid,
      data: null,
    };
  }
};

export function formatInputDateString(s: string) {
  let reFormattedDate = s.split("/");
  return reFormattedDate.reverse().join("-");
}

export function formatValueDateString(s: string) {
  let reFormattedDate = s.split("-");
  return reFormattedDate.reverse().join("/");
}

export const getVehicleTypeListForMap = async () => {
  try {
    const res = vehicleTypeRows;
    return res;
  } catch (e) {
    console.log(e);
  }
};
