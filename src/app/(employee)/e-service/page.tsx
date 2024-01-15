"use client";

//Assets
import Home from "../../../img/home-outline.png";

//Libraries
import Card from "../_ui/Card";
import TableResults from "../_ui/TableResults";
import Image from "next/image";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

//Define

export default function EmployeeService() {
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
      <div className="w-full relative my-6 pt-6 pb-12 flex flex-col gap-6 h-full">
        <Card className="w-full h-full p-8 px-5">
          <div className="w-full h-full overflow-hidden flex flex-col items-center gap-9">
            {/* Table of results */}
            <TableResults />
          </div>
        </Card>
      </div>
    </div>
  );
}
