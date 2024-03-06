"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import SmallStatisticsContent from "@/components/SmallStatisticsContent";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { useAppSelector } from "@/redux/store";
import { Fragment } from "react";

export default function ManagerMap() {
  const role = useAppSelector((state) => state.authReducer.value.role);
  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Map"]} />
      <div className="Content mt-5 flex flex-col gap-3 h-full overflow-auto">
        <div
          className="w-full items-center grid gap-3 grid-flow-row sm:grid-flow-col
        sm:grid-cols-3"
        >
          <Card className="h-full w-full">
            <SmallStatisticsContent name="Total slots" value="120" />
          </Card>
          <Card className="h-full w-full">
            <SmallStatisticsContent
              name="Parking lot status"
              value="Still in business"
            />
          </Card>
          <Button name="Edit Map" className="p-5 font-bold w-full h-full" />
        </div>
        <div className="w-full h-full overflow-hidden pb-8">
          <Card className="w-full h-full p-4 overflow-hidden">
            <div
              className="w-full h-full border 
            border-neutral-400/40 rounded-md overflow-auto"
            >
              <div className="min-w-full min-h-full w-auto h-auto">...</div>
            </div>
          </Card>
        </div>
      </div>
    </Fragment>
  );
}
