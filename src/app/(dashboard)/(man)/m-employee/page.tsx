"use client";

import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { forwardRef, useEffect, useRef, useState } from "react";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { EmployeeData, RoleType } from "@/lib/type";
import {
  formatInputDateString,
  formatValueDateString,
  getEmployeeList,
  validateKeySearch,
} from "@/lib/actions";
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
import { Stack, Pagination } from "@mui/material";

interface EmployeeColumn {
  id: "id" | "name" | "phone" | "email" | "dob" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: string) => string;
  paddingLeft?: string;
}

const columns: readonly EmployeeColumn[] = [
  { id: "id", label: "ID", minWidth: 80, align: "left", paddingLeft: "20px" },
  {
    id: "name",
    label: "Username",
    minWidth: 120,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "phone",
    label: "Phone number",
    minWidth: 100,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "dob",
    label: "Date of birth",
    minWidth: 100,
    align: "left",
    paddingLeft: "12px",
    format: (s: string) => formatValueDateString(s),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "left",
    paddingLeft: "12px",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 150,
    align: "left",
    paddingLeft: "12px",
  },
];

type TableResultsProps = {
  data: EmployeeData[] | null;
  onEdit: () => void;
  onSetupEditData: (data: EmployeeData | null) => void;
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
                  const value = row[column.id] as string;
                  return (
                    <td
                      key={column.id}
                      align={column.align}
                      style={{ paddingLeft: column.paddingLeft }}
                    >
                      {column.format && column.id === "dob"
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

type AddEmployeeFormProps = {
  existData: EmployeeData | null;
  onToggleModal: () => void;
  onExistData: (data: EmployeeData | null) => void;
  onChangeData: (id: string, data: EmployeeData) => void;
};

const initialEmployeeData: EmployeeData = {
  id: "",
  name: "",
  email: "",
  phone: "",
  dob: "",
};

const AddEmployeeForm = forwardRef<HTMLDialogElement, AddEmployeeFormProps>(
  ({ existData, onToggleModal, onExistData, onChangeData }, refModal) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setFormData] = useState<EmployeeData>(initialEmployeeData);

    const handleFormChange = (e: any) => {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    };

    const handleCloseModal = () => {
      setFormData(initialEmployeeData);
      onExistData(null);
      onToggleModal();
      setIsUpdate(false);
    };

    // mock action
    const handleFormAction = (formData: FormData) => {
      const id = formData.get("id") as string;
      const name = formData.get("name") as string;
      const phone = formData.get("phone") as string;
      const email = formData.get("email") as string;
      const dob = formData.get("dob") as string;
      // const role = formData.get("role") as RoleType;

      if (id === "") {
        // add new record
        const record: EmployeeData = {
          id: String(Math.round(Math.random() * 1000)),
          name: name,
          phone: phone,
          email: email,
          dob: dob,
          // role: role,
        };
        onChangeData(id, record);
      } else {
        // update record
        const record: EmployeeData = {
          id: id,
          name: name,
          phone: phone,
          email: email,
          dob: dob,
          // role: role,
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
          {/* select option for role (optional) */}
          <InputComponent
            name="name"
            type="text"
            value={formData.name}
            label="Username"
            onChangeFunction={handleFormChange}
          />
          <InputComponent
            name="phone"
            type="text"
            value={formData.phone}
            label="Phone number"
            onChangeFunction={handleFormChange}
          />
          <InputComponent
            name="email"
            type="email"
            value={formData.email}
            label="Email"
            onChangeFunction={handleFormChange}
          />
          <InputComponent
            name="dob"
            type="date"
            value={formatInputDateString(formData.dob)}
            onChangeFunction={handleFormChange}
            label="Date of birth (mm/dd/yyyy)"
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

export default function ManagerEmployee() {
  const [updateData, setUpdateData] = useState<EmployeeData | null>(null);
  const [data, setData] = useState<EmployeeData[] | null>([]);
  const [formState, formAction] = useFormState(validateKeySearch, ""); // search action
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

  const handleUpdateData = (data: EmployeeData | null) => {
    setUpdateData(data);
  };

  const handleData = (id: string, record: EmployeeData) => {
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

  const handleDeleteRecord = (id: string) => {
    // call some action to delete in DB
    setData((prev) => {
      if (prev === null) return prev;
      const newData = prev.filter((item) => item.id !== id);
      return newData;
    });
  };

  useEffect(() => {
    const fetchEmployeeList = async () => {
      const res = await getEmployeeList(formState);
      if (res !== null) setData(res);
    };
    fetchEmployeeList();
  }, [formState]);

  return (
    <>
      <BreadcrumbsComponent dir={["Employee management"]} />
      <PageContentContainer>
        <ActionTopContainer>
          <form
            ref={refSearchBar}
            action={formAction}
            className="w-1/2 justify-center items-center gap-4 flex text-sm"
          >
            <SearchBar refForm={refSearchBar} />
          </form>
          <Button
            name="Add new account"
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
      <AddEmployeeForm
        ref={refModal}
        onToggleModal={toggleModal}
        existData={updateData}
        onExistData={handleUpdateData}
        onChangeData={handleData} // temporary strategy
      />
    </>
  );
}
