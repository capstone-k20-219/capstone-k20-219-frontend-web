"use client";

//Assets

//Libraries
import {
  EmployeeColumn,
  EmployeeData,
  ServiceColumn,
  ServiceData,
  TableType,
  VehicleTypeColumn,
  VehicleTypeData,
} from "@/app/interface";
import { useState } from "react";
import Button from "./Button";

//Define

const employeeColumns: readonly EmployeeColumn[] = [
  { id: "id", label: "Employee ID", minWidth: 130, align: "center" },
  { id: "name", label: "Full name", minWidth: 170, align: "center" },
  { id: "phone", label: "Phone number", minWidth: 130, align: "center" },
  { id: "action", label: "Action", minWidth: 170, align: "center" },
];

const employeeRows: EmployeeData[] = [
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
  {
    id: "MPL23456",
    name: "Nguyen Huu Duc",
    phone: "0983786674",
  },
];

function EmployeeTable() {
  return (
    <div className="h-fit flex-col justify-start items-center flex text-neutral-900 text-base leading-tight">
      <table aria-label="sticky table" className="w-full h-full">
        <thead className="sticky top-0 bg-white font-bold h-10">
          <tr className="">
            {employeeColumns.map((column) => (
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
          {employeeRows.map((row) => {
            return (
              <tr
                tabIndex={-1}
                key={row.id}
                className="h-[60px] border-b border-neutral-500"
              >
                {employeeColumns.slice(0, 3).map((column) => {
                  const value = row[column.id];
                  return (
                    <td key={column.id} align={column.align}>
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </td>
                  );
                })}
                {employeeColumns.slice(-1).map((column) => {
                  return (
                    <td
                      key={column.id}
                      align={column.align}
                      className="flex gap-3 justify-center items-center h-full"
                    >
                      <Button name="View" className="p-2.5" />
                      <Button name="Delete" className="p-2.5" />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const vehicleTypeColumns: readonly VehicleTypeColumn[] = [
  { id: "name", label: "Type name", minWidth: 130, align: "center" },
  {
    id: "bookingFee",
    label: "Booking fee / day",
    minWidth: 170,
    align: "center",
    format: (value: number) => `$${value}.00`,
  },
  {
    id: "parkingFee",
    label: "Parking fee / day",
    minWidth: 130,
    align: "center",
    format: (value: number) => `$${value}.00`,
  },
  { id: "action", label: "Action", minWidth: 170, align: "center" },
];

const vehicleTypeRows: VehicleTypeData[] = [
  {
    name: "Motobike",
    bookingFee: 2,
    parkingFee: 4,
  },
  {
    name: "Bikecycle",
    bookingFee: 2,
    parkingFee: 4,
  },
  {
    name: "Car",
    bookingFee: 2,
    parkingFee: 4,
  },
  {
    name: "Truck",
    bookingFee: 2,
    parkingFee: 4,
  },
];

function VehicleTypeTable() {
  return (
    <div className="h-fit flex-col justify-start items-center flex text-neutral-900 text-base leading-tight">
      <table aria-label="sticky table" className="w-full h-full">
        <thead className="sticky top-0 bg-white font-bold h-10">
          <tr className="">
            {vehicleTypeColumns.map((column) => (
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
          {vehicleTypeRows.map((row) => {
            return (
              <tr
                tabIndex={-1}
                key={row.id}
                className="h-[60px] border-b border-neutral-500"
              >
                {vehicleTypeColumns.slice(0, 3).map((column) => {
                  const value = row[column.id];
                  return (
                    <td key={column.id} align={column.align}>
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </td>
                  );
                })}
                {vehicleTypeColumns.slice(-1).map((column) => {
                  return (
                    <td
                      key={column.id}
                      align={column.align}
                      className="flex gap-3 justify-center items-center h-full"
                    >
                      <Button name="Update" className="p-2.5" />
                      <Button name="Delete" className="p-2.5" />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const ServiceColumns: readonly ServiceColumn[] = [
  { id: "name", label: "Service name", minWidth: 130, align: "center" },
  {
    id: "price",
    label: "Service price",
    minWidth: 170,
    align: "center",
    format: (value: number) => `$${value}.00`,
  },
  {
    id: "typ",
    label: "Service type",
    minWidth: 130,
    align: "center",
  },
  { id: "action", label: "Action", minWidth: 170, align: "center" },
];

const ServiceRows: ServiceData[] = [
  {
    name: "Charging",
    price: 10,
    typ: "E-car",
  },
  {
    name: "Washing",
    price: 10,
    typ: "Car",
  },
  {
    name: "Washing",
    price: 6,
    typ: "Motobike",
  },
  {
    name: "Maintenance",
    price: 25,
    typ: "Car",
  },
];

function ServiceTable() {
  return (
    <div className="h-fit flex-col justify-start items-center flex text-neutral-900 text-base leading-tight">
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
                      <Button name="Update" className="p-2.5" />
                      <Button name="Delete" className="p-2.5" />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function TableResults({ tableType }: { tableType: TableType }) {
  return (
    <div className="Content w-full h-full overflow-auto">
      {tableType === 0 ? (
        <EmployeeTable />
      ) : tableType === 1 ? (
        <VehicleTypeTable />
      ) : tableType === 2 ? (
        <ServiceTable />
      ) : null}
    </div>
  );
}
