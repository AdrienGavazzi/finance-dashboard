import React from "react";
import Chart from "react-apexcharts";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import Loading from "../../layout/Loading";

export default function PerformanceLine({
  data,
  categories,
  deposits,
}: {
  data: any;
  categories: any;
  deposits: any;
}) {
  if (!data || !categories || !deposits) {
    return <Loading />;
  }

  const series = [
    {
      name: "value",
      data: data,
    },
    {
      name: "deposit",
      data: deposits,
    },
  ];
  const options: any = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      min: 2100,
    },
    colors: ["#16ACEA", "#D71B3B"],
    stroke: {
      width: [3, 3],
      curve: "smooth",
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
  };

  return (
    <div style={{ position: "relative", height: "40vh" }}>
      <div className="panel-charteline">
        <Chart options={options} series={series} width="99%" height="350px" />
      </div>
      <div className="panel-chartelineOverlay">
        <p
          style={{
            margin: "5px auto auto 10px",
            fontSize: "22px",
            color: "#ffffff",
          }}
        >
          Performance
        </p>
      </div>
    </div>
  );
}
