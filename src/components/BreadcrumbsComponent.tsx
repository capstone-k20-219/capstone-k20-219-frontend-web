"use client";

import Home from "@/img/home-outline.png";

import Image from "next/image";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { IoHomeOutline } from "react-icons/io5";

export default function BreadcrumbsComponent({ dir }: { dir?: string[] }) {
  let keyNum = 1;
  return (
    <Breadcrumbs
      separator="›"
      aria-label="breadcrumb"
      className="text-black text-opacity-70 font-medium"
    >
      <Typography key={keyNum++} className="flex gap-2 !text-sm">
        <IoHomeOutline style={{ width: 20, height: 20 }} />
        Home
      </Typography>
      {dir?.map((item) => (
        <Typography key={keyNum++} className="!text-sm">
          {item}
        </Typography>
      ))}
    </Breadcrumbs>
  );
}
