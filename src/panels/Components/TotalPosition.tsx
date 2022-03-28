import React from "react";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import Loading from "../../layout/Loading";

export default function TotalPosition({ total }: { total: any }) {
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

  if (!total) {
    return <Loading />;
  }

  return (
    <div>
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
  );
}
