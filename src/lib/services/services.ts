import { ServiceDBPostType, ServiceDBPutType } from "../type";

const createService = async (token: string, service: ServiceDBPostType) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(service),
    });

    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
};

const updateService = async (token: string, service: ServiceDBPutType) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(service),
    });

    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
};

const getAllServices = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/all`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
};

const deleteServiceById = async (token: string, id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
};

export { createService, updateService, getAllServices, deleteServiceById };
