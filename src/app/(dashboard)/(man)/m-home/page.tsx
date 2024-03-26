"use client";

import Card from "@/components/Card";
import SmallStatisticsContent from "@/components/SmallStatisticsContent";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { SmallStatistics } from "@/lib/data";
import {
  InComeAWeek,
  ParkingTraffic,
  ServiceRevenueContribution,
  VehicleTypeDistribution,
} from "@/components/BigStatisticsContent";
import { PageContentCotainer2 } from "@/components/ContainerUI";

function CardsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full justify-between items-center flex gap-3">
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
    <div className="w-full min-h-80 md:max-h-[342px] items-center gap-3 flex flex-col md:flex-row">
      {children}
    </div>
  );
}

export default function ManagerHome() {
  return (
    <>
      <BreadcrumbsComponent dir={["Dashboard"]} />
      <PageContentCotainer2>
        {/* Cards for small statistics */}
        <CardsContainer>
          {SmallStatistics.map((item, index) => {
            return (
              <Card key={index + Math.random() * 100} className="w-full h-full">
                <SmallStatisticsContent {...item} />
              </Card>
            );
          })}
        </CardsContainer>
        {/* Charts */}
        <ChartSetOuterContainer>
          <ChartSetInnerContainer>
            <InComeAWeek />
            <ServiceRevenueContribution />
          </ChartSetInnerContainer>
          <ChartSetInnerContainer>
            <VehicleTypeDistribution />
            <ParkingTraffic />
          </ChartSetInnerContainer>
        </ChartSetOuterContainer>
      </PageContentCotainer2>
    </>
  );
}
