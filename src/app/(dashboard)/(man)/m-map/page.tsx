"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import SmallStatisticsContent from "@/components/SmallStatisticsContent";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { forwardRef, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  DialogContainer,
  PageContentCotainer2,
} from "@/components/ContainerUI";
import { SlotBlock, SlotBlockDBGetType, VehicleTypeData } from "@/lib/type";
import { getVehicleTypes } from "@/lib/services/vehicle-types";
import { MdDelete } from "react-icons/md";
import { MapBackGround } from "@/components/ParkingLotMap";
import { getParkingSlotList, updateDBMap } from "@/lib/services/parking-slots";
import InputComponent from "@/components/InputComponent";
import ButtonWhite from "@/components/ButtonWhite";
import {
  statusAction,
  validateCoordinate,
  validateVehicleTypeID,
} from "@/lib/helpers";
import useToken from "@/lib/hooks/refresh-token";
import { MapPageSkeleton } from "@/components/Skeleton";
import { BLOCK_SIZE, MAP_SIZE } from "@/lib/data";

type EditableSlotProps = {
  slot: SlotBlock;
  editable: boolean;
  typeColor: VehicleProps | null | undefined;
  onDeleteSlot: (id: string) => void;
};

type EditableParkingLotMapProps = {
  editable: boolean;
  slotList: SlotBlock[];
  vehicleList: VehicleProps[];
  onDeleteSlot: (id: string) => void;
  onSetNewSlot: (slot: SlotBlock) => void;
  onOpenModal: () => void;
};

type VehicleProps = {
  id: string;
  name: string;
  color: string;
};

function EditableSlot({
  slot,
  editable,
  typeColor,
  onDeleteSlot,
}: EditableSlotProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const refMenu = useRef<HTMLDivElement | null>(null);

  const handleContextMenu = (e: any) => {
    if (editable) {
      e.preventDefault();
      setOpenMenu(true);
      setMenuPos({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!refMenu?.current?.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refMenu]);

  return (
    <div
      ref={refMenu}
      style={{
        top: slot.y_start,
        left: slot.x_start,
        width: slot.x_end - slot.x_start,
        height: slot.y_end - slot.y_start,
        borderColor: typeColor ? typeColor.color : "#c4c4c4",
      }}
      className="absolute bg-white border shadow-md
          grid place-items-center cursor-pointer text-xs"
      onContextMenu={handleContextMenu}
    >
      <span className="vertical-text">{slot.id}</span>
      {openMenu && (
        <div
          style={{
            top: menuPos.y,
            left: menuPos.x,
          }}
          className="absolute bg-white rounded min-w-[100px] shadow-md p-1 
        border border-neutral-500 z-50"
          onClick={() => {
            onDeleteSlot(slot.id);
            setOpenMenu(false);
          }}
        >
          <div className="text-neutral-900 p-1">
            <div className="font-semibold uppercase">{slot.id}</div>
            {typeColor && (
              <span className="font-light text-[10px]">
                {slot.typeId} - {typeColor.name}
              </span>
            )}
          </div>
          <div
            className="flex gap-1 items-center text-red-500 p-1 
          rounded hover:bg-red-500 hover:text-white"
          >
            <MdDelete style={{ width: 16, height: 16 }} />
            <span>Delete</span>
          </div>
        </div>
      )}
    </div>
  );
}

type SlotInfoModalProps = {
  slot: SlotBlock | null;
  onClose: () => void;
  onResetData: (slot: SlotBlock | null) => void;
  onAddNewSlot: (slot: SlotBlock) => void;
};

const SlotInfoModal = forwardRef<HTMLDialogElement, SlotInfoModalProps>(
  ({ slot, onClose, onResetData, onAddNewSlot }, refModal) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [slotId, setSlotId] = useState("");
    const refForm = useRef<HTMLFormElement>(null);

    const handleCloseModal = () => {
      refForm.current?.reset();
      onResetData(null);
      setErrorMessage("");
      setSlotId("");
      onClose();
    };

    const handleFormAction = (formData: FormData) => {
      const id = formData.get("id") as string;
      // console.log(id);
      if (slot) {
        onAddNewSlot({
          id: id.toUpperCase(),
          typeId: slot.typeId,
          x_start: slot.x_start,
          x_end: slot.x_end,
          y_start: slot.y_start,
          y_end: slot.y_end,
        });
      }
      handleCloseModal();
    };

    return (
      <DialogContainer ref={refModal}>
        {slot && (
          <form
            ref={refForm}
            action={handleFormAction}
            className="w-full h-full flex-col justify-center gap-2.5 flex"
          >
            <InputComponent
              name="id"
              type="text"
              value={slotId}
              label="Slot ID"
              autoFocus
              onChangeFunction={(e) => setSlotId(e.target.value)}
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
  }
);

SlotInfoModal.displayName = "SlotInfoModal";

type Coordinate = {
  x: number;
  y: number;
};

function EditableParkingLotMap({
  editable,
  slotList,
  vehicleList,
  onDeleteSlot,
  onSetNewSlot,
  onOpenModal,
}: EditableParkingLotMapProps) {
  const [currentType, setCurrentType] = useState<VehicleProps | null>(
    vehicleList ? vehicleList[0] : null
  );

  const [startXY, setStartXY] = useState<Coordinate | null>(null);
  const [endXY, setEndXY] = useState<Coordinate | null>(null);
  const refMap = useRef<HTMLDivElement>(null);

  const handleChangeAcceptedVehicle = (vehicleTypeId: VehicleProps) => {
    setCurrentType(vehicleTypeId);
  };

  const handleValidateSlotData = (slot: SlotBlock) => {
    const validTypeId = validateVehicleTypeID(slot.typeId);
    if (!validTypeId.valid) {
      return validTypeId;
    }

    const validCoordinate = validateCoordinate({
      x_start: slot.x_start,
      y_start: slot.y_start,
      x_end: slot.x_end,
      y_end: slot.y_end,
    });
    if (!validCoordinate.valid) {
      return validCoordinate;
    }

    return {
      valid: true,
      message: "The data is correct.",
      data: null,
    };
  };

  /* 
  Whenever the pointer up (finish drawing new slot), the system will
  immediately call this function to display a modal for manager to set the slot ID.
  In this modal, manager can also delete the new slot.
  After done, new slot will be added to local array until manager click on Save button.
  */
  const handleKeyUp = (slot: SlotBlock) => {
    // console.log(slot);
    // validate typeId, coordinates
    const validSlot = handleValidateSlotData(slot);
    if (!validSlot.valid) {
      toast.error(validSlot.message);
      return;
    }
    onSetNewSlot(slot);
    onOpenModal();
  };

  useEffect(() => {
    if (!editable) return;
    let isCreate = false;
    let x_start = 0;
    let y_start = 0;
    let x_end = 0;
    let y_end = 0;

    // on drawing
    const onKeyMove = (e: PointerEvent) => {
      if (!isCreate) return;
      e.preventDefault();
      x_end = Math.round(e.offsetX / BLOCK_SIZE) * BLOCK_SIZE;
      y_end = Math.round(e.offsetY / BLOCK_SIZE) * BLOCK_SIZE;
      setEndXY({ x: x_end, y: y_end });
    };

    // start drawing
    const onKeyDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isCreate = true;
      x_end = x_start = Math.round(e.offsetX / BLOCK_SIZE) * BLOCK_SIZE;
      y_end = y_start = Math.round(e.offsetY / BLOCK_SIZE) * BLOCK_SIZE;
      setStartXY({ x: x_start, y: y_start });
      setEndXY({ x: x_end, y: y_end });
    };

    // done drawing
    const onKeyUp = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isCreate = false;
      if (!currentType) {
        toast.error("You have no accepted vehicle type, create one now!");
      } else {
        if (x_start !== x_end && y_start !== y_end) {
          handleKeyUp({
            id: "",
            typeId: currentType.id,
            x_start: x_start,
            y_start: y_start,
            x_end: x_end,
            y_end: y_end,
          } as SlotBlock);
        }
      }
      setStartXY(null);
      setEndXY(null);
      x_start = y_start = x_end = y_end = 0;
    };

    if (!refMap.current) return;
    const map = refMap.current;
    map.addEventListener("pointerdown", onKeyDown);
    map.addEventListener("pointermove", onKeyMove);
    map.addEventListener("pointerup", onKeyUp);
    return () => {
      map.removeEventListener("pointerdown", onKeyDown);
      map.removeEventListener("pointermove", onKeyMove);
      map.removeEventListener("pointerup", onKeyUp);
    };
  }, [editable, currentType]);

  return (
    <div className="h-full w-full flex flex-col-reverse md:flex-row gap-3">
      <Card className="w-full h-full p-5 overflow-hidden">
        <div className="w-full h-full border border-neutral-500/50 overflow-auto">
          <div
            ref={refMap}
            style={{ width: MAP_SIZE, height: MAP_SIZE }}
            className="min-w-full min-h-full relative text-neutral-500 font-semibold"
          >
            <MapBackGround size={MAP_SIZE} />
            {/*slot list generating*/}
            {slotList.map((item, index) => {
              const vehicle = vehicleList.find(
                (vehicle) => vehicle.id === item.typeId
              );
              return (
                <EditableSlot
                  key={item.typeId + index + item.id}
                  slot={{ ...item }}
                  editable={editable}
                  typeColor={vehicle}
                  onDeleteSlot={onDeleteSlot}
                />
              );
            })}
            {/* current drawing */}
            {startXY && endXY && editable && (
              <EditableSlot
                slot={{
                  id: "",
                  x_start: startXY.x,
                  y_start: startXY.y,
                  x_end: endXY.x,
                  y_end: endXY.y,
                  typeId: currentType ? currentType.id : "",
                }}
                typeColor={currentType}
                editable={editable}
                onDeleteSlot={onDeleteSlot}
              />
            )}
          </div>
        </div>
      </Card>
      {editable && (
        <Card className="p-3 md:py-5 w-full md:w-1/5 overflow-hidden">
          <h4 className="font-semibold mb-1">Vehicle type</h4>
          <div className="w-full h-full overflow-auto">
            {vehicleList.length && currentType ? (
              <div className="flex flex-row md:flex-col gap-1">
                {vehicleList.map((item, index) => (
                  <div
                    key={item.name + index + "choosing"}
                    className={`p-1 px-2 rounded hover:bg-slate-200 cursor-pointer
                flex items-center gap-1 flex-shrink-0 ${
                  currentType.id === item.id ? "bg-slate-200" : ""
                }`}
                    onClick={() =>
                      handleChangeAcceptedVehicle(vehicleList[index])
                    }
                  >
                    <div
                      className="w-3 h-3 border-[0.5px] border-neutral-300 rounded"
                      style={{
                        backgroundColor: vehicleList[index].color,
                      }}
                    ></div>
                    <div className="line-clamp-1 w-fit">{item.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>You have no vehicle type in the parking lot in present!</div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

export default function ManagerMap() {
  const { refreshToken, token } = useToken();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<SlotBlock[] | null>(null);
  const [vehicleList, setVehicleList] = useState<VehicleProps[] | null>(null);
  const refModal = useRef<HTMLDialogElement>(null);

  const [newSlot, setNewSlot] = useState<SlotBlock | null>(null);

  const toggleModal = () => {
    if (!refModal?.current) return;
    refModal.current.hasAttribute("open")
      ? refModal.current.close()
      : refModal.current.showModal();
  };

  const handleSetNewSlot = (slot: SlotBlock | null) => {
    setNewSlot(slot);
  };

  const handleAddNewSlot = (slot: SlotBlock) => {
    setData((prev) => {
      if (!prev) return null;
      return [...prev, slot];
    });
  };

  const handleDeleteSlot = (id: string) => {
    setData((prev) => {
      if (!prev) return null;
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSaveMap = async () => {
    try {
      if (!data) {
        setIsEdit(false);
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
        const res = await updateDBMap(newToken, data);
        if (res.status === 200) {
          setIsEdit(false);
          toast.success("Map is updated successfully.");
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
          const typeListData = optionData.map((item) => ({
            id: item.id,
            name: item.name,
            color: `#${Math.floor(Math.random() * 0xffffff)
              .toString(16)
              .padStart(6, "0")}`,
          }));
          // console.log(typeListData);
          setVehicleList(typeListData);
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

  const handleGetSlotList = async () => {
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
        const res = await getParkingSlotList(newToken);
        if (res.status === 200) {
          const newData: SlotBlockDBGetType[] = res.data;
          const filteredData: SlotBlock[] = newData.map((item) => ({
            id: item.id,
            typeId: item.typeId,
            x_start: item.x_start,
            x_end: item.x_end,
            y_start: item.y_start,
            y_end: item.y_end,
          }));
          // console.log(filteredData);
          setData(filteredData);
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
    handleGetSlotList();
  }, []);

  return (
    <>
      <BreadcrumbsComponent dir={["Map management"]} />
      <PageContentCotainer2 className="overflow-hidden pb-32">
        {data && vehicleList ? (
          <>
            {!isEdit && (
              <div className="w-full items-center grid gap-3 grid-flow-row grid-cols-2 sm:grid-cols-4">
                <Card className="h-full w-full">
                  <SmallStatisticsContent
                    name="Total slots"
                    value={String(data.length)}
                  />
                </Card>
                <Button
                  name="Edit Map"
                  className="p-5 font-bold w-full h-full sm:col-span-3"
                  onClickFunction={() => setIsEdit(true)}
                />
              </div>
            )}
            {isEdit && (
              <Button
                name="Save Map"
                className="p-5 py-2.5 font-bold w-full"
                onClickFunction={handleSaveMap}
              />
            )}
            <EditableParkingLotMap
              editable={isEdit}
              slotList={data}
              vehicleList={vehicleList}
              onDeleteSlot={handleDeleteSlot}
              onSetNewSlot={handleSetNewSlot}
              onOpenModal={toggleModal}
            />
          </>
        ) : (
          <MapPageSkeleton />
        )}
      </PageContentCotainer2>
      <SlotInfoModal
        ref={refModal}
        onClose={toggleModal}
        slot={newSlot}
        onResetData={handleSetNewSlot}
        onAddNewSlot={handleAddNewSlot}
      />
    </>
  );
}
