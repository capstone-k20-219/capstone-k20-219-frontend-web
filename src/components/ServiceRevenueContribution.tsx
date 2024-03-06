"use client";
import React from "react";
import Card from "./Card";
import ReactECharts from "echarts-for-react";

export default function ServiceRevenueContribution() {
  const data = {
    legendData: ["Washing", "Charging", "Maintaining", "Parking"], // legend
    data: [
      { value: 3448, name: "Washing" },
      { value: 1735, name: "Charging" },
      { value: 280, name: "Maintaining" },
      { value: 4560, name: "Parking" },
    ],
  };
  const option = {
    title: {
      text: "Services Revenue",
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
      data: data.legendData,
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
        data: [...data.data],
      },
    ],
  };

  return (
    <Card className="min-w-[400px] w-full h-full p-5 flex flex-col gap-6 items-center md:w-1/5">
      <ReactECharts option={option} className="w-full h-full" />
    </Card>
  );
}
