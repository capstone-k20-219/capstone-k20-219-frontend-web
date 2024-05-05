import { SlotBlock } from "../type";

const getParkingSlotList = async (
  token: string,
  id?: string,
  typeId?: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/parking-slots/filter${
        id && typeId
          ? `?id=${id}&typeId=${typeId}`
          : id
          ? `?id=${id}`
          : typeId
          ? `?typeId=${typeId}`
          : ""
      }`,
      {
        method: "GET",
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

const updateDBMap = async (token: string, slotList: SlotBlock[]) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/parking-slots/upsert`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          slots: slotList,
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

export { getParkingSlotList, updateDBMap };
