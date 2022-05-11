import React, { useEffect, useState } from "react";

import Loading from "../layout/Loading";

import PositionTable from "./Components/PositionTable";
import TotalPosition from "./Components/TotalPosition";
import PositionResum from "./Components/PositionResum";

import "../styles/styles.css";
import { getFundHistoryDates } from "../services/dataService";

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
  const [etfSeries, setEtfSeries] = useState<string[]>([]);
  const [etfLabels, setEtfLabels] = useState<string[]>([]);
  const [actionSeries, setActionsSeries] = useState<string[]>([]);
  const [actionLabels, setActionsLabels] = useState<string[]>([]);
  const [cryptoSeries, setCryptoSeries] = useState<string[]>([]);
  const [cryptoLabels, setCryptoLabels] = useState<string[]>([]);
  const [numberDay, setNumberLabels] = useState<number>(10);

  useEffect(() => {
    var dateStart = new Date();
    var dateEnd = new Date();
    dateStart.setDate(dateStart.getDate() - numberDay);
    getFundHistoryDates(
      dateStart.toLocaleDateString(),
      dateEnd.toLocaleDateString()
    ).then((data: any) => {
      setEtfSeries(data.etf.etfSeries);
      setEtfLabels(data.etf.etfLabels);
      setActionsSeries(data.action.actionSeries);
      setActionsLabels(data.action.actionLabels);
      setCryptoSeries(data.crypto.cryptoSeries);
      setCryptoLabels(data.crypto.cryptoLabels);
    });
  }, []);

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
          <TotalPosition
            total={total}
            data={etfSeries}
            categories={etfLabels}
          />
        </div>
        <div className="panel-info-resum">
          <PositionResum
            numberDay={numberDay}
            firstValue={etfSeries[0]}
            lastValue={total}
          />
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
          <TotalPosition
            total={totalAction}
            data={actionSeries}
            categories={actionLabels}
          />
        </div>
        <div className="panel-info-resum">
          <PositionResum
            numberDay={numberDay}
            firstValue={actionSeries[0]}
            lastValue={totalAction}
          />
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
              "linear-gradient(to right bottom, #FC6835, #FC9235e0)",
          }}
        >
          <TotalPosition
            total={totalCrypto}
            data={cryptoSeries}
            categories={cryptoLabels}
          />
        </div>
        <div className="panel-info-resum">
          <PositionResum
            numberDay={numberDay}
            firstValue={cryptoSeries[0]}
            lastValue={totalCrypto}
          />
        </div>
      </div>
    </>
  );
}
