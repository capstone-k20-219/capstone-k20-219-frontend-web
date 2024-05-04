"use client";

import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { RefObject, forwardRef, useEffect, useRef, useState } from "react";
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
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  sortVehicleTypesById,
  validateFee,
  validateKeyword,
  validateName,
  validateVehicleTypeID,
} from "@/lib/helpers";

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
    format: (value: number) => `$${value}.00`,
    paddingLeft: "12px",
  },
  {
    id: "parkingFee",
    label: "Parking fee / hour",
    minWidth: 130,
    align: "left",
    format: (value: number) => `$${value}.00`,
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
  data: VehicleTypeData[] | null;
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
  refSearchBar: RefObject<HTMLFormElement>;
  onReset: () => void;
};

const AddVehicleTypeForm = forwardRef<
  HTMLDialogElement,
  AddVehicleTypeFormProps
>(
  (
    { existData, onToggleModal, onExistData, refSearchBar, onReset },
    refModal
  ) => {
    const { token } = useAppSelector((state) => state.auth.value);
    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setFormData] = useState<VehicleTypeData>(
      initialVehicleTypeData
    );
    const router = useRouter();
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

        let res;
        if (!existData) {
          // add new record
          res = await createVehicleType(token, record);
        } else {
          // update record
          res = await updateVehicleType(token, record);
        }

        if (res.status === 201 || res.status === 200) {
          handleCloseModal();
          onReset();
        } else if (res.status === 500) {
          throw new Error("");
        } else if (res.data === 401) {
          // refresh token
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

export default function ManagerVehicleType() {
  const { token } = useAppSelector((state) => state.auth.value);
  const [updateData, setUpdateData] = useState<VehicleTypeData | null>(null);
  const [dataStorage, setDataStorage] = useState<VehicleTypeData[] | null>([]);
  const [data, setData] = useState<VehicleTypeData[] | null>([]);
  const [prevKeySearch, setPrevKeySearch] = useState("");
  const [keySearch, setKeySearch] = useState("");
  const [isSearch, setIsSearch] = useState<boolean>(true);
  const [isReset, setIsReset] = useState<boolean>(false);
  const refSearchBar = useRef<HTMLFormElement>(null);
  const refModal = useRef<HTMLDialogElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 7;
  const indexOfLastRecord: number = currentPage * recordsPerPage;
  const indexOfFirstRecord: number = indexOfLastRecord - recordsPerPage;

  const currentRecords =
    data !== null ? data.slice(indexOfFirstRecord, indexOfLastRecord) : null;

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
      setKeySearch(newKeyword);
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

  const handleAfterAdding = () => {
    handleResetSearch();
    setKeySearch("");
    setIsSearch(true);
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      const newID = validateVehicleTypeID(id);
      if (!newID.valid) {
        toast.error("Vehicle type ID is not in the right format.");
        return;
      }

      const res = await deleteVehicleType(token, newID.data);

      if (res.status === 200) {
        handleAfterAdding();
      } else if (res.status === 500) {
        throw new Error("");
      } else if (res.data === 401) {
        // refresh token
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  const handleGetData = async (keyword: string) => {
    try {
      const res = await getVehicleTypes(token, keyword);
      if (res.status === 401) {
        // refresh token
      } else if (res.status === 500) {
        throw new Error("");
      } else {
        setDataStorage(sortVehicleTypesById(res.data));
        setData(sortVehicleTypesById(res.data));
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  useEffect(() => {
    if (isSearch) {
      handleGetData(keySearch);
      setIsSearch(false);
      setIsReset(!keySearch);
      setPrevKeySearch(keySearch);
    }
  }, [isSearch]);

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
          <TableResults
            data={currentRecords}
            onEdit={toggleModal}
            onSetupEditData={handleUpdateData}
            onDeleteRecord={handleDeleteRecord}
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
      <AddVehicleTypeForm
        ref={refModal}
        refSearchBar={refSearchBar}
        onReset={handleAfterAdding}
        onToggleModal={toggleModal}
        existData={updateData}
        onExistData={handleUpdateData}
      />
    </>
  );
}
