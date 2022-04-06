import React from "react";
import Chart from "react-apexcharts";

import Loading from "../../layout/Loading";

export default function ChartComplex({
  data,
  labels,
  titre,
  deposit,
  colors,
}: {
  data: any;
  labels: any;
  titre: any;
  deposit?: any;
  colors?: any;
}) {
  if (data === null || labels === null) {
    return null;
  }

  if (data === undefined || labels === undefined) {
    return <Loading />;
  }

  const series = [
    {
      name: "value",
      data: data,
    },
  ];

  if (deposit) {
    series.push({ name: "Deposit", data: deposit });
  }

  const options: any = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: labels,
    },
    colors: colors ? colors : ["#16ACEA", "#d51a399a"],
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

  return <Chart options={options} series={series} height="100%" width="100%" />;
}
