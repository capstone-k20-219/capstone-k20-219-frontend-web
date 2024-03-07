"use client";

import Card from "@/components/Card";
import TableResults from "@/components/TableResults";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Fragment, useEffect, useState } from "react";
import { ServiceRequestData } from "@/lib/type";
import { ServiceName, mockData } from "@/lib/data";
import { useAppSelector } from "@/redux/store";
import NoAccess from "@/components/NoAccess";

export default function EmployeeService() {
  const [serviceList, setServiceList] = useState<string[]>([]);
  const [service, setService] = useState<string>("");
  const [data, setData] = useState<ServiceRequestData[] | null>(null);

  useEffect(() => {
    const serviceListTmp = ServiceName; // use api later to fetch
    setServiceList(serviceListTmp);
    if (serviceList) setService(serviceList[0]);
  }, []);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setService(event.target.value);
  };

  useEffect(() => {
    if (service) {
      const retrieve = mockData[service.toLowerCase()]; // use api later to fetch
      setData(retrieve);
    }
  }, [service]);

  return (
    <Fragment>
      <BreadcrumbsComponent dir={["Service"]} />
      <div className="w-full relative my-6 pt-6 pb-12 flex flex-col gap-6 h-full">
        {service ? (
          <Card className="w-full h-full p-8 px-5 flex flex-col item-center gap-9">
            <form action="">
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                className="min-w-fit"
              >
                <InputLabel id="demo-select-small-label">Service</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={service}
                  label="Service"
                  onChange={handleChangeSelect}
                >
                  {serviceList?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
            <div className="w-full h-full overflow-hidden flex flex-col items-center gap-9">
              {/* Table of results */}
              <TableResults tableType="service_request" data={data} />
            </div>
          </Card>
        ) : (
          <Card className="w-full flex item-center justify-center p-10 text-xl text-neutral-600">
            <h1>The Parking Lot recently provide no service!</h1>
          </Card>
        )}
      </div>
    </Fragment>
  );
}
