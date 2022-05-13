import React, { useEffect, useState } from "react";

import DetailsData from "./DetailsData";

import { getCryptoHistory, getCrypto } from "../../../services/dataService";

export default function CryptoPanel() {
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

    getCrypto().then((dataPosition: any) => {
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

    getCryptoHistory(
      date1.toLocaleDateString(),
      date2.toLocaleDateString()
    ).then((data: any) => {
      console.log(data);
      setSeries(data.cryptoSeries);
      setDeposit(data.cryptoDeposit);
      setLabels(data.cryptoLabels);
      setShortSeries(data.cryptoSeries.slice(-10, numberDay));
      setShortLabels(data.cryptoLabels.slice(-10, numberDay));
    });
  }, []);

  return (
    <div className="panel-details">
      <DetailsData
        name={"Crypto"}
        position={position}
        total={total}
        series={series}
        shortLabels={shortLabels}
        shortSeries={shortSeries}
        deposit={deposit}
        labels={labels}
        data={data}
        numberDay={numberDay}
        colors={["#FC6835", "#FC9235e0"]}
      />
    </div>
  );
}
