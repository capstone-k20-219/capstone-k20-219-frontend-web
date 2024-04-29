"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Card from "./Card";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { getSlotList, getVehicleTypeListForMap } from "@/lib/actions";
import { SlotList } from "@/lib/data";
import { PageContentContainer } from "./ContainerUI";
import { VehicleTypeData } from "@/lib/type";

const BLOCK_SIZE = 24; // px
export type SlotBlock = {
  id: string;
  coordinate: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };
  acceptedVehicleType: number;
};

function MapBackGround({ size }: { size: number }) {
  return (
    <div>
      {[...Array(size / BLOCK_SIZE - 1)].map((_, index) => (
        <div
          key={"horizontal" + index}
          style={{
            top: (index + 1) * BLOCK_SIZE,
          }}
          className={`w-full absolute left-0 border-b border-b-gray-100`}
        ></div>
      ))}
      {[...Array(size / BLOCK_SIZE - 1)].map((_, index) => (
        <div
          key={"vertical" + index}
          style={{
            left: (index + 1) * BLOCK_SIZE,
          }}
          className={`h-full absolute top-0 border-l border-l-gray-100`}
        ></div>
      ))}
    </div>
  );
}

function EditableSlot({
  slot,
  editable,
  acceptedVehicle,
  changeSlotList,
}: {
  slot: SlotBlock;
  editable: boolean;
  acceptedVehicle?: VehicleProps;
  changeSlotList: Dispatch<SetStateAction<SlotBlock[]>>;
}) {
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
        top: slot.coordinate.startY,
        left: slot.coordinate.startX,
        width: slot.coordinate.endX - slot.coordinate.startX,
        height: slot.coordinate.endY - slot.coordinate.startY,
        borderColor: acceptedVehicle ? acceptedVehicle.color : "#c4c4c4",
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
          className="absolute bg-white rounded p-2 w-20 shadow-md text-center 
        border border-neutral-500 z-50 text-red-900 flex gap-1 items-center"
          onClick={() => {
            changeSlotList((pre) => pre.filter((s) => s.id !== slot.id));
            setOpenMenu(false);
          }}
        >
          <MdDelete style={{ color: "red", width: 16, height: 16 }} />
          <span>Delete</span>
        </div>
      )}
    </div>
  );
}

function EditableSlotsDisplay({
  edit = false,
  slots,
  acceptedVehicleList,
  setSlotList,
}: {
  edit: boolean;
  slots: SlotBlock[];
  acceptedVehicleList: VehicleProps[];
  setSlotList: Dispatch<SetStateAction<SlotBlock[]>>;
}) {
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setEditable(edit);
  }, [edit]);

  return (
    <>
      {slots.map((item, index) => {
        const vehicle = acceptedVehicleList.find(
          (vehicle) => vehicle.id === item.acceptedVehicleType
        );
        return (
          <EditableSlot
            key={index}
            slot={{ ...item }}
            editable={editable}
            acceptedVehicle={vehicle}
            changeSlotList={setSlotList}
          />
        );
      })}
    </>
  );
}

const initialSlot = {
  id: "",
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
};

interface VehicleProps {
  id: number;
  name: string;
  color: string;
}

const initialVehicleProps: VehicleProps = {
  id: 0,
  name: "",
  color: "#c4c4c4",
};

function ParkingLotMapEdit({
  editable,
  dataInit,
  vehicleList,
}: {
  editable: boolean;
  dataInit: SlotBlock[];
  vehicleList: VehicleTypeData[];
}) {
  const [slotList, setSlotList] = useState<SlotBlock[]>(dataInit);
  const [startXY, setStartXY] = useState<{ x: number; y: number } | null>(null);
  const [endXY, setEndXY] = useState<{ x: number; y: number } | null>(null);
  const refMap = useRef<HTMLDivElement>(null);
  const [currentVehicleType, setCurrentVehicleType] =
    useState<VehicleProps>(initialVehicleProps);
  const [vehicleColors, setVehicleColors] = useState<VehicleProps[]>([]);

  const handleChangeAcceptedVehicle = (vehicleTypeId: VehicleProps) => {
    setCurrentVehicleType(vehicleTypeId);
  };

  // Whenever the pointer up (finish drawing new slot), the system will
  // imediately call this  function to add a new slot into the database
  const handleKeyUp = (slot: SlotBlock) => {
    setSlotList((prev) => {
      return [...prev, slot];
    });
  };

  useEffect(() => {
    if (vehicleList.length > 0) {
      let vehicleColorList = new Array(vehicleList.length);
      for (let i = 0; i < vehicleColorList.length; i++) {
        vehicleColorList[i] = {
          id: vehicleList[i].id,
          name: vehicleList[i].name,
          color: `#${Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, "0")}`,
        };
      }
      setVehicleColors(vehicleColorList);
      setCurrentVehicleType(vehicleColorList[0]);
    }
  }, [vehicleList]);

  useEffect(() => {
    setSlotList(dataInit);
  }, [dataInit]);

  useEffect(() => {
    if (!editable) return;
    let isCreate = false;
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    // on drawing
    const onKeyMove = (e: PointerEvent) => {
      if (!isCreate) return;
      e.preventDefault();
      endX = Math.round(e.offsetX / BLOCK_SIZE) * BLOCK_SIZE;
      endY = Math.round(e.offsetY / BLOCK_SIZE) * BLOCK_SIZE;
      setEndXY({ x: endX, y: endY });
    };

    // start drawing
    const onKeyDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isCreate = true;
      endX = startX = Math.round(e.offsetX / BLOCK_SIZE) * BLOCK_SIZE;
      endY = startY = Math.round(e.offsetY / BLOCK_SIZE) * BLOCK_SIZE;
      setStartXY({ x: startX, y: startY });
      setEndXY({ x: endX, y: endY });
    };

    // done drawing
    const onKeyUp = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isCreate = false;
      if (startX !== endX && startY !== endY) {
        handleKeyUp({
          id: "",
          coordinate: {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
          },
          acceptedVehicleType: currentVehicleType.id as number,
        } as SlotBlock);
      }
      setStartXY(null);
      setEndXY(null);
      startX = startY = endX = endY = 0;
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
  }, [editable, currentVehicleType]);

  return (
    <div className="h-full w-full flex flex-col-reverse md:flex-row gap-3">
      <Card className="w-full h-full p-5 overflow-hidden">
        <div className="w-full h-full border border-neutral-500/50 overflow-auto">
          <div
            ref={refMap}
            className="min-w-full min-h-full w-[1800px] h-[1800px] relative text-neutral-500 font-semibold"
          >
            <MapBackGround size={1800} />
            {/*slot list generating*/}
            <EditableSlotsDisplay
              edit={editable}
              slots={slotList}
              acceptedVehicleList={vehicleColors}
              setSlotList={setSlotList}
            />
            {/* current drawing */}
            {startXY && endXY && editable && (
              <EditableSlot
                slot={{
                  id: "",
                  coordinate: {
                    startX: startXY.x,
                    startY: startXY.y,
                    endX: endXY.x,
                    endY: endXY.y,
                  },
                  acceptedVehicleType: currentVehicleType?.id as number,
                }}
                acceptedVehicle={currentVehicleType!}
                editable={editable}
                changeSlotList={setSlotList}
              />
            )}
          </div>
        </div>
      </Card>
      {editable && (
        <Card className="p-3 md:py-5 w-full md:w-1/5 overflow-hidden">
          <h4 className="font-semibold mb-1">Vehicle type</h4>
          <div className="w-full h-full overflow-auto">
            <div className="flex flex-row md:flex-col gap-1">
              {vehicleList.map((item, index) => (
                <div
                  key={index}
                  className={`p-1 px-2 rounded hover:bg-slate-200 cursor-pointer
                flex items-center gap-1 flex-shrink-0 ${
                  currentVehicleType?.id === item.id ? "bg-slate-200" : ""
                }`}
                  onClick={() =>
                    handleChangeAcceptedVehicle(vehicleColors[index])
                  }
                >
                  <div
                    className="w-3 h-3 border-[0.5px] border-neutral-300 rounded"
                    style={{
                      backgroundColor: vehicleColors[index].color,
                    }}
                  ></div>
                  <div className="line-clamp-1 w-fit">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function Slot({ slot }: { slot: SlotBlock }) {
  // const [openMenu, setOpenMenu] = useState(false);
  // const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const refMenu = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={refMenu}
      style={{
        top: slot.coordinate.startY,
        left: slot.coordinate.startX,
        width: slot.coordinate.endX - slot.coordinate.startX,
        height: slot.coordinate.endY - slot.coordinate.startY,
      }}
      className="absolute bg-white border border-green-500 shadow-md
          grid place-items-center cursor-pointer text-xs"
    >
      <span className="vertical-text">{slot.id}</span>
    </div>
  );
}

function SlotsDisplay({ slots }: { slots: SlotBlock[] }) {
  return (
    <>
      {slots.map((item, index) => (
        <Slot key={index} slot={{ ...item }} />
      ))}
    </>
  );
}

function ParkingLotMap({ dataInit }: { dataInit: SlotBlock[] }) {
  const [slotList, setSlotList] = useState<SlotBlock[]>(dataInit);
  const refMap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlotList(dataInit);
  }, [dataInit]);

  return (
    <PageContentContainer>
      <div className="w-full h-full border border-neutral-500/50 overflow-auto">
        <div
          ref={refMap}
          className="min-w-full min-h-full w-[1800px] h-[1800px] relative text-neutral-500 font-semibold"
        >
          <MapBackGround size={1800} />
          <SlotsDisplay slots={slotList} />
        </div>
      </div>
    </PageContentContainer>
  );
}

export { ParkingLotMap, ParkingLotMapEdit };
