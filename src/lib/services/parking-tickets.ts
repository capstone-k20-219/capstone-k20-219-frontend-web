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

const checkIn = async (token: string, plateNo: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/parking-tickets/check-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          plateNo: plateNo,
        }),
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

const checkOut = async (token: string, ticketId: string, plateNo: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/parking-tickets/check-out`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          id: ticketId,
          plateNo: plateNo,
        }),
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

const updateBill = async (token: string, ticketId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/parking-tickets/updateTicketPaidStatus`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          id: ticketId,
          isPaid: true,
        }),
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
  checkIn,
  checkOut,
  updateBill,
  getCheckedInList,
  getTrafficDataOut,
  getTrafficDataIn,
  getTrafficDataOutByService,
};
