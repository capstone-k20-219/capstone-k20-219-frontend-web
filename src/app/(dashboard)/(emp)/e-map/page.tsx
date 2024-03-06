"use client";

import Card from "@/components/Card";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { Fragment } from "react";

export default function EmplpoyeeMap() {
  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Map"]} />
      <div className="w-full relative my-6 pt-6 pb-12 h-full flex gap-3">
        <Card className="w-full h-full p-5">
          <img
            className="w-full h-full"
            src="https://via.placeholder.com/713x678"
          />
        </Card>
      </div>
    </Fragment>
  );
}
