"use client";
import React from "react";
import Card from "@/components/Card";
import ReactECharts from "echarts-for-react";
import {
  ServiceValue,
  TrafficDataType,
  VehicleValue,
  WeekRevenueType,
} from "@/lib/type";

type ChartProps = {
  option: any;
  widthConfig: "small" | "big";
};

function Chart({ option, widthConfig }: ChartProps) {
  let widthClass = "";
  if (widthConfig === "small") {
    widthClass = "min-w-[400px] md:w-1/5";
  } else {
    widthClass = "min-w-[450px] md:w-4/5";
  }
  return (
    <Card
      className={`w-full h-full p-5 flex flex-col gap-6 items-center ${widthClass}`}
    >
      <ReactECharts option={option} className="w-full h-full" />
    </Card>
  );
}

function ChartSkeleton({ widthConfig }: { widthConfig: "small" | "big" }) {
  let widthClass = "";
  if (widthConfig === "small") {
    widthClass = "min-w-[400px] md:w-1/5";
  } else {
    widthClass = "min-w-[450px] md:w-4/5";
  }
  return (
    <div
      className={`bg-neutral-200 rounded-[10px] w-full h-full p-5 animate-pulse ${widthClass}`}
    ></div>
  );
}

function ParkingTraffic({ data }: { data: TrafficDataType | null }) {
  const option = {
    title: {
      text: "Parking lot traffic this week",
      subtext: `${data?.fromDate} - ${data?.toDate}`,
      textStyle: {
        fontWeight: 600,
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      orient: "horizontal",
      left: "60%",
      right: "8%",
      top: "0%",
    },
    grid: {
      left: "5%",
      right: "7%",
      bottom: "2%",
      top: "26%",
      containLabel: true,
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Check-in",
        type: "bar",
        barGap: 0,
        emphasis: {
          focus: "series",
        },
        data: data?.dataIn,
      },
      {
        name: "Check-out",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        data: data?.dataOut,
      },
    ],
  };

  return (
    <>
      {data ? (
        <Chart option={option} widthConfig="big" />
      ) : (
        <ChartSkeleton widthConfig="big" />
      )}
    </>
  );
}

function InComeAWeek({ data }: { data: WeekRevenueType | null }) {
  const option = {
    title: {
      text: "Revenue this week ($)",
      subtext: `${data?.fromDate} - ${data?.toDate}`,
      textStyle: {
        fontWeight: 600,
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "2%",
      top: "26%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Revenue",
        data: data?.data,
        type: "line",
      },
    ],
  };
  return (
    <>
      {data ? (
        <Chart option={option} widthConfig="big" />
      ) : (
        <ChartSkeleton widthConfig="big" />
      )}
    </>
  );
}

function ServiceRevenueContribution({ data }: { data: ServiceValue[] | null }) {
  const dataOption = {
    legendData: data?.map((item) => item.name), // legend
    data: data ? data : [],
  };
  const option = {
    title: {
      text: "Services Revenue ($)",
      left: "center",
      textStyle: {
        fontWeight: 600,
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      left: "5%",
      top: "25%",
      bottom: "20%",
      data: dataOption.legendData,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["70%", "55%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [...dataOption.data],
      },
    ],
  };

  return (
    <>
      {data ? (
        <Chart option={option} widthConfig="small" />
      ) : (
        <ChartSkeleton widthConfig="small" />
      )}
    </>
  );
}

function VehicleTypeDistribution({ data }: { data: VehicleValue[] | null }) {
  const dataOption = {
    legendData: data?.map((item) => item.name), // legend
    data: data ? data : [],
  };
  const option = {
    title: {
      text: "Vehicle Distribution",
      left: "center",
      textStyle: {
        fontWeight: 600,
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: "8%",
      top: "20%",
      bottom: "20%",
      data: dataOption.legendData,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["30%", "55%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [...dataOption.data],
      },
    ],
  };

  return (
    <>
      {data ? (
        <Chart option={option} widthConfig="small" />
      ) : (
        <ChartSkeleton widthConfig="small" />
      )}
    </>
  );
}

export {
  InComeAWeek,
  ParkingTraffic,
  VehicleTypeDistribution,
  ServiceRevenueContribution,
};
