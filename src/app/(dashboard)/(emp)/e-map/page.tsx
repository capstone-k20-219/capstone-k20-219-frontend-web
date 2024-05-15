"use client";

import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import Button from "@/components/Button";
import ButtonWhite from "@/components/ButtonWhite";
import Card from "@/components/Card";
import {
  DialogContainer,
  PageContentCotainer2,
} from "@/components/ContainerUI";
import { MapBackGround } from "@/components/ParkingLotMap";
import { MapPageV2Skeleton } from "@/components/Skeleton";
import { realtimeDB } from "@/lib/config/firebase.config";
import { MAP_SIZE } from "@/lib/data";
import {
  eliminateSpecialChars,
  formatCreatedTime,
  statusAction,
} from "@/lib/helpers";
import useToken from "@/lib/hooks/refresh-token";
import { getParkingSlotList } from "@/lib/services/parking-slots";
import {
  checkIn,
  checkOut,
  getCheckedInList,
  updateBill,
} from "@/lib/services/parking-tickets";
import {
  ParkingTicketDBGetType,
  ScanDataType,
  SlotBlockDBGetType,
  TicketCheckoutDBGetType,
} from "@/lib/type";
import { onValue, ref, set } from "firebase/database";
import { forwardRef, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type SlotProps = {
  slot: SlotBlockDBGetType;
  ticket: ParkingTicketDBGetType | undefined;
};

type VehicleProps = {
  id: string;
  name: string;
  color: string;
};

function Slot({ slot, ticket }: SlotProps) {
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

type ParkingLotMapProps = {
  slotList: SlotBlockDBGetType[];
  checkinList: ParkingTicketDBGetType[] | null;
};

function ParkingLotMap({ slotList, checkinList }: ParkingLotMapProps) {
  return (
    <div className="h-full w-full flex flex-col-reverse md:flex-row gap-3">
      <Card className="w-full h-full p-5 overflow-hidden">
        <div className="w-full h-full border border-neutral-500/50 overflow-auto">
          <div
            style={{ width: MAP_SIZE, height: MAP_SIZE }}
            className="min-w-full min-h-full relative text-neutral-500 font-semibold"
          >
            <MapBackGround size={MAP_SIZE} />
            {slotList.map((item, index) => {
              const checked = checkinList?.find(
                (ticket) => ticket.slotId === item.id
              );
              return (
                <Slot
                  key={item.typeId + index + item.id}
                  slot={{ ...item }}
                  ticket={checked}
                />
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

type CheckoutModalProps = {
  checkOutInfo: ScanDataType;
  onClose: () => void;
  onResetData: () => void;
  onDeleteSlotCheckout: (id: string) => void;
};

const CheckoutModal = forwardRef<HTMLDialogElement, CheckoutModalProps>(
  ({ checkOutInfo, onClose, onResetData, onDeleteSlotCheckout }, refModal) => {
    const { refreshToken, token } = useToken();
    const [bill, setBill] = useState<TicketCheckoutDBGetType | null>(null);

    const handleCloseModal = () => {
      setBill(null);
      onDeleteSlotCheckout(checkOutInfo.qrCode);
      onResetData();
      onClose();
    };

    const handleConfirmBill = async (ticketId: string) => {
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
          const res = await updateBill(newToken, ticketId);
          if (res.status === 200 || res.status === 201) {
            toast.success("Checking out successfully!");
            handleCloseModal();
            return;
          } else if (res.status === 401) {
            isUnauthorized = true;
          } else {
            statusAction(res.status);
            toast.error("Please try again!");
            return;
          }
        } while (true);
      } catch (error) {
        toast.error("Server error when updating bill");
        return;
      }
    };

    const handleCheckOut = async (ticketId: string, plateNo: string) => {
      try {
        // validate plateNo
        const newId = eliminateSpecialChars(ticketId);
        const newPlate = eliminateSpecialChars(plateNo);

        let isUnauthorized = false;
        let newToken = token;
        do {
          if (isUnauthorized) {
            const isRefreshed = await refreshToken();
            if (!isRefreshed.valid) return;
            newToken = isRefreshed.access_token;
            isUnauthorized = false;
          }
          const res = await checkOut(newToken, newId, newPlate);
          if (res.status === 201 || res.status === 200) {
            const resData: TicketCheckoutDBGetType = res.data;
            setBill(resData);
            return;
          } else if (res.status === 401) {
            isUnauthorized = true;
          } else {
            toast.error("Failed to checking the vehicle out!");
            toast.error("Please try again!");
            return;
          }
        } while (true);
      } catch (error) {
        toast.error("Server error when checking out!");
        return;
      }
    };

    return (
      <DialogContainer ref={refModal}>
        {checkOutInfo.plateNumberOut && checkOutInfo.qrCode && !bill && (
          <div className="w-full h-full flex-col justify-center gap-2.5 flex">
            <div className="message text-neutral-900">
              <h3 className="text-lg text-center font-bold">
                CHECK OUT REQUEST
              </h3>
              <hr className="my-2" />
              <p>
                <span className="font-semibold mr-1">Ticket ID:</span>
                <span>{checkOutInfo.qrCode}</span>
              </p>
              <p>
                <span className="font-semibold mr-1">Plate Number:</span>
                <span>{checkOutInfo.plateNumberOut}</span>
              </p>
            </div>
            <Button
              name="Confirm"
              className="w-full text-sm px-2.5 py-2 mt-2.5 font-bold"
              onClickFunction={() =>
                handleCheckOut(checkOutInfo.qrCode, checkOutInfo.plateNumberOut)
              }
            />
          </div>
        )}

        {bill && (
          <div className="w-full h-full flex-col justify-center gap-2.5 flex">
            <div className="message text-neutral-900">
              <h3 className="text-lg text-center font-bold">PARKING BILL</h3>
              <hr className="my-2" />
              <p>
                <span className="font-semibold mr-1">Ticket ID:</span>
                <span>{bill.ticketId}</span>
              </p>
              <p>
                <span className="font-semibold mr-1">Plate Number:</span>
                <span>{bill.plateNo}</span>
              </p>
              <p>
                <span className="font-semibold mr-1">Parking slot:</span>
                <span>{bill.slotId}</span>
              </p>
              <p>
                <span className="font-semibold mr-1">Arrived in:</span>
                <span>{formatCreatedTime(bill.checkInTime)}</span>
              </p>
              <p>
                <span className="font-semibold mr-1">
                  Parking cost (include service cost):
                </span>
                <span>
                  {"$" +
                    bill.parkingCost +
                    bill.services.reduce((acc, curr) => acc + curr.cost, 0)}
                </span>
              </p>
            </div>
            <Button
              name="Confirm"
              className="w-full text-sm px-2.5 py-2 mt-2.5 font-bold"
              onClickFunction={() => handleConfirmBill(bill.ticketId)}
            />
          </div>
        )}

        {!checkOutInfo.plateNumberOut && !checkOutInfo.qrCode && (
          <>
            <div className="text-center text-lg font-semibold">
              There is no parking bill exist!
            </div>
            <ButtonWhite
              name="Cancel"
              className="w-full text-sm px-2.5 py-2 mt-2.5 font-bold"
              onClickFunction={() => handleCloseModal()}
            />
          </>
        )}
      </DialogContainer>
    );
  }
);

CheckoutModal.displayName = "CheckoutModal";

type CheckinModalProps = {
  plateNo: string;
  onClose: () => void;
  onReloadCheckinList: () => void;
};

const CheckinModal = forwardRef<HTMLDialogElement, CheckinModalProps>(
  ({ plateNo, onClose, onReloadCheckinList }, refModal) => {
    const { refreshToken, token } = useToken();

    const handleCloseModal = () => {
      onClose();
    };

    const handleCheckIn = async () => {
      try {
        // validate plateNo
        const newPlate = eliminateSpecialChars(plateNo);

        let isUnauthorized = false;
        let newToken = token;
        do {
          if (isUnauthorized) {
            const isRefreshed = await refreshToken();
            if (!isRefreshed.valid) return;
            newToken = isRefreshed.access_token;
            isUnauthorized = false;
          }
          const res = await checkIn(newToken, newPlate);
          if (res.status === 201 || res.status === 200) {
            // resetScannerData();
            toast.success("Checking in successfully!");
            onReloadCheckinList();
            handleCloseModal();
            return;
          } else if (res.status === 401) {
            isUnauthorized = true;
          } else if (res.status === 400) {
            toast.error("Vehicle has not registered!");
            handleCloseModal();
            return;
          } else {
            toast.error("Failed to checking the vehicle in!");
            handleCloseModal();
            return;
          }
        } while (true);
      } catch (error) {
        toast.error("Server error");
        return;
      }
    };

    return (
      <DialogContainer ref={refModal}>
        {plateNo ? (
          <div className="w-full h-full flex-col justify-center gap-2.5 flex">
            <div className="message text-neutral-900">
              <h3 className="text-lg text-center font-bold">
                CHECK IN REQUEST
              </h3>
              <hr className="my-2" />
              <p>
                <span className="font-semibold mr-1">Plate Number:</span>
                <span>{plateNo}</span>
              </p>
            </div>
            <Button
              name="Confirm"
              className="w-full text-sm px-2.5 py-2 mt-2.5 font-bold"
              onClickFunction={handleCheckIn}
            />
          </div>
        ) : (
          <>
            <div className="text-center text-lg font-semibold">
              There is no check in request!
            </div>
            <ButtonWhite
              name="Cancel"
              className="w-full text-sm px-2.5 py-2 mt-2.5 font-bold"
              onClickFunction={() => handleCloseModal()}
            />
          </>
        )}
      </DialogContainer>
    );
  }
);

CheckinModal.displayName = "CheckinModal";

/**
 * slotId: id === TicketBaseInfo.slotId --> busy
 * coordinates -> draw
 * typeId: vehicle type
 * type.name: vechile type name
 * ticket.id
 * plateNo.
 *
 */

const initialCheckOutInfo: ScanDataType = {
  plateNumberIn: "",
  plateNumberOut: "",
  qrCode: "",
};

export default function EmplpoyeeMap() {
  const { refreshToken, token } = useToken();
  const [slotStorage, setSlotStorage] = useState<SlotBlockDBGetType[] | null>(
    null
  );
  const [checkinList, setCheckinList] = useState<
    ParkingTicketDBGetType[] | null
  >(null);
  const [isReload, setIsReload] = useState(false);
  const [isReloadCheckInState, setIsReloadCheckInState] = useState(false);
  const [updateTime, setUpdateTime] = useState("");

  const [checkOutInfo, setCheckOutInfo] =
    useState<ScanDataType>(initialCheckOutInfo);
  const [checkinPlateNo, setCheckinPlateNo] = useState("");

  const refModalCheckin = useRef<HTMLDialogElement>(null);
  const refModalCheckout = useRef<HTMLDialogElement>(null);

  const dbRef = ref(realtimeDB, "scanData");

  const handleCloseModalCheckin = () => {
    if (!refModalCheckin?.current) return;
    refModalCheckin.current.close();
  };

  const handleCloseModalCheckout = () => {
    if (!refModalCheckout?.current) return;
    refModalCheckout.current.close();
  };

  const handleOpenModalCheckin = () => {
    if (!refModalCheckin?.current) return;
    refModalCheckin.current.showModal();
  };

  const handleOpenModalCheckout = () => {
    if (!refModalCheckout?.current) return;
    refModalCheckout.current.showModal();
  };

  const handleReload = () => {
    setIsReload((prev) => !prev);
  };

  const handleResetCheckoutInfo = () => {
    setCheckOutInfo(initialCheckOutInfo);
  };

  const handleDeleteSlotLocal = (ticketId: string) => {
    const oldCheckinList = checkinList ? [...checkinList] : [];
    setCheckinList(oldCheckinList.filter((item) => item.id !== ticketId));
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

  const resetScannerData = () => {
    set(dbRef, {
      plateNumberIn: "",
      plateNumberOut: "",
      qrCode: "",
    });
  };

  const handleReloadCheckinList = () => {
    setIsReloadCheckInState(true);
  };

  onValue(dbRef, (snapshot) => {
    const data: ScanDataType = snapshot.val();
    if (data.plateNumberIn && !data.plateNumberOut && !data.qrCode) {
      // check in
      // console.log("checking in...");
      resetScannerData();
      setCheckinPlateNo(data.plateNumberIn);
      handleOpenModalCheckin();
    } else if (!data.plateNumberIn && data.plateNumberOut && data.qrCode) {
      // turn on check out modal to confirm
      // console.log("checking out...");
      setCheckOutInfo(data);
      resetScannerData();
      handleOpenModalCheckout();
    }
  });

  useEffect(() => {
    if (isReloadCheckInState) {
      handleGetCheckinList();
      const now = new Date().toISOString();
      setUpdateTime(formatCreatedTime(now));
      setIsReloadCheckInState(false);
    }
  }, [isReloadCheckInState]);

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
        {slotStorage ? (
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
            <ParkingLotMap slotList={slotStorage} checkinList={checkinList} />
          </>
        ) : (
          <MapPageV2Skeleton />
        )}
      </PageContentCotainer2>
      <CheckinModal
        ref={refModalCheckin}
        plateNo={checkinPlateNo}
        onClose={handleCloseModalCheckin}
        onReloadCheckinList={handleReloadCheckinList}
      />
      <CheckoutModal
        ref={refModalCheckout}
        checkOutInfo={checkOutInfo}
        onClose={handleCloseModalCheckout}
        onResetData={handleResetCheckoutInfo}
        onDeleteSlotCheckout={handleDeleteSlotLocal}
      />
    </>
  );
}
