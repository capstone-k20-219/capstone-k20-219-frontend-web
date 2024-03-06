"use client";
import Card from "@/components/Card";
import React from "react";
import ReactECharts from "echarts-for-react";

export default function InComeAWeek() {
  const option = {
    title: {
      text: "Revenue this week ($)",
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
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };
  return (
    <Card className="min-w-[450px] w-full h-full p-5 flex flex-col gap-6 items-center md:w-4/5">
      <ReactECharts option={option} className="w-full h-full" />
    </Card>
  );
}
