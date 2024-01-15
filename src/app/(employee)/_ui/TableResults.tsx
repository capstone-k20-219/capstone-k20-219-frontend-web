"use client";

//Assets

//Libraries
import {
  EmployeeColumn,
  EmployeeData,
  ServiceColumn,
  ServiceData,
  ServiceRequestColumn,
  ServiceRequestData,
  TableType,
  VehicleTypeColumn,
  VehicleTypeData,
} from "@/app/interface";
import { useState } from "react";
import Button from "./Button";

//Define

const ServiceColumns: readonly ServiceRequestColumn[] = [
  { id: "plate", label: "Vehicle", minWidth: 130, align: "center" },
  {
    id: "phone",
    label: "Customer's phone number",
    minWidth: 170,
    align: "center",
  },
  {
    id: "time",
    label: "Booking time",
    minWidth: 130,
    align: "center",
  },
  { id: "action", label: "Action", minWidth: 170, align: "center" },
];

const ServiceRows: ServiceRequestData[] = [
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
  {
    plate: "HP234-23.444",
    phone: "0983786674",
    time: "12:30 29/10/2023",
  },
];

function ServiceTable({
  name,
  openInitial,
}: {
  name: string;
  openInitial: boolean;
}) {
  const [open, setOpen] = useState(openInitial);

  return (
    <div className="h-fit flex-col justify-start items-center flex text-neutral-900 text-base leading-tight">
      <div
        className="w-full p-2.5 font-bold bg-neutral-900 text-white text-center"
        onClick={() => setOpen(!open)}
      >
        {name}
      </div>
      <div
        className={`w-full overflow-auto transition-all ease-out duration-300 ${
          open ? "max-h-[230px]" : "max-h-[0]"
        }`}
      >
        <table aria-label="sticky table" className="w-full h-full">
          <thead className="sticky top-0 bg-white font-bold h-10">
            <tr className="">
              {ServiceColumns.map((column) => (
                <th
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="border-b border-neutral-900"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-normal">
            {ServiceRows.map((row) => {
              return (
                <tr
                  tabIndex={-1}
                  key={row.id}
                  className="h-[60px] border-b border-neutral-500"
                >
                  {ServiceColumns.slice(0, 3).map((column) => {
                    const value = row[column.id];
                    return (
                      <td key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </td>
                    );
                  })}
                  {ServiceColumns.slice(-1).map((column) => {
                    return (
                      <td
                        key={column.id}
                        align={column.align}
                        className="flex gap-3 justify-center items-center h-full"
                      >
                        <Button name="Accept" className="p-2.5" />
                        <Button name="Reject" className="p-2.5" />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TableResults() {
  return (
    <div className="Content w-full h-full overflow-auto flex flex-col gap-1">
      <ServiceTable name="Washing" openInitial={true} />
      <ServiceTable name="Charging" openInitial={false} />
      <ServiceTable name="Maintaining" openInitial={false} />
    </div>
  );
}
