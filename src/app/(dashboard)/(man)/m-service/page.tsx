"use client";

import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { forwardRef, useEffect, useRef, useState } from "react";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import {
  OptionType,
  ServiceDBGetType,
  ServiceDBPostType,
  ServiceDBPutType,
  ServicePrices,
  VehicleTypeData,
} from "@/lib/type";
import NoDataFound from "@/components/NoDataFound";
import InputComponent from "@/components/InputComponent";
import ButtonWhite from "@/components/ButtonWhite";
import SelectOptionComponent from "@/components/SelectOptionComponent";
import {
  DialogContainer,
  PageContentContainer,
  ActionTopContainer,
  DataBottomContainer,
} from "@/components/ContainerUI";
import { Stack, Pagination } from "@mui/material";
import { useAppSelector } from "@/redux/store";
import {
  createService,
  deleteServiceById,
  getAllServices,
  updateService,
} from "@/lib/services/services";
import toast from "react-hot-toast";
import {
  eliminateSpecialChars,
  sortServiceById,
  statusAction,
  validateKeyword,
  validateName,
  validatePricesOfService,
} from "@/lib/helpers";
import { MdDelete } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { getVehicleTypes } from "@/lib/services/vehicle-types";
import useToken from "@/lib/hooks/refresh-token";
import { ResultsServiceSkeleton } from "@/components/Skeleton";

type ServiceComponentProps = {
  data: ServiceDBGetType;
  onEdit: () => void;
  onSetupEditData: (data: ServiceDBGetType | null) => void;
  onDeleteRecord: (value: any) => void;
};

function CustomTHead({ children }: { children: string }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "10px 20px",
      }}
    >
      {children}
    </th>
  );
}

function CustomTData({ children }: { children: string }) {
  return (
    <td
      style={{
        textAlign: "left",
        padding: "10px 20px",
      }}
    >
      {children}
    </td>
  );
}

function ServiceComponent({
  data,
  onEdit,
  onSetupEditData,
  onDeleteRecord,
}: ServiceComponentProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full shadow">
      <div
        className="w-full bg-gray-300 py-2 px-4 font-bold text-lg rounded
      flex justify-between items-center"
      >
        <div className="w-full cursor-pointer" onClick={() => setOpen(!open)}>
          {data.id} _ {data.name}
        </div>
        <div className="flex gap-3 font-normal">
          <Button
            name="Update"
            className="button-action"
            onClickFunction={() => {
              onSetupEditData(data);
              onEdit();
            }}
          />
          <Button
            name="Delete"
            className="button-action"
            onClickFunction={() => {
              onDeleteRecord(data.id);
            }}
          />
        </div>
      </div>
      <div
        className={`rounded ${open ? "max-h-fit" : "max-h-0 overflow-hidden"}`}
      >
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <CustomTHead>Vehicle type ID</CustomTHead>
              <CustomTHead>Type name</CustomTHead>
              <CustomTHead>Price</CustomTHead>
            </tr>
          </thead>
          <tbody>
            {data.prices.map((price, index) => {
              return (
                <tr key={index}>
                  <CustomTData>{price.type.id}</CustomTData>
                  <CustomTData>{price.type.name}</CustomTData>
                  <CustomTData>{`$${price.unitPrice}.00`}</CustomTData>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type TableResultsProps = {
  data: ServiceDBGetType[];
  onEdit: () => void;
  onSetupEditData: (data: ServiceDBGetType | null) => void;
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
        <div className="flex flex-col gap-3 mt-4 overflow-auto h-full pb-5">
          {data.map((service, index) => (
            <ServiceComponent
              data={service}
              onEdit={onEdit}
              onSetupEditData={onSetupEditData}
              onDeleteRecord={onDeleteRecord}
              key={Math.floor(Math.random() * 1000) + "" + service.id + index}
            />
          ))}
        </div>
      ) : (
        <NoDataFound>There is no data in the system!</NoDataFound>
      )}
    </>
  );
}

type ServiceInfo = {
  [key: string]: any;
  id: string;
  name: string;
};

type AddServiceFormProps = {
  existData: ServiceDBGetType | null;
  onToggleModal: () => void;
  optionTypes: OptionType[];
  onExistData: (data: ServiceDBGetType | null) => void;
  onReset: () => void;
};

const AddServiceForm = forwardRef<HTMLDialogElement, AddServiceFormProps>(
  (
    { existData, onToggleModal, optionTypes, onExistData, onReset },
    refModal
  ) => {
    const { refreshToken, token } = useToken();
    const initialServiceInfo: ServiceInfo = {
      id: "",
      name: "",
    };
    const [isUpdate, setIsUpdate] = useState(false);
    const [info, setInfo] = useState<ServiceInfo>(initialServiceInfo);
    const [prices, setPrices] = useState<ServicePrices[]>([
      {
        typeId: optionTypes.length ? optionTypes[0].value : "",
        unitPrice: 0,
      },
    ]);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePricesChange = (index: number, e: any) => {
      let data = [...prices];
      data[index][e.target.name] = e.target.value;
      setPrices(data);
    };

    const handleAddNewField = () => {
      setPrices((prev) => [
        ...prev,
        {
          typeId: optionTypes.length ? optionTypes[0].value : "",
          unitPrice: 0,
        },
      ]);
    };

    const handleInfoChange = (newName: string) => {
      setInfo((prev) => ({
        ...prev,
        name: newName,
      }));
    };

    const handleDeletePrice = (index: number) => {
      if (index < 0 && index >= prices.length) return;
      let data = [...prices];
      data.splice(index, 1);
      setPrices(data);
    };

    const handleCloseModal = () => {
      setPrices([
        {
          typeId: optionTypes.length ? optionTypes[0].value : "",
          unitPrice: 0,
        },
      ]);
      setInfo(initialServiceInfo);
      onExistData(null);
      onToggleModal();
      setIsUpdate(false);
      setErrorMessage("");
    };

    const handleValidateFormData = (
      id: string,
      name: string,
      prices: ServicePrices[]
    ) => {
      const newId = eliminateSpecialChars(id);

      const validName = validateName(name);
      if (!validName.valid) {
        return validName;
      }

      const validPrices = validatePricesOfService(prices);
      if (!validPrices.valid) {
        return validPrices;
      }

      return {
        valid: true,
        message: "",
        data: {
          id: newId,
          name: validName.data,
          prices: validPrices.data,
        } as ServiceDBPutType,
      };
    };

    const handleCreateService = async (
      token: string,
      record: ServiceDBPostType
    ) => {
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
          const res = await createService(newToken, record);
          if (res.status === 201) {
            toast.success("New service is created successfully.");
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

    const handleUpdateService = async (
      token: string,
      record: ServiceDBPutType
    ) => {
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
          const res = await updateService(newToken, record);
          if (res.status === 200) {
            toast.success("Service is updated successfully.");
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

    const handleFormAction = async (formData: FormData) => {
      try {
        setErrorMessage("");

        const id = formData.get("id") as string;
        const name = formData.get("name") as string;

        const validData = handleValidateFormData(id, name, prices);
        if (!validData.valid) {
          setErrorMessage(validData.message);
          return;
        }

        const data: ServiceDBPutType = validData.data as ServiceDBPutType;
        if (data.id === "") {
          // add new record
          const record: ServiceDBPostType = {
            name: data.name,
            prices: data.prices,
          };
          await handleCreateService(token, record);
        } else {
          // update record
          await handleUpdateService(token, data);
        }
      } catch (error) {
        toast.error("Server error!");
      }
    };

    useEffect(() => {
      if (existData) {
        setInfo({
          id: existData.id,
          name: existData.name,
        });
        setPrices(
          existData.prices.map((item) => ({
            typeId: item.type.id,
            unitPrice: item.unitPrice,
          }))
        );
        setIsUpdate(true);
      }
    }, [existData]);

    return (
      <DialogContainer ref={refModal}>
        <form
          action={handleFormAction}
          className="w-full h-full flex-col justify-center gap-2.5 flex"
        >
          <input type="hidden" value={info.id} name="id" />
          <InputComponent
            name="name"
            type="text"
            value={info.name}
            label="Service name"
            onChangeFunction={(e) => handleInfoChange(e.target.value)}
          />
          {prices.map((_, index) => (
            <div
              key={Math.floor(Math.random() * 100) + "" + index}
              className="flex gap-2.5 items-center"
            >
              <SelectOptionComponent
                name="typeId"
                value={prices[index].typeId}
                label={`Vehicle type ${index + 1}`}
                onChangeFunction={(e) => handlePricesChange(index, e)}
                options={optionTypes}
              />
              <InputComponent
                name="unitPrice"
                type="number"
                value={String(prices[index].unitPrice)}
                label="Service price ($)"
                onChangeFunction={(e) => handlePricesChange(index, e)}
              />
              {prices.length > 1 && (
                <div className="self-end">
                  <Button
                    icon={<MdDelete />}
                    className="w-full text-sm p-2.5"
                    type="button"
                    onClickFunction={() => handleDeletePrice(index)}
                  />
                </div>
              )}
            </div>
          ))}

          <ButtonWhite
            icon={<CiCirclePlus style={{ width: 20, height: 20 }} />}
            className="w-full text-sm px-2.5 py-2 border-dashed"
            onClickFunction={handleAddNewField}
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

export default function ManagerService() {
  const { refreshToken, token } = useToken();

  const [optionTypes, setOptionTypes] = useState<OptionType[] | null>(null);
  const [updateData, setUpdateData] = useState<ServiceDBGetType | null>(null);

  const [dataStorage, setDataStorage] = useState<ServiceDBGetType[] | null>(
    null
  );
  const [data, setData] = useState<ServiceDBGetType[]>([]);

  const [prevKeySearch, setPrevKeySearch] = useState("");
  const [isSearch, setIsSearch] = useState<boolean>(true);
  const [isReset, setIsReset] = useState<boolean>(true);
  const refSearchBar = useRef<HTMLFormElement>(null);
  const refModal = useRef<HTMLDialogElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

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

  const handleUpdateData = (data: ServiceDBGetType | null) => {
    setUpdateData(data);
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
        const res = await deleteServiceById(newToken, newID);
        if (res.status === 200) {
          const dataTmp = dataStorage ? [...dataStorage] : [];
          const deletedData = dataTmp.filter((item) => item.id !== newID);
          setDataStorage(deletedData);
          setData(deletedData);
          handleResetSearch();
          toast.success("Service is deleted!");
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

  const handleGetVehicleTypeOptions = async () => {
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
          const optionData: VehicleTypeData[] = res.data;
          setOptionTypes(
            optionData.map((item) => ({
              value: item.id,
              name: item.name,
            }))
          );
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
        const res = await getAllServices(newToken);
        if (res.status === 200) {
          const newData: ServiceDBGetType[] = res.data as ServiceDBGetType[];
          const sortedData = sortServiceById(newData);
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
    handleGetVehicleTypeOptions();
  }, []);

  useEffect(() => {
    if (isSearch) {
      handleGetData();
      setIsSearch(false);
    }
  }, [isSearch]);

  return (
    <>
      <BreadcrumbsComponent dir={["Service management"]} />
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
              placeholder={"Enter service Id or vehicle type ..."}
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
        <DataBottomContainer className="overflow-hidden">
          {dataStorage ? (
            <TableResults
              data={currentRecords}
              onEdit={toggleModal}
              onSetupEditData={handleUpdateData}
              onDeleteRecord={handleDeleteRecord}
              onDecreasePage={handleDecreasePage}
            />
          ) : (
            <ResultsServiceSkeleton />
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
      {optionTypes && (
        <AddServiceForm
          ref={refModal}
          onReset={handleAfterAdding}
          onToggleModal={toggleModal}
          existData={updateData}
          optionTypes={optionTypes}
          onExistData={handleUpdateData}
        />
      )}
    </>
  );
}
