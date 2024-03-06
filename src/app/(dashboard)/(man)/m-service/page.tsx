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
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState(0);
  const [newVehicleType, setNewVehicleType] = useState("");

  return (
    <div className="w-full h-full absolute top-0 left-0 z-100 bg-neutral-200 bg-opacity-40 overflow-hidden flex items-center justify-center">
      <Card className="w-1/2 h-auto text-base p-8 py-10 ">
        <form className="w-full h-full flex-col justify-center items-start gap-2.5 flex">
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
          <div className="w-full font-bold mt-4 flex gap-4">
            <ButtonWhite
              name="Cancel"
              className="w-full p-3"
              onClickFunction={() => onClose(false)}
            />
            <Button name="Add" className="w-full p-3" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function ManagerService() {
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState<ServiceData[] | null>(null);
  const role = useAppSelector((state) => state.authReducer.value.role);

  useEffect(() => {
    const retrieve = ServiceRows; // use api later
    setData(retrieve);
  }, []);

  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Service"]} />
      <div className="w-full my-6 pt-6 pb-12 flex flex-col gap-6 h-full">
        <Card className="w-full h-full p-8 px-5">
          <div className="w-full h-full overflow-hidden flex flex-col items-center gap-9">
            {/* Searching and adding functions */}
            <div className="w-full justify-between items-center flex gap-10">
              {/* Form for searching */}
              <SearchBar />
              {/* Adding button */}
              <Button
                name="Add service"
                className="p-3 text-sm font-normal leading-4"
                onClickFunction={() => setIsAdd(true)}
              />
            </div>
            {/* Table of results */}
            <TableResults tableType="service" data={data} />
          </div>
        </Card>
        {isAdd && <AddServiceForm onClose={setIsAdd} />}
      </div>
    </Fragment>
  );
}
