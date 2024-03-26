"use client";
import React from "react";
import Card from "@/components/Card";
import ReactECharts from "echarts-for-react";

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

function ParkingTraffic() {
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

  return <Chart option={option} widthConfig="big" />;
}

function InComeAWeek() {
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
  return <Chart option={option} widthConfig="big" />;
}

function ServiceRevenueContribution() {
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

  return <Chart option={option} widthConfig="small" />;
}

function VehicleTypeDistribution() {
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

  return <Chart option={option} widthConfig="small" />;
}

export {
  InComeAWeek,
  ParkingTraffic,
  VehicleTypeDistribution,
  ServiceRevenueContribution,
};
