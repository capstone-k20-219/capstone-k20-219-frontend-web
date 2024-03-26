"use client";

import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { PageContentContainer } from "@/components/ContainerUI";
import { SlotBlock, ParkingLotMap } from "@/components/ParkingLotMap";
import { getSlotList } from "@/lib/actions";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EmplpoyeeMap() {
  const [data, setData] = useState<SlotBlock[]>([]);

  getSlotList().then((value) => {
    if (!value.success) {
      toast.error("Error when fetching parking lot information");
    } else {
      setData(value.data as SlotBlock[]);
    }
  });
  return (
    <>
      <BreadcrumbsComponent dir={["Map"]} />
      <ParkingLotMap dataInit={data} />
      {/* Search area for slot with id and show the dialog of that slot ? */}
    </>
  );
}
