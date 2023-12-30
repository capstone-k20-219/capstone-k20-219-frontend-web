"use client";

export default function Manager() {
  return (
    <>
      <div className="MenuItem left-[344px] top-[136px] absolute justify-center items-center gap-1.5 inline-flex">
        <div className="Home1 w-6 h-6 relative">
          <div className="Group w-6 h-[23.90px] left-0 top-[24px] absolute"></div>
        </div>
        <div className="Home text-black text-opacity-70 text-base font-medium font-['Inter']">
          Home
        </div>
        <div className=" text-black text-opacity-70 text-base font-medium font-['Inter']"></div>
        <div className="Dashboard text-black text-opacity-70 text-base font-medium font-['Inter']">
          Dashboard
        </div>
      </div>
      <div className="Analytics w-[1032px] left-[344px] top-[206px] absolute justify-between items-center inline-flex">
        <div className="TotalIncome w-[180px] h-24 p-[18px] bg-white rounded-lg shadow border border-gray-200 flex-col justify-between items-start inline-flex">
          <div className="CurrentParkingVehicle text-zinc-500 text-xs font-medium font-['Inter']">
            Current parking vehicle
          </div>
          <div className=" text-zinc-800 text-lg font-semibold font-['Inter']">
            60
          </div>
        </div>
        <div className="TotalIncome w-[180px] h-24 p-[18px] bg-white rounded-lg shadow border border-gray-200 flex-col justify-between items-start inline-flex">
          <div className="CurrentAvailableSlot text-zinc-500 text-xs font-medium font-['Inter']">
            Current available slot
          </div>
          <div className=" text-zinc-800 text-lg font-semibold font-['Inter']">
            34
          </div>
        </div>
        <div className="TotalIncome w-[180px] h-24 p-[18px] bg-white rounded-lg shadow border border-gray-200 flex-col justify-between items-start inline-flex">
          <div className="TodayBooking text-zinc-500 text-xs font-medium font-['Inter']">
            Today booking{" "}
          </div>
          <div className=" text-zinc-800 text-lg font-semibold font-['Inter']">
            12
          </div>
        </div>
        <div className="TotalIncome w-[180px] h-24 p-[18px] bg-white rounded-lg shadow border border-gray-200 flex-col justify-between items-start inline-flex">
          <div className="YesterdayRevenue text-zinc-500 text-xs font-medium font-['Inter']">
            Yesterday revenue
          </div>
          <div className="97499 text-zinc-800 text-lg font-semibold font-['Inter']">
            $974,99
          </div>
        </div>
        <div className="TotalIncome w-[180px] h-24 p-[18px] bg-white rounded-lg shadow border border-gray-200 flex-col justify-between items-start inline-flex">
          <div className="TotalService w-[85px] text-zinc-500 text-xs font-medium font-['Inter']">
            Total service
          </div>
          <div className=" text-zinc-800 text-lg font-semibold font-['Inter']">
            5
          </div>
        </div>
      </div>
      <div className="Group91 left-[344px] top-[352px] absolute">
        <div className="Frame128 w-[1032px] h-[334px] left-0 top-[310px] absolute justify-start items-start gap-6 inline-flex">
          <div className="PieVehicleType w-[452px] h-[334px] relative">
            <div className="Rectangle582 w-[452px] h-[334px] left-0 top-0 absolute bg-white rounded-[10px] shadow border border-black border-opacity-10" />
            <div className="Group112 w-[388px] h-[294px] left-[32px] top-[20px] absolute">
              <div className="VehicleTypeDistribution left-[96px] top-0 absolute text-center text-black text-base font-bold font-['Inter']">
                Vehicle type distribution
              </div>
              <div className="Frame133 w-[388px] h-[255px] left-0 top-[39px] absolute justify-start items-center gap-5 inline-flex">
                <div className="Group92 w-[245px] h-[245px] relative">
                  <div className="Ellipse12 w-[245px] h-[245px] left-0 top-0 absolute bg-rose-500 rounded-full" />
                  <div className="Ellipse14 w-[245px] h-[245px] left-0 top-0 absolute bg-green-400 rounded-full" />
                  <div className="Ellipse13 w-[245px] h-[245px] left-0 top-0 absolute bg-blue-400 rounded-full" />
                </div>
                <div className="Frame102 p-2.5 flex-col justify-start items-start gap-5 inline-flex">
                  <div className="Frame101 justify-center items-center gap-3 inline-flex">
                    <div className="Rectangle587 w-5 h-5 bg-rose-500" />
                    <div className="Motobike text-black text-base font-normal font-['Inter']">
                      Motobike
                    </div>
                  </div>
                  <div className="Frame102 justify-center items-center gap-3 inline-flex">
                    <div className="Rectangle587 w-5 h-5 bg-blue-400" />
                    <div className="Car text-black text-base font-normal font-['Inter']">
                      Car
                    </div>
                  </div>
                  <div className="Frame103 justify-center items-center gap-3 inline-flex">
                    <div className="Rectangle587 w-5 h-5 bg-green-400" />
                    <div className="Truck text-black text-base font-normal font-['Inter']">
                      Truck
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Group111 w-[556px] h-[334px] relative">
            <div className="Rectangle585 w-[556px] h-[334px] left-0 top-0 absolute bg-white rounded-[10px] shadow" />
            <div className="Group115 w-[391px] h-[296.19px] left-[83px] top-[19px] absolute">
              <div className="Group114 w-[391px] h-[244px] left-0 top-[52.19px] absolute">
                <div className="Group113 w-[244px] h-[244px] left-[147px] top-0 absolute">
                  <div className="Ellipse18 w-[244px] h-[244px] left-0 top-0 absolute bg-red-400 rounded-full" />
                  <div className="Ellipse20 w-[244px] h-[244px] left-0 top-0 absolute bg-blue-400 rounded-full" />
                  <div className="Ellipse19 w-[244px] h-[244px] left-0 top-0 absolute bg-green-400 rounded-full" />
                </div>
                <div className="Frame103 w-[136px] h-[120px] p-2.5 left-0 top-[62px] absolute flex-col justify-start items-end gap-5 inline-flex">
                  <div className="Frame101 justify-center items-center gap-3 inline-flex">
                    <div className="Washing text-black text-base font-normal font-['Inter']">
                      Washing
                    </div>
                    <div className="Rectangle587 w-5 h-5 bg-rose-500" />
                  </div>
                  <div className="Frame102 justify-center items-center gap-3 inline-flex">
                    <div className="Charging text-black text-base font-normal font-['Inter']">
                      Charging
                    </div>
                    <div className="Rectangle587 w-5 h-5 bg-blue-400" />
                  </div>
                  <div className="Frame103 justify-center items-center gap-3 inline-flex">
                    <div className="Truck text-black text-base font-normal font-['Inter']">
                      Maintaning
                    </div>
                    <div className="Rectangle587 w-5 h-5 bg-green-400" />
                  </div>
                </div>
              </div>
              <div className="RevenueContributionByService w-[259px] h-[28.19px] left-[52px] top-0 absolute text-center text-black text-base font-bold font-['Inter']">
                Revenue contribution by service
              </div>
            </div>
          </div>
        </div>
        <div className="Frame129 w-[1032px] h-[286px] left-0 top-0 absolute justify-start items-start gap-6 inline-flex">
          <div className="Group89 w-[556px] h-[286px] relative">
            <div className="Rectangle583 w-[556px] h-[286px] left-0 top-0 absolute bg-white rounded-[10px] shadow border border-black border-opacity-10" />
            <div className="Group105 w-[486px] h-[242px] left-[35px] top-[22px] absolute">
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
                    <div className="Mon text-center text-black text-base font-normal font-['Inter']">
                      Mon
                    </div>
                    <div className="Tue text-center text-black text-base font-normal font-['Inter']">
                      Tue
                    </div>
                    <div className="Wed text-center text-black text-base font-normal font-['Inter']">
                      Wed
                    </div>
                    <div className="Thu text-center text-black text-base font-normal font-['Inter']">
                      Thu
                    </div>
                    <div className="Fri text-center text-black text-base font-normal font-['Inter']">
                      Fri
                    </div>
                    <div className="Sat text-center text-black text-base font-normal font-['Inter']">
                      Sat
                    </div>
                    <div className="Sun text-center text-black text-base font-normal font-['Inter']">
                      Sun
                    </div>
                  </div>
                </div>
                <div className="Frame126 w-[30px] h-[148px] left-0 top-[14px] absolute flex-col justify-start items-center gap-6 inline-flex">
                  <div className=" text-center text-black text-base font-normal font-['Inter']">
                    200
                  </div>
                  <div className=" text-center text-black text-base font-normal font-['Inter']">
                    150
                  </div>
                  <div className=" text-center text-black text-base font-normal font-['Inter']">
                    100
                  </div>
                  <div className=" text-center text-black text-base font-normal font-['Inter']">
                    50
                  </div>
                </div>
              </div>
              <div className="Frame127 w-[485px] h-[19px] left-[1px] top-0 absolute justify-between items-baseline inline-flex">
                <div className="Revenue text-black text-base font-bold font-['Inter']">
                  Revenue
                </div>
                <div className="ThisWeek text-black text-base font-bold font-['Inter']">
                  This week
                </div>
              </div>
            </div>
          </div>
          <div className="Group107 w-[452px] h-[286px] relative">
            <div className="Rectangle586 w-[452px] h-[286px] left-0 top-0 absolute bg-white rounded-[10px] shadow" />
            <div className="Group110 w-[403px] h-[257.95px] left-[25px] top-[28.05px] absolute">
              <div className="ParkingLotTraffic12102023 w-[267.36px] h-[25.39px] left-[68.80px] top-0 absolute text-center text-black text-base font-bold font-['Inter']">
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
                  <div className="In text-center text-black text-base font-bold font-['Inter']">
                    In{" "}
                  </div>
                  <div className="Out text-center text-black text-base font-bold font-['Inter']">
                    Out
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
