"use client";

import Card from "@/components/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { getFeedbacksByName } from "@/lib/actions";
import { FeedbackData } from "@/lib/type";
import toast from "react-hot-toast";
import NoDataFound from "@/components/NoDataFound";
import Rating from "@mui/material/Rating";
import { DataBottomContainer, PageContentContainer } from "./ContainerUI";

type FeedbackListProps = {
  data: FeedbackData[] | null;
};

function FeedbackList({ data }: FeedbackListProps) {
  return (
    <>
      {data && data.length !== 0 ? (
        <div className="w-full h-fit gap-4 pb-2 grid grid-cols-1 md:grid-cols-3">
          {data.map((item, index) => {
            return (
              <Card key={index} className="p-3 shadow-md flex flex-col gap-1">
                <div>
                  <span className="text-md font-semibold mr-2">Anonymous</span>
                  <i className="text-xs">{item.date}</i>
                </div>
                <Rating
                  name="read-only"
                  value={item.rate}
                  readOnly
                  size="small"
                />
                <p className="text-neutral-700 mt-2">{item.content}</p>
              </Card>
            );
          })}
        </div>
      ) : (
        <NoDataFound>
          There is no feedback about this service recently.
        </NoDataFound>
      )}
    </>
  );
}

export default function ManagerFeedbackContent({
  serviceList,
}: {
  serviceList: string[];
}) {
  const [service, setService] = useState(serviceList[0]);
  const [data, setData] = useState<FeedbackData[] | null>(null);

  const handleChangeSelect = (e: SelectChangeEvent) => {
    setService(e.target.value);
  };

  const averageRating = () => {
    if (data === null) return 0;
    const sumRate = data.reduce((prev, curr) => prev + curr.rate, 0);
    return sumRate / data.length;
  };

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const res = await getFeedbacksByName(service);
      if (typeof res !== "string") setData(res);
      else {
        toast.error(res);
      }
    };
    fetchFeedbackData();
  }, [service]);

  return (
    <PageContentContainer>
      <FormControl sx={{ m: 0, minWidth: 120 }} size="small" className="w-full">
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
      <DataBottomContainer>
        <div className="w-full flex gap-4 text-lg font-semibold items-center mb-4">
          <div>Results({data ? data.length : "0"})</div>
          <Rating
            name="half-rating-read"
            defaultValue={1.5}
            precision={0.5}
            value={averageRating()}
            readOnly
          />
        </div>
        <FeedbackList data={data} />
      </DataBottomContainer>
    </PageContentContainer>
  );
}
