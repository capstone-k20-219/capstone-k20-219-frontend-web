import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import LoadingIcon from "@/components/LoadingIcon";
import React, { Fragment } from "react";

export default function LoadingUI() {
  return (
    <Fragment>
      <BreadcrumbsComponent />
      <div
        className="mt-5 h-full w-full pb-12 rounded-lg 
      bg-neutral-500 opacity-50 flex items-center justify-center"
      >
        <LoadingIcon />
      </div>
    </Fragment>
  );
}
