"use client";

import Card from "@/components/Card";
import SmallStatisticsContent from "@/components/SmallStatisticsContent";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import {
  InComeAWeek,
  ParkingTraffic,
  ServiceRevenueContribution,
  VehicleTypeDistribution,
} from "@/components/BigStatisticsContent";
import { PageContentCotainer2 } from "@/components/ContainerUI";
import { useEffect, useState } from "react";
import { getParkingSlotList } from "@/lib/services/parking-slots";
import {
  ParkingTicketDBGetType,
  ServiceDBGetType,
  ServiceValue,
  SlotBlockDBGetType,
  TicketCheckInDBGetType,
  TicketCheckoutDBGetType,
  TrafficDataType,
  VehicleTypeData,
  VehicleValue,
  WeekRevenueType,
} from "@/lib/type";
import {
  formatMoney,
  formatValueDateString,
  getWeekRange,
  statusAction,
} from "@/lib/helpers";
import toast from "react-hot-toast";
import { getAllServices } from "@/lib/services/services";
import {
  getCheckedInList,
  getTrafficDataIn,
  getTrafficDataOut,
  getTrafficDataOutByService,
} from "@/lib/services/parking-tickets";
import Button from "@/components/Button";
import { getVehicleTypes } from "@/lib/services/vehicle-types";
import { getVehiclesByType } from "@/lib/services/vehicles";
import useToken from "@/lib/hooks/refresh-token";

function CardsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-5">
      {children}
    </div>
  );
}

function ChartSetOuterContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-xs h-full w-full pb-12 overflow-auto">
      {children}
    </div>
  );
}

function ChartSetInnerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-[20rem] md:max-h-[342px] items-center gap-3 flex flex-col md:flex-row">
      {children}
    </div>
  );
}

export default function ManagerHome() {
  const { refreshToken, token } = useToken();

  const [reload, setReload] = useState(false);
  // const [pageToken, setPageToken] = useState<string>(token);

  const [currentVehicle, setCurrentVehicle] = useState<number>(0);
  const [currentSlots, setCurrentSlots] = useState<number>(0);

  const [currentService, setCurrentService] = useState<number>(0);
  const [serviceRevenue, setServiceRevenue] = useState<ServiceValue[] | null>(
    null
  );

  const [currentRevenue, setCurrentRevenue] = useState<number>(0);
  const [weekRevenue, setWeekRevenue] = useState<WeekRevenueType | null>(null);

  const [vehicleDistribution, setVehicleDistribution] = useState<
    VehicleValue[] | null
  >(null);
  const [trafficData, setTrafficData] = useState<TrafficDataType | null>(null);

  const handleGetCurrentVehicle = async () => {
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
        if (!isUnauthorized) {
          const res = await getCheckedInList(newToken);
          if (res.status === 200) {
            const newData: ParkingTicketDBGetType[] = res.data;
            setCurrentVehicle(newData.length);
            return;
          } else if (res.status === 401) {
            isUnauthorized = true;
          } else {
            statusAction(res.status);
            return;
          }
        }
      } while (true);
    } catch (error) {
      toast.error("Server error get current vehicle!");
    }
  };

  const handleGetCurrentSlots = async () => {
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
          setCurrentSlots(newData.length);
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error get current slot!");
    }
  };

  const handleGetCurrentService = async () => {
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
        const res = await getAllServices(newToken);
        if (res.status === 200) {
          const newData: ServiceDBGetType[] = res.data as ServiceDBGetType[];
          return newData;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return null;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error get total service!");
      return null;
    }
  };

  const handleGetServiceRevenue = async () => {
    try {
      const serviceList: ServiceDBGetType[] | null =
        await handleGetCurrentService();

      if (!serviceList) return;

      setCurrentService(serviceList.length);

      const serviceRevenues: ServiceValue[] = [];
      for (const item of serviceList) {
        let isUnauthorized = false;
        let newToken = token;
        do {
          if (isUnauthorized) {
            const isRefreshed = await refreshToken();
            if (!isRefreshed.valid) return;
            newToken = isRefreshed.access_token;
            isUnauthorized = false;
          }
          const res = await getTrafficDataOutByService(newToken, item.id);
          if (res.status === 200) {
            const tempData: TicketCheckoutDBGetType[] = res.data;
            serviceRevenues.push({
              name: item.name,
              value: tempData.reduce(
                (acc, curr) => acc + curr.services[0].cost,
                0
              ),
            });
            // console.log(tempData);
            break;
          } else if (res.status === 401) {
            isUnauthorized = true;
          } else {
            statusAction(res.status);
            return;
          }
        } while (true);
      }
      setServiceRevenue(serviceRevenues);
    } catch (error) {
      toast.error("Server error to get service revenue!");
    }
  };

  const handleGetWeeklyRevenue = async () => {
    try {
      const { firstDay, lastDay, dayArrray, nowTime } = getWeekRange();

      const checkOutHistory: TicketCheckoutDBGetType[] | null =
        await handleGetTrafficDataOut(firstDay, lastDay);

      if (!checkOutHistory) return;

      const weekData: number[] = [];
      for (const day of dayArrray) {
        const dayRevenue = checkOutHistory.filter(
          (item) => item.checkOutTime.slice(0, 10) === day
        );
        weekData.push(
          dayRevenue.reduce(
            (acc, cur) =>
              acc +
              cur.parkingCost +
              cur.services.reduce((acc2, cur2) => acc2 + cur2.cost, 0),
            0
          )
        );
      }

      setWeekRevenue({
        fromDate: formatValueDateString(firstDay),
        toDate: formatValueDateString(dayArrray[6]),
        data: weekData,
      });
      setCurrentRevenue(weekData[dayArrray.indexOf(nowTime)]);
    } catch (error) {
      toast.error("Server error!");
    }
  };

  const handleGetVehicleType = async () => {
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
          const newData: VehicleTypeData[] = res.data;
          return newData;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return null;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error get type list!");
    }
  };

  const handleGetVehicleDistribution = async () => {
    try {
      const typeList = await handleGetVehicleType();
      if (!typeList) return;

      const typeDistribution: VehicleValue[] = [];
      for (const item of typeList) {
        let isUnauthorized = false;
        let newToken = token;
        do {
          if (isUnauthorized) {
            const isRefreshed = await refreshToken();
            if (!isRefreshed.valid) return;
            newToken = isRefreshed.access_token;
            isUnauthorized = false;
          }
          const res = await getVehiclesByType(newToken, item.id);
          if (res.status === 200) {
            typeDistribution.push({
              name: item.name,
              value: res.data.length,
            });
            break;
          } else if (res.status === 401) {
            isUnauthorized = true;
          } else {
            statusAction(res.status);
            return;
          }
        } while (true);
      }
      setVehicleDistribution(typeDistribution);
    } catch (error) {
      toast.error("Server error get type distribution!");
    }
  };

  const handleGetTrafficDataIn = async (fromDate: string, toDate: string) => {
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
        const res = await getTrafficDataIn(newToken, fromDate, toDate);
        if (res.status === 200) {
          return res.data as TicketCheckInDBGetType[];
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return null;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error get checkin list");
      return null;
    }
  };

  const handleGetTrafficDataOut = async (fromDate: string, toDate: string) => {
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
        const res = await getTrafficDataOut(newToken, fromDate, toDate);
        if (res.status === 200) {
          return res.data as TicketCheckoutDBGetType[];
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return null;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error get checkin list");
      return null;
    }
  };

  const handleGetTrafficData = async () => {
    try {
      const { firstDay, lastDay, dayArrray } = getWeekRange();

      const checkInList: TicketCheckInDBGetType[] | null =
        await handleGetTrafficDataIn(firstDay, lastDay);

      if (!checkInList) return;

      // filter data by day
      const dataIn: number[] = [];
      for (let index = 0; index < dayArrray.length; index++) {
        dataIn.push(
          checkInList.filter(
            (item) => item.checkInTime.slice(0, 10) === dayArrray[index]
          ).length
        );
      }

      const checkOutList: TicketCheckoutDBGetType[] | null =
        await handleGetTrafficDataOut(firstDay, lastDay);

      if (!checkOutList) return;

      // filter data by day
      const dataOut: number[] = [];
      for (let index = 0; index < dayArrray.length; index++) {
        dataOut.push(
          checkOutList.filter(
            (item) => item.checkOutTime.slice(0, 10) === dayArrray[index]
          ).length
        );
      }

      setTrafficData({
        dataIn: dataIn,
        dataOut: dataOut,
        fromDate: formatValueDateString(dayArrray[0]),
        toDate: formatValueDateString(dayArrray[6]),
      });
    } catch (error) {
      toast.error("Server error get traffic data!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      handleGetCurrentVehicle();
      handleGetCurrentSlots();
      handleGetServiceRevenue();
      handleGetVehicleDistribution();
      handleGetTrafficData();
      handleGetWeeklyRevenue();
    };
    fetchData();
  }, [reload]);

  return (
    <>
      <BreadcrumbsComponent dir={["Dashboard"]} />
      <PageContentCotainer2>
        {/* Cards for small statistics */}
        <CardsContainer>
          <Card className="w-full h-full">
            <SmallStatisticsContent
              name="Current vehicle"
              value={String(currentVehicle)}
            />
          </Card>
          <Card className="w-full h-full">
            <SmallStatisticsContent
              name="Current available slot"
              value={String(currentSlots - currentVehicle)}
            />
          </Card>
          <Card className="w-full h-full">
            <SmallStatisticsContent
              name="Today revenue"
              value={formatMoney(currentRevenue)}
            />
          </Card>
          <Card className="w-full h-full">
            <SmallStatisticsContent
              name="Total services"
              value={String(currentService)}
            />
          </Card>
          <Button
            name="Refresh"
            className="p-4 h-full font-semibold"
            onClickFunction={() => setReload((prev) => !prev)}
          ></Button>
        </CardsContainer>
        {/* Charts */}
        <ChartSetOuterContainer>
          <ChartSetInnerContainer>
            <InComeAWeek data={weekRevenue} />
            <ServiceRevenueContribution data={serviceRevenue} />
          </ChartSetInnerContainer>
          <ChartSetInnerContainer>
            <VehicleTypeDistribution data={vehicleDistribution} />
            <ParkingTraffic data={trafficData} />
          </ChartSetInnerContainer>
        </ChartSetOuterContainer>
      </PageContentCotainer2>
    </>
  );
}
