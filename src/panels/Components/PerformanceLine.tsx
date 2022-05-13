import React from "react";
import Chart from "react-apexcharts";

import Loading from "../../layout/Loading";

export default function PerformanceLine({
  data,
  categories,
  deposits,
}: {
  data: any;
  categories: any;
  deposits?: any;
}) {
  if (!data || !categories) {
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
      sparkline: {
        enabled: true,
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
    },
    colors: ["#16ACEA", "#d51a399a"],
    stroke: {
      width: [2.5, 2.5],
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
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div className="panel-charteline">
        <div style={{ margin: "2% 0.5%", height: "100%" }}>
          <Chart options={options} series={series} width="100%" height="100%" />
        </div>
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
