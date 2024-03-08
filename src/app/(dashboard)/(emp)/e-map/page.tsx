"use client";

import Card from "@/components/Card";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { Fragment } from "react";

export default function EmplpoyeeMap() {
  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Map"]} />
      <div className="mt-5 w-full h-full overflow-hidden pb-10">
        <Card className="w-full h-full p-4 shadow-md overflow-hidden border-neutral-500/40">
          <div
            className="w-full h-full border 
            border-neutral-500/50 rounded-md overflow-auto"
          >
            <div className="min-w-full min-h-full w-auto h-auto">...</div>
          </div>
        </Card>
      </div>
    </Fragment>
  );
}
