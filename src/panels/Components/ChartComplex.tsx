import React from "react";
import Chart from "react-apexcharts";

import Loading from "../../layout/Loading";

export default function ChartComplex({
  data,
  labels,
  titre,
}: {
  data: any;
  labels: any;
  titre: any;
}) {
  if (!data || !labels) {
    return <Loading />;
  }

  const series = [
    {
      name: "value",
      data: data,
    },
  ];
  const options: any = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: labels,
    },
    colors: ["#16ACEA"],
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
    <div style={{ position: "relative" }}>
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
          {titre}
        </p>
      </div>
    </div>
  );
}
