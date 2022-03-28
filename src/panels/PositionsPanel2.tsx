import React from "react";

import Loading from "../layout/Loading";

import PositionTable from "./Components/PositionTable";
import TotalPosition from "./Components/TotalPosition";

import "../styles/styles.css";

export default function PositionsPanel2({
  positions,
  total,
  actions,
  totalAction,
  realEstate,
  totalRealEstate,
  cryptos,
  totalCrypto,
}: {
  positions: any;
  total: any;
  actions: any;
  totalAction: any;
  realEstate: any;
  totalRealEstate: any;
  cryptos: any;
  totalCrypto: any;
}) {
  return (
    <>
      <div className="panel-info">
        <div className="panel-info-data">
          <PositionTable position={positions} />
        </div>
        <div
          className="panel-info-total"
          style={{
            backgroundImage:
              "linear-gradient(to right bottom, #0093E9, #80C5D0e0)",
          }}
        >
          <TotalPosition total={total} />
        </div>
      </div>
      <div className="panel-info">
        <div className="panel-info-data">
          <PositionTable position={actions} />
        </div>
        <div
          className="panel-info-total"
          style={{
            backgroundImage:
              "linear-gradient(to right bottom, #57CA22, #91CA22e0)",
          }}
        >
          <TotalPosition total={totalAction} />
        </div>
      </div>
      <div className="panel-info">
        <div className="panel-info-data">
          <PositionTable position={cryptos} />
        </div>
        <div
          className="panel-info-total"
          style={{
            backgroundImage:
              "linear-gradient(to right bottom, #fcd535, #FCEC35e0)",
          }}
        >
          <TotalPosition total={totalCrypto} />
        </div>
      </div>
    </>
  );
}
