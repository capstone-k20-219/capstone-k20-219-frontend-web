"use client";

//Assets

//Libraries
import Card from "@/components/Card";
import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import TableResults from "@/components/TableResults";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import ButtonWhite from "@/components/ButtonWhite";
import InputComponent from "@/components/InputComponent";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { ServiceData } from "@/lib/type";
import { ServiceRows } from "@/lib/data";
import { useAppSelector } from "@/redux/store";

function AddServiceForm({
  onClose,
  open,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState(0);
  const [newVehicleType, setNewVehicleType] = useState("");
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
              name="serviceName"
              type="text"
              value={newServiceName}
              label="Service name"
              onChangeFunction={(e) => setNewServiceName(e.target.value)}
            />

            <InputComponent
              name="servicePrice"
              type="number"
              value={String(newServicePrice)}
              label="Service price ($)"
              onChangeFunction={(e) => setNewServicePrice(e.target.value)}
            />
            <InputComponent
              name="vehicleType"
              type="text"
              value={newVehicleType}
              onChangeFunction={(e) => setNewVehicleType(e.target.value)}
              label="Vehicle type"
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

export default function ManagerService() {
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState<ServiceData[] | null>(null);
  const role = useAppSelector((state) => state.auth.value.role);

  useEffect(() => {
    const retrieve = ServiceRows; // use api later
    setData(retrieve);
  }, []);

  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Service management"]} />
      <div className="mt-5 h-full w-full pb-12">
        <Card className="w-full h-full p-5 overflow-hidden flex flex-col items-center gap-4">
          <div className="w-full justify-between items-center flex gap-10">
            <SearchBar />
            <Button
              name="Add new service"
              className="p-2.5 px-3 leading-4 text-sm"
              onClickFunction={() => setIsAdd(true)}
            />
          </div>
          <TableResults tableType="service" data={data} />
        </Card>
        <AddServiceForm onClose={setIsAdd} open={isAdd} />
      </div>
    </Fragment>
  );
}
