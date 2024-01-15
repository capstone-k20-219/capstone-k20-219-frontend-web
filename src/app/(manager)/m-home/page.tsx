"use client";

//Assets
import Home from "../../../img/home-outline.png";

//Libraries
import Card from "../_ui/Card";
import SmallStatisticsContent from "../_ui/SmallStatisticsContent";
import Image from "next/image";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

//Define

const SmallStatistics = [
  {
    name: "Current parking vehicle",
    value: "60",
  },
  {
    name: "Current available slot",
    value: "34",
  },
  {
    name: "Today booking",
    value: "12",
  },
  {
    name: "Yesterday revenue",
    value: "$974,99",
  },
  {
    name: "Total service",
    value: "5",
  },
];

export default function Manager() {
  return (
    <div className="Content w-full h-full px-16 pt-6 pb-12 overflow-hidden">
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        className="text-black text-opacity-70 text-base font-medium"
      >
        <Typography key="1" className="flex gap-2">
          <Image src={Home} alt="home-icon" className="w-6 h-6" />
          Home
        </Typography>
        ,<Typography key="2">Dashboard</Typography>
      </Breadcrumbs>
      <div className="Content overflow-auto my-6 pt-6 pb-12 flex flex-col gap-6 h-full">
        {/* Cards for small statistics */}
        <div className="w-full justify-between items-center flex">
          {SmallStatistics.map((item, index) => {
            return (
              <Card key={index + Math.random() * 100}>
                <SmallStatisticsContent {...item} />
              </Card>
            );
          })}
        </div>
        {/* Charts */}
        <div className="flex flex-col gap-6">
          {/* mocked UI */}
          <div className="Frame129 w-full h-[286px] justify-between items-center gap-6 flex">
            <Card className="min-w-[556px] w-3/5 h-full relative">
              <div className="Group105 w-full h-[242px] left-[35px] top-[22px] absolute">
                <div className="Group106 w-[486px] h-[207px] left-0 top-[35px] absolute">
                  <div className="Frame125 w-[451px] h-[207px] left-[35px] top-0 absolute flex-col justify-start items-center gap-3 inline-flex">
                    <div className="Frame123 flex-col justify-start items-start gap-6 flex">
                      <div className="Rectangle588 w-[451px] h-px bg-zinc-300" />
                      <div className="Rectangle589 w-[451px] h-px bg-zinc-300" />
                      <div className="Rectangle590 w-[451px] h-px bg-zinc-300" />
                      <div className="Rectangle591 w-[451px] h-px bg-zinc-300" />
                      <div className="Rectangle592 w-[451px] h-px bg-zinc-300" />
                      <div className="Rectangle593 w-[451px] h-px bg-zinc-300" />
                      <div className="Rectangle594 w-[451px] h-px bg-zinc-300" />
                      <div className="Rectangle595 w-[451px] h-px bg-zinc-300" />
                    </div>
                    <div className="Frame124 w-[380px] justify-between items-center inline-flex">
                      <div className="Mon text-center text-black text-base font-normal ">
                        Mon
                      </div>
                      <div className="Tue text-center text-black text-base font-normal ">
                        Tue
                      </div>
                      <div className="Wed text-center text-black text-base font-normal ">
                        Wed
                      </div>
                      <div className="Thu text-center text-black text-base font-normal ">
                        Thu
                      </div>
                      <div className="Fri text-center text-black text-base font-normal ">
                        Fri
                      </div>
                      <div className="Sat text-center text-black text-base font-normal ">
                        Sat
                      </div>
                      <div className="Sun text-center text-black text-base font-normal ">
                        Sun
                      </div>
                    </div>
                  </div>
                  <div className="Frame126 w-[30px] h-[148px] left-0 top-[14px] absolute flex-col justify-start items-center gap-6 inline-flex">
                    <div className=" text-center text-black text-base font-normal ">
                      200
                    </div>
                    <div className=" text-center text-black text-base font-normal ">
                      150
                    </div>
                    <div className=" text-center text-black text-base font-normal ">
                      100
                    </div>
                    <div className=" text-center text-black text-base font-normal ">
                      50
                    </div>
                  </div>
                </div>
                <div className="Frame127 w-[485px] h-[19px] left-[1px] top-0 absolute justify-between items-baseline inline-flex">
                  <div className="Revenue text-black text-base font-bold ">
                    Revenue
                  </div>
                  <div className="ThisWeek text-black text-base font-bold ">
                    This week
                  </div>
                </div>
              </div>
            </Card>
            <Card className="min-w-[452px] w-2/5 h-full relative">
              <div className="Group110 w-[403px] h-[257.95px] left-[25px] top-[28.05px] absolute">
                <div className="ParkingLotTraffic12102023 w-[267.36px] h-[25.39px] left-[68.80px] top-0 absolute text-center text-black text-base font-bold ">
                  Parking lot traffic - 12/10/2023
                </div>
                <div className="Frame131 w-[403px] h-[211.17px] left-0 top-[46.78px] absolute flex-col justify-start items-center gap-3 inline-flex">
                  <div className="Group109 w-[282.50px] h-[127px] relative">
                    <div className="Rectangle597 w-[282.50px] h-[127px] left-0 top-0 absolute bg-white border-l border-b border-black border-opacity-50" />
                    <div className="Group108 w-[175px] h-[97px] left-[54px] top-[30px] absolute">
                      <div className="Rectangle598 w-[65px] h-[97px] left-0 top-0 absolute bg-red-400" />
                      <div className="Rectangle599 w-[65px] h-[70px] left-[110px] top-[27px] absolute bg-green-400" />
                    </div>
                  </div>
                  <div className="Frame130 w-[125px] justify-between items-center inline-flex">
                    <div className="In text-center text-black text-base font-bold ">
                      In{" "}
                    </div>
                    <div className="Out text-center text-black text-base font-bold ">
                      Out
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          {/* mocked UI */}
          <div className="Frame128 w-full h-[286px] justify-between items-center gap-6 flex">
            <Card className="min-w-[452px] w-2/5 h-full relative p-5 flex flex-col gap-6 items-center">
              <div className="VehicleTypeDistribution text-center text-black text-base font-bold ">
                Vehicle type distribution
              </div>
              <div className="Frame133 justify-start items-center gap-5 flex">
                <div className="Group92 w-[180px] h-[180px] relative">
                  <div className="Ellipse12 w-[180px] h-[180px] bg-rose-500 rounded-full" />
                </div>
                <div className="Frame102 p-2.5 flex-col justify-start items-start gap-5 inline-flex">
                  <div className="Frame101 justify-center items-center gap-3 inline-flex">
                    <div className="Rectangle587 w-5 h-5 bg-rose-500" />
                    <div className="Motobike text-black text-base font-normal ">
                      Motobike
                    </div>
                  </div>
                  <div className="Frame102 justify-center items-center gap-3 inline-flex">
                    <div className="Rectangle587 w-5 h-5 bg-blue-400" />
                    <div className="Car text-black text-base font-normal ">
                      Car
                    </div>
                  </div>
                  <div className="Frame103 justify-center items-center gap-3 inline-flex">
                    <div className="Rectangle587 w-5 h-5 bg-green-400" />
                    <div className="Truck text-black text-base font-normal ">
                      Truck
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="min-w-[556px] w-3/5 h-full relative p-5 flex flex-col gap-6 items-center">
              <div className="RevenueContributionByService text-center text-black text-base font-bold ">
                Revenue contribution by service
              </div>
              <div className="Group114 justify-start items-center gap-5 flex flex-row-reverse">
                <div className="Group113 w-[180px] h-[180px] relative">
                  <div className="Ellipse18 w-[180px] h-[180px] bg-red-500 rounded-full" />
                </div>
                <div className="Frame103 w-[136px] h-[120px] p-2.5 flex-col justify-start items-end gap-5 inline-flex">
                  <div className="Frame101 justify-center items-center gap-3 inline-flex">
                    <div className="Washing text-black text-base font-normal ">
                      Washing
                    </div>
                    <div className="Rectangle587 w-5 h-5 bg-rose-500" />
                  </div>
                  <div className="Frame102 justify-center items-center gap-3 inline-flex">
                    <div className="Charging text-black text-base font-normal ">
                      Charging
                    </div>
                    <div className="Rectangle587 w-5 h-5 bg-blue-400" />
                  </div>
                  <div className="Frame103 justify-center items-center gap-3 inline-flex">
                    <div className="Truck text-black text-base font-normal ">
                      Maintaning
                    </div>
                    <div className="Rectangle587 w-5 h-5 bg-green-400" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
