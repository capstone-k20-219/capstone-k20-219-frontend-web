"use client";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { getServiceReservationsByName } from "@/lib/actions";
import { ServiceRequestData } from "@/lib/type";
import toast from "react-hot-toast";
import NoDataFound from "@/components/NoDataFound";
import Button from "@/components/Button";
import {
  DataBottomContainer,
  PageContentContainer,
  TableBodyContainer,
  TableContainer,
  TableHeadContainer,
  TableRowBodyContainer,
  TableRowHeadContainer,
} from "@/components/ContainerUI";
import { Stack, Pagination } from "@mui/material";

interface ServiceRequestColumn {
  id: "id" | "plate" | "name" | "phone" | "time" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: number) => string;
  paddingLeft?: string;
}

const columns: readonly ServiceRequestColumn[] = [
  {
    id: "id",
    label: "Booking ID",
    minWidth: 100,
    align: "left",
    paddingLeft: "20px",
  },
  {
    id: "plate",
    label: "Vehicle",
    minWidth: 100,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "name",
    label: "Customer's name",
    minWidth: 150,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "phone",
    label: "Phone number",
    minWidth: 130,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "time",
    label: "Booking time",
    minWidth: 130,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "left",
    paddingLeft: "12px",
  },
];

type TableResultsProps = {
  data: ServiceRequestData[] | null;
  onAcceptRequest: (id: number) => void;
  onRejectRequest: (id: number) => void;
  onDecreasePage: () => void;
};

function TableResults({
  data,
  onAcceptRequest,
  onRejectRequest,
  onDecreasePage,
}: TableResultsProps) {
  useEffect(() => {
    if (data === null) return;
    if (data.length === 0) onDecreasePage();
  }, [data]);
  return (
    <>
      {data && data.length > 0 ? (
        <TableContainer>
          <TableHeadContainer>
            <TableRowHeadContainer>
              {columns.map((column) => (
                <th
                  key={`header-${column.id}`}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    paddingLeft: column.paddingLeft,
                  }}
                >
                  {column.label}
                </th>
              ))}
            </TableRowHeadContainer>
          </TableHeadContainer>
          <TableBodyContainer>
            {data?.map((row) => (
              <TableRowBodyContainer key={row.id + `${Math.random() * 100000}`}>
                {columns.slice(0, columns.length - 1).map((column) => {
                  const value = row[column.id];
                  return (
                    <td
                      key={column.id}
                      align={column.align}
                      style={{ paddingLeft: column.paddingLeft }}
                    >
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
                      style={{ paddingLeft: column.paddingLeft }}
                      className="flex gap-3 items-center h-full"
                    >
                      <Button
                        name="Accept"
                        className="button-action"
                        onClickFunction={() => onAcceptRequest(row.id)}
                      />
                      <Button
                        name="Reject"
                        className="button-action"
                        onClickFunction={() => onRejectRequest(row.id)}
                      />
                    </td>
                  );
                })}
              </TableRowBodyContainer>
            ))}
          </TableBodyContainer>
        </TableContainer>
      ) : (
        <NoDataFound>There is no booking request for this service!</NoDataFound>
      )}
    </>
  );
}

export default function EmployeeServiceContent({
  serviceList,
}: {
  serviceList: string[];
}) {
  const [service, setService] = useState(serviceList[0]);
  const [data, setData] = useState<ServiceRequestData[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 7;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = data
    ? data.slice(indexOfFirstRecord, indexOfLastRecord)
    : null;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleDecreasePage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSelect = (e: SelectChangeEvent) => {
    setService(e.target.value);
  };

  const handleAcceptRequest = (id: number) => {
    // remove from queue and update the bill
    setData((prev) => {
      if (prev === null) return prev;
      return prev.filter((item) => item.id !== id);
    });
    toast.success("The request is accepted.");
  };

  const handleRejectRequest = (id: number) => {
    // remove from queue without updating the bill
    setData((prev) => {
      if (prev === null) return prev;
      return prev.filter((item) => item.id !== id);
    });
    toast.success("The request is rejected.");
  };

  useEffect(() => {
    const fetchServiceData = async () => {
      const res = await getServiceReservationsByName(service);
      if (typeof res !== "string") setData(res);
      else {
        toast.error(res);
      }
    };
    fetchServiceData();
  }, [service]);

  return (
    <PageContentContainer>
      <FormControl sx={{ m: 0, minWidth: 120 }} size="small" className="w-full">
        <InputLabel id="demo-select-small-label">Service</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={service as string}
          label="Service"
          name="service-name"
          onChange={handleChangeSelect}
        >
          {serviceList.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DataBottomContainer>
        <TableResults
          data={currentRecords}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
          onDecreasePage={handleDecreasePage}
        />
      </DataBottomContainer>
      {data && data.length > recordsPerPage && (
        <Stack mt={"auto"}>
          <Pagination
            defaultPage={1}
            count={Math.ceil(data.length / recordsPerPage)}
            shape="rounded"
            page={currentPage}
            onChange={handleChangePage}
          />
        </Stack>
      )}
    </PageContentContainer>
  );
}
