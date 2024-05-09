"use client";

import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import Button from "@/components/Button";
import ButtonWhite from "@/components/ButtonWhite";
import Card from "@/components/Card";
import {
  DialogContainer,
  PageContentContainer,
  PageContentCotainer2,
} from "@/components/ContainerUI";
import { MapBackGround } from "@/components/ParkingLotMap";
import { MapPageSkeleton, MapPageV2Skeleton } from "@/components/Skeleton";
import {
  formatCreatedTime,
  statusAction,
  validateCoordinate,
  validateVehicleTypeID,
} from "@/lib/helpers";
import useToken from "@/lib/hooks/refresh-token";
import { getParkingSlotList } from "@/lib/services/parking-slots";
import { getCheckedInList } from "@/lib/services/parking-tickets";
import {
  CheckInInfoType,
  ParkingTicketDBGetType,
  SlotBlock,
  SlotBlockDBGetType,
  TicketCheckInDBGetType,
} from "@/lib/type";
import { forwardRef, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type SlotProps = {
  slot: SlotBlockDBGetType;
  ticket: ParkingTicketDBGetType | undefined;
  onDeleteSlot: (id: string) => void;
};

type VehicleProps = {
  id: string;
  name: string;
  color: string;
};

function Slot({ slot, ticket, onDeleteSlot }: SlotProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const refMenu = useRef<HTMLDivElement | null>(null);

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    setOpenMenu(true);
  };

  useEffect(() => {
    const handleHoverOutside = (e: any) => {
      if (!refMenu?.current?.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mouseover", handleHoverOutside);
    return () => {
      document.removeEventListener("mouseover", handleHoverOutside);
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
        borderColor: ticket ? "green" : "#c4c4c4",
        backgroundColor: ticket ? "#d7ffd6" : "white",
      }}
      className="absolute bg-white border shadow-md
          grid place-items-center cursor-pointer text-xs"
      onMouseMove={handleContextMenu}
    >
      <span className="vertical-text">{slot.id}</span>
      {openMenu && (
        <div
          style={{
            top: 0,
            left: slot.x_end - slot.x_start,
          }}
          className="absolute bg-white rounded min-w-[200px] shadow-md p-1 
        border border-neutral-500 z-50 opacity-100"
        >
          <div className="text-neutral-900 p-1 text-[10px] font-light">
            <div className="font-semibold text-sm">{slot.id}</div>
            <hr className="mt-1 mb-2" />
            <div>
              Vehicle type: {slot.typeId} - {slot.type.name}
            </div>
            {ticket && (
              <>
                <div>Ticket id: {ticket.id}</div>
                <div>Customer id: {ticket.userId}</div>
                <div>Plate number: {ticket.plateNo}</div>
                <div>Checked in: {formatCreatedTime(ticket.createdAt)}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type CheckoutModalProps = {
  slot: SlotBlock | null;
  onClose: () => void;
  onResetData: (slot: SlotBlock | null) => void;
  onAddNewSlot: (slot: SlotBlock) => void;
};

const CheckoutModal = forwardRef<HTMLDialogElement, CheckoutModalProps>(
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
      if (slot) {
        onAddNewSlot({
          id: id,
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
          <div className="w-full h-full flex-col justify-center gap-2.5 flex">
            <div className="message"></div>
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
          </div>
        )}
      </DialogContainer>
    );
  }
);

type Coordinate = {
  x: number;
  y: number;
};

type ParkingLotMapProps = {
  slotList: SlotBlockDBGetType[];
  checkinList: ParkingTicketDBGetType[];
  onDeleteSlot: (id: string) => void;
};

function ParkingLotMap({
  slotList,
  checkinList,
  onDeleteSlot,
}: ParkingLotMapProps) {
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

  return (
    <div className="h-full w-full flex flex-col-reverse md:flex-row gap-3">
      <Card className="w-full h-full p-5 overflow-hidden">
        <div className="w-full h-full border border-neutral-500/50 overflow-auto">
          <div className="min-w-full min-h-full w-[1800px] h-[1800px] relative text-neutral-500 font-semibold">
            <MapBackGround size={1800} />
            {slotList.map((item, index) => {
              const checked = checkinList.find(
                (ticket) => ticket.slotId === item.id
              );
              return (
                <Slot
                  key={item.typeId + index + item.id}
                  slot={{ ...item }}
                  ticket={checked}
                  onDeleteSlot={onDeleteSlot}
                />
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

/**
 * slotId: id === TicketBaseInfo.slotId --> busy
 * coordinates -> draw
 * typeId: vehicle type
 * type.name: vechile type name
 * ticket.id
 * plateNo.
 *
 */

export default function EmplpoyeeMap() {
  const { refreshToken, token } = useToken();
  const [slotStorage, setSlotStorage] = useState<SlotBlockDBGetType[] | null>(
    null
  );
  const [checkinList, setCheckinList] = useState<
    ParkingTicketDBGetType[] | null
  >(null);
  const [isReload, setIsReload] = useState(false);
  const [updateTime, setUpdateTime] = useState("");

  const handleReload = () => {
    setIsReload((prev) => !prev);
  };

  const handleDeleteSlotLocal = (id: string) => {};

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
          console.log(newData);
          setSlotStorage(newData);
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error when getting map data!");
    }
  };

  const handleGetCheckinList = async () => {
    try {
      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return null;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await getCheckedInList(newToken);
        if (res.status === 200) {
          const newData: ParkingTicketDBGetType[] =
            res.data as ParkingTicketDBGetType[];
          setCheckinList(newData);
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return null;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error when getting checkedin list");
      return null;
    }
  };

  useEffect(() => {
    handleGetSlotList();
    handleGetCheckinList();
    const now = new Date().toISOString();
    setUpdateTime(formatCreatedTime(now));
  }, [isReload]);

  return (
    <>
      <BreadcrumbsComponent dir={["Map"]} />
      <PageContentCotainer2 className="overflow-hidden pb-24 mt-3">
        {slotStorage && checkinList ? (
          <>
            <Card
              className="w-full text-sm flex items-center 
            justify-between p-3 py-1.5 rounded-[10px] gap-10"
            >
              <div>Updated at: {updateTime}</div>
              <div className="flex gap-4 items-center flex-1">
                <div className="flex items-center gap-1">
                  <div className="border border-[green] bg-[#d7ffd6] w-3 h-3 rounded"></div>
                  <div> Checked in </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="border border-[#c4c4c4] w-3 h-3 rounded"></div>
                  <div> Empty slot </div>
                </div>
              </div>
              <Button
                name="Refresh"
                className="p-4 py-2 w-fit self-end"
                onClickFunction={handleReload}
              />
            </Card>
            <ParkingLotMap
              slotList={slotStorage}
              checkinList={checkinList}
              onDeleteSlot={handleDeleteSlotLocal}
            />
          </>
        ) : (
          <MapPageV2Skeleton />
        )}
      </PageContentCotainer2>
    </>
  );
}
