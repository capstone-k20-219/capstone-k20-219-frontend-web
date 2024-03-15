// "use server";

import {
  ServiceList,
  ServiceRows,
  employeeRows,
  mockData,
  temporaryLoginInfo,
  vehicleTypeRows,
} from "./data";

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
      return mockData[key];
    }
  } catch (e) {
    return "Cannot find service reservations.";
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
        item.id.toLowerCase().includes(key) ||
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

export const onLogin = (formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");
  const role = formData.get("role");
  let id = "";
  const isValid: boolean = temporaryLoginInfo.some((e) => {
    if (e.username === username && e.password === password && e.role === role) {
      id = e.id;
      return true;
    }
  });
  return isValid ? { username, id } : null;
};
