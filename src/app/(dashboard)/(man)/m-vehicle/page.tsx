"use client";

import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { forwardRef, useEffect, useRef, useState } from "react";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { VehicleTypeData } from "@/lib/type";
import { getVehicleTypeList, validateKeySearch } from "@/lib/actions";
import { useFormState } from "react-dom";
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

interface VehicleTypeColumn {
  id: "id" | "name" | "bookingFee" | "parkingFee" | "action";
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
    id: "bookingFee",
    label: "Booking fee",
    minWidth: 170,
    align: "left",
    format: (value: number) => `$${value}.00`,
    paddingLeft: "12px",
  },
  {
    id: "parkingFee",
    label: "Parking fee / day",
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
};

function TableResults({
  data,
  onEdit,
  onSetupEditData,
  onDeleteRecord,
}: TableResultsProps) {
  return (
    <>
      {data ? (
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
  id: 0,
  name: "",
  bookingFee: 0,
  parkingFee: 0,
};

type AddVehicleTypeFormProps = {
  existData: VehicleTypeData | null;
  onToggleModal: () => void;
  onExistData: (data: VehicleTypeData | null) => void;
  onChangeData: (id: string, data: VehicleTypeData) => void;
};

const AddVehicleTypeForm = forwardRef<
  HTMLDialogElement,
  AddVehicleTypeFormProps
>(({ existData, onToggleModal, onExistData, onChangeData }, refModal) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState<VehicleTypeData>(
    initialVehicleTypeData
  );

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

  // mock action
  const handleFormAction = (formData: FormData) => {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const bookingFee = Number(formData.get("bookingFee"));
    const parkingFee = Number(formData.get("parkingFee"));

    if (id === "") {
      // add new record
      const record: VehicleTypeData = {
        id: Math.round(Math.random() * 1000),
        name: name,
        bookingFee: bookingFee,
        parkingFee: parkingFee,
      };
      onChangeData(id, record);
    } else {
      // update record
      const record: VehicleTypeData = {
        id: Number(id),
        name: name,
        bookingFee: bookingFee,
        parkingFee: parkingFee,
      };
      onChangeData(id, record);
    }
    handleCloseModal();
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
        <input type="hidden" value={formData.id} name="id" />
        <InputComponent
          name="name"
          type="text"
          value={formData.name}
          label="Type name"
          required={true}
          onChangeFunction={handleFormChange}
        />
        <InputComponent
          name="bookingFee"
          type="number"
          value={String(formData.bookingFee)}
          label="Booking fee ($)"
          onChangeFunction={handleFormChange}
        />
        <InputComponent
          name="parkingFee"
          type="number"
          value={String(formData.parkingFee)}
          onChangeFunction={handleFormChange}
          label="Parking fee / day ($)"
        />
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
});

export default function ManagerVehicleType() {
  const [updateData, setUpdateData] = useState<VehicleTypeData | null>(null);
  const [data, setData] = useState<VehicleTypeData[] | null>([]);
  const [formState, formAction] = useFormState(validateKeySearch, ""); // search action
  const [isResetSearch, setIsResetSearch] = useState<boolean>(true);
  const refSearchBar = useRef<HTMLFormElement>(null);
  const refModal = useRef<HTMLDialogElement>(null);

  const toggleModal = () => {
    if (!refModal?.current) return;
    refModal.current.hasAttribute("open")
      ? refModal.current.close()
      : refModal.current.showModal();
  };

  const handleUpdateData = (data: VehicleTypeData | null) => {
    setUpdateData(data);
  };

  const handleData = (id: string, record: VehicleTypeData) => {
    refSearchBar.current?.reset();
    refSearchBar.current?.requestSubmit();
    handleResetState(true);

    if (id === "") {
      setData((prev) => {
        if (prev === null) return prev;
        return [...prev, record];
      });
    } else {
      setData((prev) => {
        if (prev === null) return prev;
        const afterDelete = prev.filter((item) => {
          return item.id !== Number(id);
        });
        return [...afterDelete, record];
      });
    }
  };

  const handleResetState = (val: boolean) => {
    setIsResetSearch(val);
  };

  const handleDeleteRecord = (id: string) => {
    // call some action to delete in DB
    setData((prev) => {
      if (prev === null) return prev;
      const newData = prev.filter((item) => item.id !== Number(id));
      return newData;
    });
  };

  useEffect(() => {
    const fetchVehicleTypeList = async () => {
      const res = await getVehicleTypeList(formState);
      if (res !== null) setData(res);
    };
    fetchVehicleTypeList();
  }, [formState]);

  return (
    <>
      <BreadcrumbsComponent dir={["Vehicle type management"]} />
      <PageContentContainer>
        <ActionTopContainer>
          <form
            ref={refSearchBar}
            action={formAction}
            className="w-1/2 justify-center items-center gap-4 flex text-sm"
          >
            <SearchBar
              refForm={refSearchBar}
              reset={isResetSearch}
              setReset={handleResetState}
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
            data={data}
            onEdit={toggleModal}
            onSetupEditData={handleUpdateData}
            onDeleteRecord={handleDeleteRecord}
          />
        </DataBottomContainer>
      </PageContentContainer>
      <AddVehicleTypeForm
        ref={refModal}
        onToggleModal={toggleModal}
        existData={updateData}
        onExistData={handleUpdateData}
        onChangeData={handleData} // temporary strategy
      />
    </>
  );
}
