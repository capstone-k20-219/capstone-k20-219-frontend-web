"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PageContentContainer } from "./ContainerUI";
import { BLOCK_SIZE, SlotBlock, VehicleTypeData } from "@/lib/type";

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

function Slot({ slot }: { slot: SlotBlock }) {
  // const [openMenu, setOpenMenu] = useState(false);
  // const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const refMenu = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={refMenu}
      style={{
        top: slot.y_start,
        left: slot.x_start,
        width: slot.x_end - slot.x_start,
        height: slot.y_end - slot.y_start,
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

export { MapBackGround, ParkingLotMap };
