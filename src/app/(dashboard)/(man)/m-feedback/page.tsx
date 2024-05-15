"use client";

import Card from "@/components/Card";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent";
import { PageContentCotainer3 } from "@/components/ContainerUI";
import { getAllServices } from "@/lib/services/services";
import toast from "react-hot-toast";
import { OptionType, ServiceDBGetType } from "@/lib/type";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect } from "react";
import { FeedbackData } from "@/lib/type";
import NoDataFound from "@/components/NoDataFound";
import Rating from "@mui/material/Rating";
import {
  DataBottomContainer,
  PageContentContainer,
} from "@/components/ContainerUI";
import { Stack, Pagination } from "@mui/material";
import {
  deleteFeedbackById,
  getFeedbackByService,
} from "@/lib/services/feedback";
import Button from "@/components/Button";
import { MdDelete } from "react-icons/md";
import { eliminateSpecialChars, statusAction } from "@/lib/helpers";
import useToken from "@/lib/hooks/refresh-token";
import {
  FeedbackBoardSkeleton,
  ResultsFeedbackSkeleton,
} from "@/components/Skeleton";
import usePagination from "@/lib/hooks/pagination";

type FeedbackListProps = {
  data: FeedbackData[];
  onDeleteFeedback: (id: string) => void;
};

function FeedbackList({ data, onDeleteFeedback }: FeedbackListProps) {
  return (
    <>
      {data.length ? (
        <div className="w-full h-fit gap-4 pb-2 flex flex-col">
          {data.map((item, index) => {
            return (
              <Card key={index} className="p-3 shadow-md flex flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2 items-end">
                    <span className="text-md font-semibold line-clamp-1">
                      Anonymous{item.user.id}
                    </span>
                    <i className="text-xs">{item.createdAt.slice(0, 10)}</i>
                    <Rating
                      name="read-only"
                      value={item.rating}
                      readOnly
                      size="small"
                    />
                  </div>
                  <Button
                    icon={<MdDelete />}
                    className="p-1"
                    onClickFunction={() => onDeleteFeedback(item.id)}
                  />
                </div>
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

function ManagerFeedbackContent({ service }: { service: string }) {
  const { refreshToken, token } = useToken();
  const [data, setData] = useState<FeedbackData[] | null>(null);

  const {
    currentPage,
    currentRecords,
    recordsPerPage,
    setCurrentPage,
    handleChangePage,
    handleDecreasePage,
  } = usePagination<FeedbackData>({ data: data, pageSize: 4 });

  const averageRating = () => {
    if (data === null) return 0;
    const sumRate = data.reduce((prev, curr) => prev + curr.rating, 0);
    return sumRate / data.length;
  };

  const handleDeleteFeedback = async (feedbackId: string) => {
    // call some action to delete in DB
    try {
      const newID = eliminateSpecialChars(feedbackId);
      if (!newID) {
        toast.error("Cannot delete feedback with id empty.");
        return;
      }

      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await deleteFeedbackById(newToken, newID);
        if (res.status === 200) {
          const deletedData = data
            ? data.filter((item) => item.id !== newID)
            : null;
          const deletedDatav2 = currentRecords.filter(
            (item) => item.id !== newID
          );
          if (!deletedDatav2.length) handleDecreasePage();
          setData(deletedData);
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error!");
    }
  };

  const handleGetFeedback = async (serviceId: string) => {
    try {
      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await getFeedbackByService(newToken, serviceId);
        if (res.status === 200) {
          const newData: FeedbackData[] = res.data as FeedbackData[];
          setData(newData);
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error!");
    }
  };

  useEffect(() => {
    if (service) {
      setData(null);
      handleGetFeedback(service);
      setCurrentPage(1);
    }
  }, [service]);

  return (
    <>
      {data ? (
        <>
          <DataBottomContainer className="overflow-auto">
            <div className="w-full flex gap-4 text-lg font-semibold items-center mb-4">
              <div>Results({data.length})</div>
              <Rating
                name="half-rating-read"
                defaultValue={1.5}
                precision={0.5}
                value={averageRating()}
                readOnly
              />
            </div>
            <FeedbackList
              data={currentRecords}
              onDeleteFeedback={handleDeleteFeedback}
            />
          </DataBottomContainer>
          {data.length > recordsPerPage && (
            <Stack mt={"auto"}>
              <Pagination
                defaultPage={1}
                count={Math.ceil(data.length / recordsPerPage)}
                shape="rounded"
                page={currentPage}
                onChange={handleChangePage}
              />
            </Stack>
          )}
        </>
      ) : (
        <ResultsFeedbackSkeleton />
      )}
    </>
  );
}

export default function EmployeeFeedback() {
  const { refreshToken, token } = useToken();
  const [serviceList, setServiceList] = useState<OptionType[] | null>(null);
  const [serviceFilter, setServiceFilter] = useState("");

  const handleChangeSelect = (e: SelectChangeEvent) => {
    setServiceFilter(e.target.value);
  };

  const handleGetData = async () => {
    try {
      let isUnauthorized = false;
      let newToken = token;
      do {
        if (isUnauthorized) {
          const isRefreshed = await refreshToken();
          if (!isRefreshed.valid) return;
          newToken = isRefreshed.access_token;
          isUnauthorized = false;
        }
        const res = await getAllServices(newToken);
        if (res.status === 200) {
          const newData: ServiceDBGetType[] = res.data as ServiceDBGetType[];
          setServiceList(
            newData.map((item) => ({
              value: item.id,
              name: item.name,
            }))
          );
          setServiceFilter(newData.length ? newData[0].id : "");
          return;
        } else if (res.status === 401) {
          isUnauthorized = true;
        } else {
          statusAction(res.status);
          return;
        }
      } while (true);
    } catch (error) {
      toast.error("Server error!");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      <BreadcrumbsComponent dir={["Feedback Management"]} />
      {serviceList ? (
        serviceList.length ? (
          <PageContentContainer>
            <FormControl
              sx={{ m: 0, minWidth: 120 }}
              size="small"
              className="w-full"
            >
              <InputLabel id="demo-select-small-label">Service</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={serviceFilter}
                label="Service"
                name="service-name"
                onChange={handleChangeSelect}
              >
                {serviceList.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ManagerFeedbackContent service={serviceFilter} />
          </PageContentContainer>
        ) : (
          <PageContentCotainer3>
            <Card className="w-full flex item-center justify-center p-10 text-xl text-neutral-700">
              <h1>The parking lot recently provide no service!</h1>
            </Card>
          </PageContentCotainer3>
        )
      ) : (
        <PageContentContainer>
          <FeedbackBoardSkeleton />
        </PageContentContainer>
      )}
    </>
  );
}
