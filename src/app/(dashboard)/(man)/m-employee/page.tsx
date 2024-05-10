"use client";

import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { forwardRef, useEffect, useRef, useState } from "react";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import {
  UserDBGetType,
  UserDBPostType,
  UserPersonalInfoType,
} from "@/lib/type";
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
import { useAppSelector } from "@/redux/store";
import { MdDelete } from "react-icons/md";
import {
  createNewEmployee,
  deleteEmployeeById,
  getEmployeeList,
} from "@/lib/services/users";
import toast from "react-hot-toast";
import {
  eliminateSpecialChars,
  formatInputDateString,
  formatValueDateString,
  sortEmployeeById,
  statusAction,
  validateDob,
  validateEmail,
  validateKeyword,
  validateName,
  validatePassword,
  validatePhone,
} from "@/lib/helpers";
import useToken from "@/lib/hooks/refresh-token";
import { ResultsTableSkeleton } from "@/components/Skeleton";
import usePagination from "@/lib/hooks/pagination";

interface EmployeeColumn {
  id: "id" | "name" | "phone" | "email" | "dob" | "action";
  label: string;
  minWidth?: number;
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
  format?: (value: string) => string;
  paddingLeft?: string;
  paddingRight?: string;
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
    minWidth: 80,
    align: "right",
    paddingRight: "20px",
  },
];

type TableResultsProps = {
  data: UserDBGetType[];
  onDeleteRecord: (value: any) => void;
  onDecreasePage: () => void;
};

function TableResults({
  data,
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
                      style={{ paddingRight: column.paddingRight }}
                      className=""
                    >
                      <Button
                        icon={<MdDelete style={{ width: 16, height: 16 }} />}
                        className="button-action"
                        onClickFunction={() => {
                          onDeleteRecord(row.id);
                        }}
                      />
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
  onToggleModal: () => void;
  onReset: () => void;
};

const initialEmployeeData: UserPersonalInfoType = {
  email: "",
  password: "",
  name: "",
  dob: "",
  phone: "",
  image: "",
};

const AddEmployeeForm = forwardRef<HTMLDialogElement, AddEmployeeFormProps>(
  ({ onToggleModal, onReset }, refModal) => {
    const { refreshToken, token } = useToken();
    const [formData, setFormData] =
      useState<UserPersonalInfoType>(initialEmployeeData);
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
      setFormData(initialEmployeeData);
      onToggleModal();
    };

    const handleValidateFormData = (
      name: string,
      phone: string,
      email: string,
      dob: string,
      password: string
    ) => {
      const validName = validateName(name);
      if (!validName.valid) {
        return validName;
      }

      const validPhone = validatePhone(phone);
      if (!validPhone.valid) {
        return validPhone;
      }

      const validEmail = validateEmail(email);
      if (!validEmail.valid) {
        return validEmail;
      }

      const validDob = validateDob(dob);
      if (!validDob.valid) {
        return validDob;
      }

      const validPass = validatePassword(password);
      if (!validPass.valid) {
        return validPass;
      }

      return {
        valid: true,
        message: "",
        data: {
          name: validName.data,
          phone: validPhone.data,
          email: validEmail.data,
          dob: validDob.data,
          password: validPass.data,
          image: "",
        } as UserPersonalInfoType,
      };
    };

    const handleFormAction = async (formData: FormData) => {
      try {
        setErrorMessage("");

        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const dob = formData.get("dob") as string;
        const password = formData.get("password") as string;
        // const role = formData.get("role") as RoleType;

        const validData = handleValidateFormData(
          name,
          phone,
          email,
          dob,
          password
        );

        if (!validData.valid) {
          setErrorMessage(validData.message);
          return;
        }

        const newData: UserPersonalInfoType =
          validData.data as UserPersonalInfoType;
        // add new record
        const record: UserDBPostType = {
          name: newData.name,
          phone: newData.phone,
          email: newData.email,
          dob: newData.dob + "T08:00:00Z",
          password: newData.password,
          image: "",
          bankAccount: [],
          role: ["employee", "user"],
        };

        let isUnauthorized = false;
        let newToken = token;
        do {
          if (isUnauthorized) {
            const isRefreshed = await refreshToken();
            if (!isRefreshed.valid) return;
            newToken = isRefreshed.access_token;
            isUnauthorized = false;
          }
          const res = await createNewEmployee(newToken, record);
          if (res.status === 201) {
            toast.success("New employee is created successfully.");
            handleCloseModal();
            onReset();
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

    return (
      <DialogContainer ref={refModal}>
        <form
          action={handleFormAction}
          className="w-full h-full flex-col justify-center gap-2.5 flex"
        >
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
          <InputComponent
            name="password"
            type="password"
            value={formData.password}
            onChangeFunction={handleFormChange}
            label="Password"
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
              name="Add"
              className="w-full text-sm px-2.5 py-2"
              type="submit"
            />
          </div>
        </form>
      </DialogContainer>
    );
  }
);

AddEmployeeForm.displayName = "AddEmployeeForm";

export default function ManagerEmployee() {
  const { refreshToken, token } = useToken();

  const [dataStorage, setDataStorage] = useState<UserDBGetType[] | null>(null);
  const [data, setData] = useState<UserDBGetType[]>([]);

  const [prevKeySearch, setPrevKeySearch] = useState("");
  const [isSearch, setIsSearch] = useState<boolean>(true);
  const [isReset, setIsReset] = useState<boolean>(true);

  const refSearchBar = useRef<HTMLFormElement>(null);
  const refModal = useRef<HTMLDialogElement>(null);

  const {
    currentPage,
    currentRecords,
    recordsPerPage,
    handleChangePage,
    handleDecreasePage,
  } = usePagination<UserDBGetType>({ data: data, pageSize: 7 });

  const toggleModal = () => {
    if (!refModal?.current) return;
    refModal.current.hasAttribute("open")
      ? refModal.current.close()
      : refModal.current.showModal();
  };

  const handleSearch = async (formData: FormData) => {
    if (!dataStorage) return;
    const keyword: string = formData.get("key-search") as string;
    const newKeyword = validateKeyword(keyword);
    if (prevKeySearch !== newKeyword) {
      if (newKeyword) {
        setData(
          dataStorage.filter((item) => {
            return (
              item.id.toLowerCase().includes(newKeyword) ||
              item.name.toLowerCase().includes(newKeyword) ||
              item.email.toLowerCase().includes(newKeyword) ||
              item.phone.includes(newKeyword) ||
              item.dob.slice(0, 10).includes(newKeyword)
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
    setIsSearch(true);
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      const newID = eliminateSpecialChars(id);
      if (!newID) {
        toast.error("Cannot delete service with id empty.");
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
        const res = await deleteEmployeeById(newToken, newID);
        if (res.status === 200) {
          const data = dataStorage ? [...dataStorage] : [];
          const deletedData = data.filter((item) => item.id !== newID);
          setDataStorage(deletedData);
          setData(deletedData);
          handleResetSearch();
          toast.success("Employee is deleted!");
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
        const res = await getEmployeeList(newToken);
        if (res.status === 200) {
          const newData: UserDBGetType[] = res.data as UserDBGetType[];
          const sortedData = sortEmployeeById(newData);
          setDataStorage(sortedData);
          setData(sortedData);
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
    if (isSearch) {
      handleGetData();
      setIsSearch(false);
    }
  }, [isSearch]);

  return (
    <>
      <BreadcrumbsComponent dir={["Employee management"]} />
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
              placeholder={"Enter keyword..."}
            />
          </form>
          <Button
            name="Add new account"
            className="p-2.5 px-3 leading-4 text-sm"
            onClickFunction={toggleModal}
          />
        </ActionTopContainer>
        <DataBottomContainer>
          {dataStorage ? (
            <TableResults
              data={currentRecords}
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
      <AddEmployeeForm
        ref={refModal}
        onToggleModal={toggleModal}
        onReset={handleAfterAdding}
      />
    </>
  );
}
