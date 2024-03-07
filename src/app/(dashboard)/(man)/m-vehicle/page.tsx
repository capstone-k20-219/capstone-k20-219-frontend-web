"use client";

//Assets

//Libraries
import Card from "@/components/Card";
import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import TableResults from "@/components/TableResults";
import InputComponent from "@/components/InputComponent";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import ButtonWhite from "@/components/ButtonWhite";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { VehicleTypeData } from "@/lib/type";
import { vehicleTypeRows } from "@/lib/data";
import { useAppSelector } from "@/redux/store";

function AddVehicleTypeForm({
  onClose,
  open,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const [newTypeName, setNewTypeName] = useState("");
  const [newBookingFee, setNewBookingFee] = useState(0);
  const [newParkingFee, setNewParkingFee] = useState(0);
  const [isClose, setIsClose] = useState(true);

  return (
    open && (
      <div className="w-full h-full absolute top-0 left-0 z-100 bg-neutral-200 bg-opacity-40 overflow-hidden flex items-center justify-center">
        <Card
          className={`w-3/4 h-auto p-6 py-5 sm:w-1/2 ${
            isClose ? "animate-fadeTopIn" : "animate-fadeTopOut"
          }`}
        >
          <form className="w-full h-full flex-col justify-center gap-2.5 flex">
            <InputComponent
              name="typeName"
              type="text"
              value={newTypeName}
              label="Type name"
              onChangeFunction={(e) => setNewTypeName(e.target.value)}
            />
            <InputComponent
              name="bookingFee"
              type="number"
              value={String(newBookingFee)}
              label="Booking fee ($)"
              onChangeFunction={(e) => setNewBookingFee(e.target.value)}
            />
            <InputComponent
              name="parkingFee"
              type="number"
              value={String(newParkingFee)}
              onChangeFunction={(e) => setNewParkingFee(e.target.value)}
              label="Parking fee / day ($)"
            />
            <div className="w-full font-bold mt-2.5 flex gap-4">
              <ButtonWhite
                name="Cancel"
                className="w-full text-sm px-2.5 py-2"
                onClickFunction={() => {
                  setIsClose(false);
                  setTimeout(() => {
                    onClose(false);
                    setIsClose(true);
                  }, 300);
                }}
              />
              <Button
                name="Add"
                className="w-full text-sm px-2.5 py-2"
                type="submit"
              />
            </div>
          </form>
        </Card>
      </div>
    )
  );
}

export default function ManagerVehicleType() {
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState<VehicleTypeData[] | null>(null);
  const role = useAppSelector((state) => state.auth.value.role);

  useEffect(() => {
    const retrieve = vehicleTypeRows; // use api later
    setData(retrieve);
  }, []);

  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Vehicle type management"]} />
      <div className="mt-5 h-full w-full pb-12">
        <Card className="w-full h-full p-5 overflow-hidden flex flex-col items-center gap-4">
          <div className="w-full justify-between items-center flex gap-10">
            <SearchBar />
            <Button
              name="Add new vehicle type"
              className="p-2.5 px-3 leading-4 text-sm"
              onClickFunction={() => setIsAdd(true)}
            />
          </div>
          <TableResults tableType="vehicle" data={data} />
        </Card>
        <AddVehicleTypeForm onClose={setIsAdd} open={isAdd} />
      </div>
    </Fragment>
  );
}
