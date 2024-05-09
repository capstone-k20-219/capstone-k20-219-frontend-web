const getCheckedInList = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/parking-tickets/all`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        next: { revalidate: 3600 },
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

const getTrafficDataOut = async (
  token: string,
  fromDate: string,
  toDate: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/parking-tickets/history/all?fromDate=${fromDate}&toDate=${toDate}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        next: { revalidate: 3600 },
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

const getTrafficDataOutByService = async (token: string, serviceId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/parking-tickets/history/all?serviceId=${serviceId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        next: { revalidate: 3600 },
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

const getTrafficDataIn = async (
  token: string,
  fromDate: string,
  toDate: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/parking-tickets/history/checkIn?fromDate=${fromDate}&toDate=${toDate}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        next: { revalidate: 3600 },
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
  getCheckedInList,
  getTrafficDataOut,
  getTrafficDataIn,
  getTrafficDataOutByService,
};
