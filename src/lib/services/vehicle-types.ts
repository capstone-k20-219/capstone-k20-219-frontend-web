import { VehicleTypeData } from "../type";
/*
const getAllVehicleTypes = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle-types`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    
    console.log(res.status);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const getVehicleTypeById = async (token: string, id: string) => {};
*/

const getVehicleTypes = async (token: string, id?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle-types${
        id ? `?id=${id}` : ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // console.log(res.status, res.json());
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

const createVehicleType = async (
  token: string,
  vehicleType: VehicleTypeData
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle-types`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(vehicleType),
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

const updateVehicleType = async (
  token: string,
  vehicleType: VehicleTypeData
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle-types`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(vehicleType),
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

const deleteVehicleType = async (token: string, id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle-types/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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

export {
  getVehicleTypes,
  createVehicleType,
  updateVehicleType,
  deleteVehicleType,
};
