import React from "react";
import Chart from "react-apexcharts";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import Loading from "../../layout/Loading";

export default function TotalPosition({
  total,
  data,
  categories,
}: {
  total: any;
  data: any;
  categories: any;
}) {
  if (!total) {
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
      id: "chartTotal",
      type: "line",
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      brush: {
        target: "chartTotal",
        enabled: true,
      },
    },
    xaxis: {
      categories: categories,
    },
    colors: ["#fff"],
    stroke: {
      width: 3,
      curve: "smooth",
    },
    legend: {
      show: false,
    },
  };

  const TrendingIcon = () => {
    if (total.total > total.totalinvest) {
      return (
        <TrendingUpIcon
          className="icon"
          sx={{ fontSize: 25 }}
          style={{ backgroundColor: "#ffffffe0", color: "#388116" }}
        />
      );
    } else {
      return (
        <TrendingDownIcon
          className="icon"
          sx={{ fontSize: 25 }}
          style={{ backgroundColor: "#ffffffe0", color: "red" }}
        />
      );
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ float: "left" }}>
        <h3>{total.finance}</h3>
        <p className="price">{total.total} €</p>
        <p
          style={{
            margin: "-12px auto 10px 5px",
            fontSize: "14px",
            opacity: "0.8",
          }}
        >
          {total.totalinvest} €
        </p>
        <p style={{ marginLeft: "5px", fontSize: "18px" }}>
          {TrendingIcon()} {total.variation} %
        </p>
      </div>
      <div className="panel-info-total-chart">
        <Chart options={options} series={series} width="60%" height="80%" />
      </div>
    </div>
  );
}
