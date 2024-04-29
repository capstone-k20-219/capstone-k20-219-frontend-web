"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import SmallStatisticsContent from "@/components/SmallStatisticsContent";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { useState } from "react";
import { SlotBlock, ParkingLotMapEdit } from "@/components/ParkingLotMap";
import { getSlotList, getVehicleTypeListForMap } from "@/lib/actions";
import toast from "react-hot-toast";
import { PageContentCotainer2 } from "@/components/ContainerUI";
import { VehicleTypeData } from "@/lib/type";

function CardsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full items-center grid gap-3 grid-flow-row sm:grid-flow-col sm:grid-cols-3">
      {children}
    </div>
  );
}

export default function ManagerMap() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<SlotBlock[]>([]);
  const [vehicleList, setVehicleList] = useState<VehicleTypeData[]>([]);

  getVehicleTypeListForMap().then((res) => {
    setVehicleList(res as VehicleTypeData[]);
  });

  getSlotList().then((value) => {
    if (!value.success) {
      toast.error("Error when fetching parking lot information");
    } else {
      setData(value.data as SlotBlock[]);
    }
  });

  return (
    <>
      <BreadcrumbsComponent dir={["Map management"]} />
      <PageContentCotainer2 className="overflow-hidden pb-32">
        {!isEdit && (
          <CardsContainer>
            <Card className="h-full w-full">
              <SmallStatisticsContent
                name="Total slots"
                value={String(data.length)}
              />
            </Card>
            <Card className="h-full w-full">
              <SmallStatisticsContent
                name="Parking lot status"
                value="Still in business"
              />
            </Card>
            <Button
              name="Edit Map"
              className="p-5 font-bold w-full h-full"
              onClickFunction={() => setIsEdit(true)}
            />
          </CardsContainer>
        )}
        {isEdit && (
          <Button
            name="Save Map"
            className="p-5 py-2.5 font-bold w-full"
            onClickFunction={() => {
              setIsEdit(false);
            }}
          />
        )}
        <ParkingLotMapEdit
          editable={isEdit}
          dataInit={data}
          vehicleList={vehicleList}
        />
      </PageContentCotainer2>
    </>
  );
}
