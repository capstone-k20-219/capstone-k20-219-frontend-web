"use client";

import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { forwardRef, useEffect, useRef, useState } from "react";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { FormStateType, OptionType, ServiceData } from "@/lib/type";
import { useFormState } from "react-dom";
import {
  getServiceList,
  getVehicleTypeNames,
  validateKeySearch,
} from "@/lib/actions";
import NoDataFound from "@/components/NoDataFound";
import InputComponent from "@/components/InputComponent";
import ButtonWhite from "@/components/ButtonWhite";
import SelectOptionComponent from "@/components/SelectOptionComponent";
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

interface ServiceColumn {
  id: "id" | "name" | "price" | "typ" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: number) => string;
  paddingLeft?: string;
}

const columns: readonly ServiceColumn[] = [
  {
    id: "id",
    label: "Service ID",
    minWidth: 100,
    align: "left",
    paddingLeft: "20px",
  },
  {
    id: "name",
    label: "Service name",
    minWidth: 130,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "price",
    label: "Service price",
    minWidth: 130,
    align: "left",
    format: (value: number) => `$${value}.00`,
    paddingLeft: "12px",
  },
  {
    id: "typ",
    label: "Service type",
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
  data: ServiceData[] | null;
  onEdit: () => void;
  onSetupEditData: (data: ServiceData | null) => void;
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

const initialServiceData: ServiceData = {
  id: "",
  name: "",
  price: 0,
  typ: "",
};

const initialFormState: FormStateType = {
  error: null,
  success: false,
  data: null,
};

type AddServiceFormProps = {
  existData: ServiceData | null;
  onToggleModal: () => void;
  onExistData: (data: ServiceData | null) => void;
  onChangeData: (id: string, data: ServiceData) => void;
};

const AddServiceForm = forwardRef<HTMLDialogElement, AddServiceFormProps>(
  ({ existData, onExistData, onToggleModal, onChangeData }, refModal) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [options, setOptions] = useState<OptionType[]>([]);
    const [formData, setFormData] = useState<ServiceData>(initialServiceData);
    // const [formState, formAction] = useFormState(updateService, initialFormState);

    const handleFormChange = (e: any) => {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    };

    const handleCloseModal = () => {
      setFormData(initialServiceData);
      onExistData(null);
      onToggleModal();
      setIsUpdate(false);
    };

    // mock action
    const handleFormAction = (formData: FormData) => {
      const id = formData.get("id") as string;
      const name = formData.get("name") as string;
      const price = Number(formData.get("price"));
      const typ = formData.get("typ") as string;

      if (id === "") {
        // add new record
        const record: ServiceData = {
          id: String(Math.round(Math.random() * 1000)),
          name: name,
          price: price,
          typ: typ,
        };
        onChangeData(id, record);
      } else {
        // update record
        const record: ServiceData = {
          id: id,
          name: name,
          price: price,
          typ: typ,
        };
        onChangeData(id, record);
      }
      handleCloseModal();
    };

    const getVehicleTypeOptions = async () => {
      const res = await getVehicleTypeNames();
      if (res !== null)
        setOptions(res.map((item) => ({ value: item, name: item })));
    };

    useEffect(() => {
      getVehicleTypeOptions();
    }, []);

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
            label="Service name"
            onChangeFunction={handleFormChange}
            required={true}
          />

          <InputComponent
            name="price"
            type="number"
            value={String(formData.price)}
            label="Service price ($)"
            onChangeFunction={handleFormChange}
          />
          <SelectOptionComponent
            label="Vehicle type"
            value={formData.typ}
            name="typ"
            onChangeFunction={handleFormChange}
            options={options}
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
  }
);

export default function ManagerService() {
  const [updateData, setUpdateData] = useState<ServiceData | null>(null);
  const [data, setData] = useState<ServiceData[] | null>([]);
  const [formState, formAction] = useFormState(validateKeySearch, ""); // search action
  const [isResetSearch, setIsResetSearch] = useState<boolean>(true);
  const refSearchBar = useRef<HTMLFormElement>(null);
  const refModal = useRef<HTMLDialogElement>(null);
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

  const toggleModal = () => {
    if (!refModal?.current) return;
    refModal.current.hasAttribute("open")
      ? refModal.current.close()
      : refModal.current.showModal();
  };

  const handleUpdateData = (data: ServiceData | null) => {
    setUpdateData(data);
  };

  const handleData = (id: string, record: ServiceData) => {
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
          return item.id !== id;
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
      const newData = prev.filter((item) => item.id !== id);
      return newData;
    });
  };

  useEffect(() => {
    const fetchServiceList = async () => {
      const res = await getServiceList(formState);
      if (res !== null) setData(res);
    };
    fetchServiceList();
  }, [formState]);

  return (
    <>
      <BreadcrumbsComponent dir={["Service management"]} />
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
            name="Add new service"
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
      <AddServiceForm
        ref={refModal}
        onToggleModal={toggleModal}
        existData={updateData}
        onExistData={handleUpdateData}
        onChangeData={handleData} // temporary strategy
      />
    </>
  );
}
