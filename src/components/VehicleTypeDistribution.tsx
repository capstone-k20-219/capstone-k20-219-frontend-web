"use client";
import React, { useRef } from "react";
import Card from "./Card";
import ReactECharts from "echarts-for-react";

export default function VehicleTypeDistribution() {
  const data = {
    legendData: ["Car", "Bicycle", "Truck", "E-car", "Motorcycle"], // legend
    data: [
      { value: 1048, name: "Car" },
      { value: 735, name: "Bicycle" },
      { value: 580, name: "Truck" },
      { value: 580, name: "E-car" },
      { value: 580, name: "Motorcycle" },
    ],
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
