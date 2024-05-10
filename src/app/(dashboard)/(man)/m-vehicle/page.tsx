"use client";

import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { forwardRef, useEffect, useRef, useState } from "react";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { VehicleTypeData } from "@/lib/type";
import NoDataFound from "@/components/NoDataFound";
import InputComponent from "@/components/InputComponent";
import ButtonWhite from "@/components/ButtonWhite";
import {
  DialogContainer,
  PageContentContainer,
  ActionTopContainer,
  TableBodyContainer,
  TableContainer,
  DataBottomContainer,
  TableHeadContainer,
  TableRowBodyContainer,
  TableRowHeadContainer,
} from "@/components/ContainerUI";
import { Stack, Pagination } from "@mui/material";
import {
  createVehicleType,
  deleteVehicleType,
  getVehicleTypes,
  updateVehicleType,
} from "@/lib/services/vehicle-types";
import toast from "react-hot-toast";
import {
  formatMoney,
  sortVehicleTypesById,
  statusAction,
  validateFee,
  validateKeyword,
  validateName,
  validateVehicleTypeID,
} from "@/lib/helpers";
import useToken from "@/lib/hooks/refresh-token";
import { ResultsTableSkeleton } from "@/components/Skeleton";
import usePagination from "@/lib/hooks/pagination";

interface VehicleTypeColumn {
  id: "id" | "name" | "slotBookingFee" | "parkingFee" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: number) => string;
  paddingLeft?: string;
}

const columns: readonly VehicleTypeColumn[] = [
  {
    id: "id",
    label: "Type ID",
    minWidth: 130,
    align: "left",
    paddingLeft: "20px",
  },
  {
    id: "name",
    label: "Type name",
    minWidth: 130,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "slotBookingFee",
    label: "Booking fee",
    minWidth: 130,
    align: "left",
    format: (val: number) => formatMoney(val),
    paddingLeft: "12px",
  },
  {
    id: "parkingFee",
    label: "Parking fee / hour",
    minWidth: 130,
    align: "left",
    format: (val: number) => formatMoney(val),
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
  data: VehicleTypeData[];
  onEdit: () => void;
  onSetupEditData: (data: VehicleTypeData | null) => void;
  onDeleteRecord: (value: any) => void;
  onDecreasePage: () => void;
};

function TableResults({
  data,
  onEdit,
  onSetupEditData,
  onDeleteRecord,
  onDecreasePage,
}: TableResultsProps) {
  useEffect(() => {
    if (data.length === 0) onDecreasePage();
  }, [data]);
  return (
    <>
      {data.length > 0 ? (
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
                      <>
                        <Button
                          name="Update"
                          className="button-action"
                          onClickFunction={() => {
                            onSetupEditData(row);
                            onEdit();
                          }}
                        />
                        <Button
                          name="Delete"
                          className="button-action"
                          onClickFunction={() => {
                            onDeleteRecord(row.id);
                          }}
                        />
                      </>
                    </td>
                  );
                })}
              </TableRowBodyContainer>
            ))}
          </TableBodyContainer>
        </TableContainer>
      ) : (
        <NoDataFound>There is no data in the system!</NoDataFound>
      )}
    </>
  );
}

const initialVehicleTypeData: VehicleTypeData = {
  id: "",
  name: "",
  slotBookingFee: 0,
  parkingFee: 0,
};

type AddVehicleTypeFormProps = {
  existData: VehicleTypeData | null;
  onToggleModal: () => void;
  onExistData: (data: VehicleTypeData | null) => void;
  onAddData: (data: VehicleTypeData) => void;
  onUpdateData: (data: VehicleTypeData) => void;
};

const AddVehicleTypeForm = forwardRef<
  HTMLDialogElement,
  AddVehicleTypeFormProps
>(
  (
    { existData, onToggleModal, onExistData, onAddData, onUpdateData },
    refModal
  ) => {
    const { refreshToken, token } = useToken();

    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setFormData] = useState<VehicleTypeData>(
      initialVehicleTypeData
    );
    const [errorMessage, setErrorMessage] = useState("");

    const handleFormChange = (e: any) => {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    };

    const handleCloseModal = () => {
      setFormData(initialVehicleTypeData);
      onExistData(null);
      onToggleModal();
      setIsUpdate(false);
    };

    const handleValidateFormData = (
      id: string,
      name: string,
      bookingFee: number,
      parkingFee: number
    ) => {
      const validID = validateVehicleTypeID(id);
      if (!validID.valid) {
        return validID;
      }
      const validName = validateName(name);
      if (!validName.valid) {
        return validName;
      }
      const validBookingFee = validateFee(bookingFee);
      if (!validBookingFee.valid) {
        return validBookingFee;
      }
      const validparkingFee = validateFee(parkingFee);
      if (!validparkingFee.valid) {
        return validparkingFee;
      }

      return {
        valid: true,
        message: "",
        data: {
          id: validID.data,
          name: validName.data,
          slotBookingFee: validBookingFee.data,
          parkingFee: validparkingFee.data,
        } as VehicleTypeData,
      };
    };

    const handleCreateType = async (token: string, record: VehicleTypeData) => {
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
          const res = await createVehicleType(newToken, record);
          if (res.status === 201) {
            toast.success("New vehicle type is created successfully.");
            handleCloseModal();
            onAddData(record);
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

    const handleUpdateType = async (token: string, record: VehicleTypeData) => {
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
          const res = await updateVehicleType(newToken, record);
          if (res.status === 200) {
            toast.success("Vehicle type is updated successfully.");
            handleCloseModal();
            onUpdateData(record);
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

    const handleFormAction = async (formData: FormData) => {
      try {
        setErrorMessage("");

        const id = formData.get("id") as string; // 3 characters
        const name = formData.get("name") as string;
        const bookingFee = Number(formData.get("slotBookingFee"));
        const parkingFee = Number(formData.get("parkingFee"));

        let result = handleValidateFormData(id, name, bookingFee, parkingFee);
        if (!result.valid) {
          setErrorMessage(result.message);
          return;
        }

        const record: VehicleTypeData = {
          id: (result.data as VehicleTypeData).id,
          name: (result.data as VehicleTypeData).name,
          parkingFee: (result.data as VehicleTypeData).parkingFee,
          slotBookingFee: (result.data as VehicleTypeData).slotBookingFee,
        };

        if (!existData) {
          // add new record
          await handleCreateType(token, record);
        } else {
          // update record
          await handleUpdateType(token, record);
        }
      } catch (error) {
        toast.error("Server error!");
      }
    };

    useEffect(() => {
      if (existData !== null) {
        setFormData(existData);
        setIsUpdate(true);
      }
    }, [existData]);

    return (
      <DialogContainer ref={refModal}>
        <form
          action={handleFormAction}
          className="w-full h-full flex-col justify-center gap-2.5 flex"
        >
          <InputComponent
            name="id"
            type="text"
            value={formData.id}
            label="Type id"
            onChangeFunction={handleFormChange}
          />
          <InputComponent
            name="name"
            type="text"
            value={formData.name}
            label="Type name"
            onChangeFunction={handleFormChange}
          />
          <InputComponent
            name="slotBookingFee"
            type="number"
            value={String(formData.slotBookingFee)}
            label="Booking fee ($)"
            onChangeFunction={handleFormChange}
          />
          <InputComponent
            name="parkingFee"
            type="number"
            value={String(formData.parkingFee)}
            label="Parking fee / day ($)"
            onChangeFunction={handleFormChange}
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
              name={isUpdate ? "Update" : "Add"}
              className="w-full text-sm px-2.5 py-2"
              type="submit"
            />
          </div>
        </form>
      </DialogContainer>
    );
  }
);

AddVehicleTypeForm.displayName = "AddVehicleTypeForm";

export default function ManagerVehicleType() {
  const { refreshToken, token } = useToken();

  const [updateData, setUpdateData] = useState<VehicleTypeData | null>(null);
  const [dataStorage, setDataStorage] = useState<VehicleTypeData[] | null>(
    null
  );
  const [data, setData] = useState<VehicleTypeData[]>([]);

  const [prevKeySearch, setPrevKeySearch] = useState("");
  const [isReset, setIsReset] = useState<boolean>(true);
  const refSearchBar = useRef<HTMLFormElement>(null);
  const refModal = useRef<HTMLDialogElement>(null);

  const {
    currentPage,
    currentRecords,
    recordsPerPage,
    handleChangePage,
    handleDecreasePage,
  } = usePagination<VehicleTypeData>({ data: data, pageSize: 7 });

  const toggleModal = () => {
    if (!refModal?.current) return;
    refModal.current.hasAttribute("open")
      ? refModal.current.close()
      : refModal.current.showModal();
  };

  const handleUpdateData = (data: VehicleTypeData | null) => {
    setUpdateData(data);
  };

  const handleSearch = (formData: FormData) => {
    if (!dataStorage) return;
    const keyword: string = formData.get("key-search") as string;
    const newKeyword = validateKeyword(keyword);
    if (prevKeySearch !== newKeyword) {
      if (newKeyword) {
        setData(
          dataStorage.filter((item) => {
            return (
              item.id.toLowerCase().includes(newKeyword) ||
              item.name.toLowerCase().includes(newKeyword)
            );
          })
        );
      } else {
        setData(dataStorage);
      }
      setIsReset(!newKeyword);
      setPrevKeySearch(newKeyword);
    }
  };

  const handleResetState = (val: boolean) => {
    setIsReset(val);
  };

  const handleResetSearch = () => {
    refSearchBar.current?.reset();
    setIsReset(true);
  };

  const handleAfterAdding = (data: VehicleTypeData) => {
    handleResetSearch();
    const dataTmp = dataStorage ? [...dataStorage, data] : [data];
    setDataStorage(dataTmp);
    setData(dataTmp);
  };

  const handleAfterUpdating = (data: VehicleTypeData) => {
    handleResetSearch();
    const dataTmp = dataStorage
      ? [...dataStorage.filter((item) => item.id !== data.id), data]
      : [data];
    setDataStorage(dataTmp);
    setData(dataTmp);
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      const newID = validateVehicleTypeID(id);
      if (!newID.valid) {
        toast.error("Vehicle type ID is not in the right format.");
        return;
      }

      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await deleteVehicleType(newToken, newID.data);
        if (res.status === 200) {
          const dataTmp = dataStorage ? [...dataStorage] : [];
          const deletedData = dataTmp.filter((item) => item.id !== newID.data);
          setDataStorage(deletedData);
          setData(deletedData);
          handleResetSearch();
          toast.success("Vehicle type is deleted!");
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

  const handleGetData = async () => {
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
        const res = await getVehicleTypes(newToken);
        if (res.status === 200) {
          setDataStorage(sortVehicleTypesById(res.data));
          setData(sortVehicleTypesById(res.data));
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
    handleGetData();
  }, []);

  return (
    <>
      <BreadcrumbsComponent dir={["Vehicle type management"]} />
      <PageContentContainer>
        <ActionTopContainer>
          <form
            ref={refSearchBar}
            action={handleSearch}
            className="w-1/2 justify-center items-center gap-4 flex text-sm"
          >
            <SearchBar
              reset={isReset}
              handleReset={handleResetState}
              onReset={handleResetSearch}
              placeholder={"Find by service id or name..."}
            />
          </form>
          <Button
            name="Add new vehicle type"
            className="p-2.5 px-3 leading-4 text-sm"
            onClickFunction={() => {
              setUpdateData(null);
              toggleModal();
            }}
          />
        </ActionTopContainer>
        <DataBottomContainer>
          {dataStorage ? (
            <TableResults
              data={currentRecords}
              onEdit={toggleModal}
              onSetupEditData={handleUpdateData}
              onDeleteRecord={handleDeleteRecord}
              onDecreasePage={handleDecreasePage}
            />
          ) : (
            <ResultsTableSkeleton />
          )}
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
      </PageContentContainer>
      <AddVehicleTypeForm
        ref={refModal}
        onAddData={handleAfterAdding}
        onUpdateData={handleAfterUpdating}
        onToggleModal={toggleModal}
        existData={updateData}
        onExistData={handleUpdateData}
      />
    </>
  );
}
