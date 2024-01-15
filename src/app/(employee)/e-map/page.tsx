"use client";

import Home from "../../../img/home-outline.png";

import Card from "../_ui/Card";
import Image from "next/image";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

export default function Emplpoyee() {
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
        ,<Typography key="2">Service</Typography>
      </Breadcrumbs>
      <div className="w-full relative my-6 pt-6 pb-12 h-full flex gap-3">
        <Card className="w-full h-full p-5">
          <img
            className="w-full h-full"
            src="https://via.placeholder.com/713x678"
          />
        </Card>
      </div>
    </div>
  );
}
