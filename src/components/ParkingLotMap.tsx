"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Card from "./Card";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { getSlotList } from "@/lib/actions";
import { SlotList } from "@/lib/data";
import { PageContentContainer } from "./ContainerUI";

const BLOCK_SIZE = 24; // px
export type SlotBlock = {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
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
  changeSlotList,
}: {
  slot: SlotBlock;
  editable: boolean;
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
        top: slot.startY,
        left: slot.startX,
        width: slot.endX - slot.startX,
        height: slot.endY - slot.startY,
      }}
      className="absolute bg-white border border-green-500 shadow-md
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
            // console.log("delete");
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
  setSlotList,
}: {
  edit: boolean;
  slots: SlotBlock[];
  setSlotList: Dispatch<SetStateAction<SlotBlock[]>>;
}) {
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setEditable(edit);
  }, [edit]);

  return (
    <>
      {slots.map((item, index) => (
        <EditableSlot
          key={index}
          slot={{ ...item }}
          editable={editable}
          changeSlotList={setSlotList}
        />
      ))}
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

function ParkingLotMapEdit({
  editable,
  dataInit,
}: {
  editable: boolean;
  dataInit: SlotBlock[];
}) {
  const [slotList, setSlotList] = useState<SlotBlock[]>(dataInit);
  const [startXY, setStartXY] = useState<{ x: number; y: number } | null>(null);
  const [endXY, setEndXY] = useState<{ x: number; y: number } | null>(null);
  const refMap = useRef<HTMLDivElement>(null);

  // Whenever the pointer up (finish drawing new slot), the system will
  // imediately call this  function to add a new slot into the database
  const handleKeyUp = (slot: SlotBlock) => {
    setSlotList((prev) => {
      return [...prev, slot];
    });
  };

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
      // console.log("on drawing");
      endX = Math.round(e.offsetX / BLOCK_SIZE) * BLOCK_SIZE;
      endY = Math.round(e.offsetY / BLOCK_SIZE) * BLOCK_SIZE;
      setEndXY({ x: endX, y: endY });
    };

    // start drawing
    const onKeyDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      // console.log("start drawing");
      isCreate = true;
      endX = startX = Math.round(e.offsetX / BLOCK_SIZE) * BLOCK_SIZE;
      endY = startY = Math.round(e.offsetY / BLOCK_SIZE) * BLOCK_SIZE;
      setStartXY({ x: startX, y: startY });
      setEndXY({ x: endX, y: endY });
    };

    // done drawing
    const onKeyUp = (e: PointerEvent) => {
      if (e.button !== 0) return;
      // console.log("stop drawing");
      isCreate = false;
      if (startX !== endX && startY !== endY) {
        // console.log("adding new slot");
        handleKeyUp({
          id: "",
          startX: startX,
          startY: startY,
          endX: endX,
          endY: endY,
        } as SlotBlock);
      }
      setStartXY(null);
      setEndXY(null);
      startX = startY = endX = endY = 0;
    };

    console.log(refMap.current);
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
  }, [editable]);

  return (
    // <PageContentContainer>
    <div className="h-full w-full">
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
              setSlotList={setSlotList}
            />
            {/* current drawing */}
            {startXY && endXY && editable && (
              <EditableSlot
                slot={{
                  id: "",
                  startX: startXY.x,
                  startY: startXY.y,
                  endX: endXY.x,
                  endY: endXY.y,
                }}
                editable={editable}
                changeSlotList={setSlotList}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
    // </PageContentContainer>
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
        top: slot.startY,
        left: slot.startX,
        width: slot.endX - slot.startX,
        height: slot.endY - slot.startY,
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
