import React from "react";

import Loading from "../../layout/Loading";

export default function DetailFund({
  total,
  deposit,
}: {
  total: any;
  deposit: any;
}) {
  if (!total || !deposit) {
    return <Loading />;
  }

  var variation = Number(
    (
      ((total[total.length - 1] - deposit[deposit.length - 1]) /
        deposit[deposit.length - 1]) *
      100
    ).toFixed(1)
  );

  return (
    <div className="panel-fund-detail">
      <p className="panel-fund-detail-title">Fund</p>
      <div className="panel-fund-detail-text">
        <p style={{ fontSize: "15px" }}>Total: </p>
        <p style={{ fontSize: "15px" }}>{total[total.length - 1]} €</p>
      </div>
      <div className="panel-fund-detail-text">
        <p style={{ fontSize: "15px" }}>Deposit: </p>
        <p style={{ fontSize: "15px" }}>{deposit[deposit.length - 1]} €</p>
      </div>
      <div
        className="panel-fund-detail-text"
        style={
          variation > 0
            ? {
                backgroundImage:
                  "linear-gradient(to right bottom, #57CA22, #91CA22e0)",
                marginTop: "20px",
                padding: "10px 15px",
              }
            : {
                backgroundImage:
                  "linear-gradient(to right bottom, #FF0000, #ff0000e0)",
                marginTop: "20px",
                padding: "10px 15px",
              }
        }
      >
        <p style={{ fontSize: "15px" }}>Variation: </p>
        <p style={{ fontSize: "15px" }}>
          {variation > 0 ? " +" + variation + "%" : variation + "%"}
        </p>
      </div>
    </div>
  );
}
