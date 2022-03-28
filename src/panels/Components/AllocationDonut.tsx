import React from "react";
import Chart from "react-apexcharts";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import Loading from "../../layout/Loading";

export default function AllocationDonut({ data }: { data: any }) {
  if (!data) {
    return <Loading />;
  }

  const series = data.series;
  const options: any = {
    chart: {
      type: "donut",
    },
    labels: data.labels,
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <div className="panel-donut">
        <Chart
          options={options}
          series={series}
          type="donut"
          width="100%"
          height="100%"
        />
      </div>
      <div className="panel-donut-overlay">
        <p
          style={{
            margin: "5px auto auto 10px",
            fontSize: "22px",
            color: "#ffffff",
          }}
        >
          Allocation
        </p>
      </div>
    </div>
  );
}
