"use server";

import { ServiceList, mockData } from "./data";

export const getServiceList = async () => {
  // fetch something
  // ...

  return ServiceList;
};

export const getServiceReservationsByName = async (serviceName: string) => {
  // fetch something
  // ...
  try {
    if (!serviceName) return null;
    else {
      const key = serviceName.toLowerCase();
      return mockData[key];
    }
  } catch (e) {
    return "Cannot find service reservations.";
  }
};
