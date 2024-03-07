"use client";

import {
  EmployeeColumn,
  ServiceColumn,
  ServiceRequestColumn,
  TableData,
  VehicleTypeColumn,
} from "@/lib/type";
import Button from "@/components/Button";

function NoDataFound() {
  return (
    <div className="w-full p-20 px-10 text-center text-neutral-600 text-xl">
      There is no data in the system!
    </div>
  );
}

function NoBookingRequest() {
  return (
    <div className="w-full p-20 px-10 text-center text-neutral-600 text-xl">
      There is no booking request for this service!
    </div>
  );
}

// Columns configuration
const employeeColumns: readonly EmployeeColumn[] = [
  { id: "id", label: "Employee ID", minWidth: 130, align: "center" },
  { id: "name", label: "Full name", minWidth: 170, align: "center" },
  { id: "phone", label: "Phone number", minWidth: 130, align: "center" },
  { id: "action", label: "Action", minWidth: 170, align: "center" },
];
const vehicleTypeColumns: readonly VehicleTypeColumn[] = [
  { id: "id", label: "Type ID", minWidth: 130, align: "center" },
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
const ServiceRequestColumns: readonly ServiceRequestColumn[] = [
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

const tableColumns = {
  employee: employeeColumns,
  vehicle: vehicleTypeColumns,
  service: ServiceColumns,
  service_request: ServiceRequestColumns,
};

export default function TableResults({
  tableType,
  data,
}: {
  tableType: "employee" | "vehicle" | "service" | "service_request";
  data: TableData;
}) {
  const columns = tableColumns[tableType];

  return (
    <div className="w-full h-fit text-neutral-900 text-sm leading-tight overflow-auto">
      {data ? (
        <table
          aria-label="sticky table"
          className="w-full h-full overflow-auto"
        >
          <thead className="sticky top-0 bg-white font-bold h-10 shadow-sm">
            <tr className="bg-slate-200">
              {columns.map((column) => (
                <th
                  key={`header-${column.id}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr
                tabIndex={-1}
                key={row.id + `${Math.random() * 100000}`}
                className="h-[50px] border-b border-neutral-500"
              >
                {columns.slice(0, columns.length - 1).map((column) => {
                  const value = row[column.id];
                  return (
                    <td key={column.id} align={column.align}>
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </td>
                  );
                })}
                {columns.slice(-1).map((column) => {
                  return (
                    <td
                      key={column.id}
                      align={column.align}
                      className="flex gap-3 justify-center items-center h-full"
                    >
                      <Button name="Update" className="p-2 px-2.5 text-sm" />
                      <Button name="Delete" className="p-2 px-2.5 text-sm" />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : tableType === "service_request" ? (
        <NoBookingRequest />
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}
