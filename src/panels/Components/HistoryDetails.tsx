import React, { useEffect, useState } from "react";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import Loading from "../../layout/Loading";
import { calculDetails } from "../../utils/utils";

export default function HistoryDetails({
  data,
  labels,
  deposit,
}: {
  data: any;
  labels: any;
  deposit?: any;
}) {
  var infos: any = null;

  if (data && labels) {
    infos = calculDetails(data, labels, deposit);
  }

  if (!data || !labels) {
    return <Loading />;
  }

  const TrendingIcon = () => {
    if (infos.endValue > infos.startValue) {
      return (
        <TrendingUpIcon
          className="icon"
          sx={{ fontSize: 25 }}
          style={{
            backgroundColor: "#ffffffe0",
            color: "#388116",
            marginRight: "10px",
          }}
        />
      );
    } else {
      return (
        <TrendingDownIcon
          className="icon"
          sx={{ fontSize: 25 }}
          style={{
            backgroundColor: "#ffffffe0",
            color: "red",
            marginRight: "10px",
          }}
        />
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div className="panel-history-details-header">
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "50%",
            }}
          >
            <div style={{ flex: 1 }}>
              <p
                className="text-overlay"
                style={{ margin: "1.5vh auto 10px auto" }}
              >
                Open
              </p>
              <p>{infos.startValue}€</p>
            </div>
            <div
              style={{
                width: "2px",
                height: "70%",
                marginTop: "8%",
                backgroundColor: "#00000025",
              }}
            />
            <div style={{ flex: 1 }}>
              <p
                className="text-overlay"
                style={{ margin: "1.5vh auto 10px auto" }}
              >
                Close
              </p>
              <p>{infos.endValue}€</p>
            </div>
          </div>
        </div>
        <div
          className="panel-history-details-header-div"
          style={{
            flex: 1,
            backgroundImage:
              infos.value > 0
                ? "linear-gradient(to right bottom, #57CA22, #91CA22e0)"
                : "linear-gradient(to right bottom, #d51a39, #d51a39e0)",
          }}
        >
          <p>{infos.value > 0 ? "+" + infos.value : infos.value} €</p>
          <p>
            <TrendingIcon />
            {infos.variation > 0
              ? "+" + infos.variation + "%"
              : infos.variation + "%"}
          </p>
        </div>
      </div>
      <div className="panel-history-details-body">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "50%",
          }}
        >
          <div style={{ flex: 1 }}>
            <p className="text-overlay">Min</p>
            <p>{infos.min}€</p>
          </div>
          <div
            style={{
              width: "2px",
              height: "70%",
              marginTop: "0%",
              backgroundColor: "#00000025",
            }}
          />
          <div style={{ flex: 1 }}>
            <p className="text-overlay">Max</p>
            <p>{infos.max}€</p>
          </div>
        </div>
        <div
          style={{ overflowY: "auto", height: "100%" }}
          className="scroll-bar"
        >
          {infos.listDeposit.map((element: any, index: number) => {
            return (
              <p key={index}>
                Deposed {element.deposit}€ the {element.date}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
