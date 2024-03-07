"use client";

import Card from "@/components/Card";
import SmallStatisticsContent from "@/components/SmallStatisticsContent";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { Fragment, useEffect } from "react";
import { SmallStatistics } from "@/lib/data";
import InComeAWeek from "../../../../components/InComeAWeek";
import ParkingTraffic from "@/components/ParkingTraffic";
import VehicleTypeDistribution from "@/components/VehicleTypeDistribution";
import ServiceRevenueContribution from "@/components/ServiceRevenueContribution";
import { useDispatch } from "react-redux";
import { onActive } from "@/redux/features/active-slice";

export default function ManagerHome() {
  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Dashboard"]} />
      <div className="mt-5 flex flex-col gap-3 h-full">
        {/* Cards for small statistics */}
        <div className="w-full justify-between items-center flex gap-3">
          {SmallStatistics.map((item, index) => {
            return (
              <Card key={index + Math.random() * 100} className="w-full h-full">
                <SmallStatisticsContent {...item} />
              </Card>
            );
          })}
        </div>
        {/* Charts */}
        <div className="flex flex-col gap-3 text-xs h-full w-full pb-12 overflow-auto">
          {/* mocked UI */}
          <div className="w-full min-h-80 md:max-h-[342px] items-center gap-3 flex flex-col md:flex-row">
            <InComeAWeek />
            <ServiceRevenueContribution />
          </div>
          {/* mocked UI */}
          <div className="w-full min-h-80 md:max-h-[342px] items-center gap-3 flex flex-col md:flex-row">
            <VehicleTypeDistribution />
            <ParkingTraffic />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
