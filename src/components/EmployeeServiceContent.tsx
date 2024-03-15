"use client";

import React from "react";
import Card from "./Card";
import TableResults from "@/components/TableResults";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { getServiceReservationsByName } from "@/lib/actions";
import { ServiceRequestData } from "@/lib/type";
import toast from "react-hot-toast";

export default function EmployeeServiceContent({
  serviceList,
}: {
  serviceList: string[];
}) {
  const [service, setService] = useState(serviceList[0]);
  const [data, setData] = useState<ServiceRequestData[] | null>(null);

  const handleChangeSelect = (e: SelectChangeEvent) => {
    setService(e.target.value);
  };

  useEffect(() => {
    const fetchServiceData = async () => {
      const res = await getServiceReservationsByName(service);
      if (typeof res !== "string") setData(res);
      else {
        toast.error(res);
      }
    };
    fetchServiceData();
  }, [service]);

  return (
    <Card className="w-full h-full p-8 px-6 flex flex-col item-center gap-6">
      <FormControl
        sx={{ m: 0, minWidth: 120 }}
        size="small"
        className="min-w-fit"
      >
        <InputLabel id="demo-select-small-label">Service</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={service as string}
          label="Service"
          name="service-name"
          onChange={handleChangeSelect}
        >
          {serviceList.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="w-full h-full overflow-hidden flex flex-col items-center gap-9">
        {/* Table of results */}
        <TableResults tableType="service_request" data={data} />
      </div>
    </Card>
  );
}
