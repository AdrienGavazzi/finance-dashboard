import React, { useEffect, useState } from "react";

import DetailsData from "./DetailsData";

import {
  getActionHistory,
  getCryptoHistory,
  getEtfHistory,
  getPositions,
} from "../../../services/dataService";

export default function EtfPanel() {
  const [position, setPosition] = useState<string[]>([]);
  const [series, setSeries] = useState<string[]>([]);
  const [shortSeries, setShortSeries] = useState<string[]>([]);
  const [deposit, setDeposit] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [shortLabels, setShortLabels] = useState<string[]>([]);
  const [total, setTotal] = useState<string[]>([]);
  const [numberDay, setNumberLabels] = useState<number>(40);
  const [data, setData] = useState<any>();

  useEffect(() => {
    var date1 = new Date();
    var date2 = new Date();

    date1.setDate(date1.getDate() - numberDay);

    getPositions().then((dataPosition: any) => {
      setTotal(dataPosition.total);
      setPosition(dataPosition.position);
      var series: any = [];
      var labels: any = [];
      dataPosition.position.forEach((element: any) => {
        series.push(element.value);
        labels.push(element.name);
      });
      setData({ series, labels });
    });

    getEtfHistory(date1.toLocaleDateString(), date2.toLocaleDateString()).then(
      (data: any) => {
        console.log(data);
        setSeries(data.etfSeries);
        setDeposit(data.etfDepoit);
        setLabels(data.etfLabels);
        setShortSeries(data.etfSeries.slice(-10, numberDay));
        setShortLabels(data.etfLabels.slice(-10, numberDay));
      }
    );
  }, []);

  return (
    <div className="panel-details">
      <DetailsData
        name={"Etf"}
        position={position}
        total={total}
        series={series}
        shortLabels={shortLabels}
        shortSeries={shortSeries}
        deposit={deposit}
        labels={labels}
        data={data}
        numberDay={numberDay}
      />
    </div>
  );
}
