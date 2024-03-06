"use client";
import React from "react";
import Card from "./Card";
import ReactECharts from "echarts-for-react";

type BarLabelOption = NonNullable<echarts.BarSeriesOption["label"]>;
const labelOption: BarLabelOption = {
  show: true,
  position: "insideBottom",
  distance: 10,
  align: "left",
  verticalAlign: "middle",
  rotate: 90,
  formatter: "{c}  {name|{a}}",
  fontSize: 10,
  rich: {
    name: {},
  },
};

export default function ParkingTraffic() {
  const option = {
    title: {
      text: "Parking lot traffic this week",
      subtext: "22/11/2023 - 22/3/2024",
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
        data: [320, 332, 301, 334, 390, 390, 390],
      },
      {
        name: "Check-out",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 290, 290],
      },
    ],
  };

  return (
    <Card className="min-w-[450px] w-full h-full p-5 flex flex-col gap-6 items-center md:w-4/5">
      <ReactECharts option={option} className="w-full h-full" />
    </Card>
  );
}
