"use client";

import Card from "@/components/Card";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import {
  DialogContainer,
  PageContentCotainer3,
} from "@/components/ContainerUI";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { forwardRef, useEffect, useRef, useState } from "react";
import {
  OptionType,
  ServiceBookingDBGetType,
  ServiceDBGetType,
  ServiceRequestData,
} from "@/lib/type";
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
import { formatCreatedTime, statusAction } from "@/lib/helpers";
import { getAllServices } from "@/lib/services/services";
import useToken from "@/lib/hooks/refresh-token";
import {
  acceptServiceBooking,
  getServiceBookingByService,
  rejectServiceBooking,
} from "@/lib/services/service-bookings";
import {
  ResultsTableSkeleton,
  ServiceRequestBoardSkeleton,
} from "@/components/Skeleton";
import InputComponent from "@/components/InputComponent";
import ButtonWhite from "@/components/ButtonWhite";
import usePagination from "@/lib/hooks/pagination";

interface ServiceRequestColumn {
  id: "id" | "plateNo" | "slotId" | "createdAt" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: string) => string;
  paddingLeft?: string;
  paddingRight?: string;
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
    id: "plateNo",
    label: "Vehicle plateNo",
    minWidth: 150,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "slotId",
    label: "Parking slot",
    minWidth: 130,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "createdAt",
    label: "Booking time",
    minWidth: 150,
    align: "left",
    paddingLeft: "12px",
    format: formatCreatedTime,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
    paddingRight: "20px",
  },
];

type TableResultsProps = {
  data: ServiceRequestData[];
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
    if (data.length === 0) onDecreasePage();
  }, [data]);
  return (
    <>
      {data.length ? (
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
                    paddingRight: column.paddingRight,
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
                      style={{
                        paddingLeft: column.paddingLeft,
                        paddingRight: column.paddingRight,
                      }}
                    >
                      {column.format ? column.format(value) : value}
                    </td>
                  );
                })}
                {columns.slice(-1).map((column) => {
                  return (
                    <td
                      key={column.id}
                      align={column.align}
                      style={{
                        paddingLeft: column.paddingLeft,
                        paddingRight: column.paddingRight,
                      }}
                      className="flex gap-3 items-center h-full justify-end"
                    >
                      <Button
                        name="Reject"
                        className="button-action"
                        onClickFunction={() => onRejectRequest(row.id)}
                      />
                      <Button
                        name="Accept"
                        className="button-action"
                        onClickFunction={() => onAcceptRequest(row.id)}
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

type AcceptBookingModalProps = {
  bookingId: number | null;
  onClose: () => void;
  onAcceptRequest: (id: number) => void;
};

const AcceptBookingModal = forwardRef<
  HTMLDialogElement,
  AcceptBookingModalProps
>(({ bookingId, onClose, onAcceptRequest }, refModal) => {
  const { refreshToken, token } = useToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const refForm = useRef<HTMLFormElement>(null);

  const handleCloseModal = () => {
    refForm.current?.reset();
    setErrorMessage("");
    onClose();
  };

  const handleAcceptRequest = async (id: number, quantity: number) => {
    try {
      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await acceptServiceBooking(newToken, id, quantity);
        if (res.status === 200) {
          onAcceptRequest(id);
          handleCloseModal();
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error when accepting booking");
    }
  };

  const handleFormAction = async (formData: FormData) => {
    try {
      if (bookingId === null) {
        toast.error("Cannot accept service booking with no id");
        return;
      }

      setErrorMessage("");
      if (quantity <= 0) {
        setErrorMessage("Quantity of service is at least 1.");
        return;
      }

      await handleAcceptRequest(bookingId, quantity);
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <DialogContainer ref={refModal}>
      {bookingId !== null && (
        <form
          ref={refForm}
          action={handleFormAction}
          className="w-full h-full flex-col justify-center gap-2.5 flex"
        >
          <InputComponent
            name="quantity"
            type="number"
            value={quantity}
            label="Quantity of service (liters, hours, times, ...)"
            onChangeFunction={(e) => setQuantity(Number(e.target.value))}
          />
          {errorMessage && (
            <div className="mt-2.5 gap-4 text-red-500 text-sm">
              <i>{errorMessage}</i>
            </div>
          )}
          <div className="w-full font-bold mt-2.5 flex gap-4">
            <ButtonWhite
              name="Cancel"
              className="w-full text-sm px-2.5 py-2"
              onClickFunction={handleCloseModal}
            />
            <Button
              name="Save"
              className="w-full text-sm px-2.5 py-2"
              type="submit"
            />
          </div>
        </form>
      )}
    </DialogContainer>
  );
});

AcceptBookingModal.displayName = "AcceptBookingModal";

export default function EmployeeService() {
  const { refreshToken, token } = useToken();
  const [serviceList, setServiceList] = useState<OptionType[] | null>(null);
  const [serviceFilter, setServiceFilter] = useState("");
  const [requestId, setRequestId] = useState<number | null>(null);
  const refModal = useRef<HTMLDialogElement>(null);

  const [dataStorage, setDataStorage] = useState<ServiceRequestData[] | null>(
    null
  );
  const [data, setData] = useState<ServiceRequestData[]>([]);

  const {
    currentPage,
    currentRecords,
    recordsPerPage,
    handleChangePage,
    handleDecreasePage,
    setCurrentPage,
  } = usePagination<ServiceRequestData>({ data: data, pageSize: 7 });

  const handleChangeSelect = (e: SelectChangeEvent) => {
    setServiceFilter(e.target.value);
  };

  const toggleModal = () => {
    if (!refModal?.current) return;
    refModal.current.hasAttribute("open")
      ? refModal.current.close()
      : refModal.current.showModal();
  };

  const handleDeleteDataLocal = (id: number) => {
    const newData = dataStorage
      ? dataStorage.filter((item) => item.id !== id)
      : [];
    const pageData = currentRecords.filter((item) => item.id !== id);
    if (!pageData.length) handleDecreasePage();
    setDataStorage(newData);
    setData(newData);
  };

  const handleOpenModalAccept = (id: number) => {
    setRequestId(id);
    toggleModal();
  };

  const handleAcceptRequestLocal = (id: number) => {
    // remove from queue and update the bill
    handleDeleteDataLocal(id);
    toast.success(`The service booking (id: ${id}) is completed.`);
  };

  const handleRejectRequestLocal = (id: number) => {
    // remove from queue without updating the bill
    handleDeleteDataLocal(id);
    toast.success(`The service booking (id: ${id}) is rejected.`);
  };

  const handleRejectRequest = async (id: number) => {
    try {
      let isUnauthorized = false;
      // let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          // newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await rejectServiceBooking(token, id);
        if (res.status === 200) {
          handleRejectRequestLocal(id);
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error!");
    }
  };

  const handleGetServiceBooking = async (serviceId: string) => {
    try {
      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await getServiceBookingByService(newToken, serviceId);
        if (res.status === 200) {
          const resData: ServiceBookingDBGetType[] =
            res.data as ServiceBookingDBGetType[];
          const newData: ServiceRequestData[] = resData.map((item) => ({
            id: item.id,
            createdAt: item.createdAt,
            slotId: item.ticket.slotId,
            plateNo: item.ticket.plateNo,
          }));
          setDataStorage(newData);
          setData(newData);
          // console.log(res.data);
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error!");
    }
  };

  const handleGetService = async () => {
    try {
      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await getAllServices(newToken);
        if (res.status === 200) {
          const newData: ServiceDBGetType[] = res.data as ServiceDBGetType[];
          setServiceList(
            newData.map((item) => ({
              value: item.id,
              name: item.name,
            }))
          );
          setServiceFilter(newData.length ? newData[0].id : "");
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error!");
    }
  };

  useEffect(() => {
    handleGetService();
  }, []);

  useEffect(() => {
    if (serviceFilter) {
      setDataStorage(null);
      handleGetServiceBooking(serviceFilter);
      setCurrentPage(1);
    }
  }, [serviceFilter]);

  return (
    <>
      <BreadcrumbsComponent dir={["Service"]} />
      <PageContentContainer>
        {serviceList ? (
          serviceList.length ? (
            <>
              <FormControl
                sx={{ m: 0, minWidth: 120 }}
                size="small"
                className="w-full"
              >
                <InputLabel id="demo-select-small-label">Service</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={serviceFilter}
                  label="Service"
                  name="service-name"
                  onChange={handleChangeSelect}
                >
                  {serviceList.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {dataStorage ? (
                <>
                  <DataBottomContainer>
                    <TableResults
                      data={currentRecords}
                      onAcceptRequest={handleOpenModalAccept}
                      onRejectRequest={handleRejectRequest}
                      onDecreasePage={handleDecreasePage}
                    />
                  </DataBottomContainer>
                  {data.length > recordsPerPage && (
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
                </>
              ) : (
                <ResultsTableSkeleton />
              )}
            </>
          ) : (
            <PageContentCotainer3>
              <Card className="w-full flex item-center justify-center p-10 text-xl text-neutral-600">
                <h1>The Parking Lot recently provide no service!</h1>
              </Card>
            </PageContentCotainer3>
          )
        ) : (
          <ServiceRequestBoardSkeleton />
        )}
      </PageContentContainer>
      <AcceptBookingModal
        ref={refModal}
        bookingId={requestId}
        onAcceptRequest={handleAcceptRequestLocal}
        onClose={toggleModal}
      />
    </>
  );
}
