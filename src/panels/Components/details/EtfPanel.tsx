import React, { useEffect, useState } from "react";
import DetailsData from "./DetailsData";

export default function EtfPanel() {
  const [position, setPosition] = useState<string[]>([]);
  const [series, setSeries] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [total, setTotal] = useState<string[]>([]);
  const [numberDay, setNumberLabels] = useState<number>(10);

  useEffect(() => {}, []);

  return (
    <div className="panel-details">
      <DetailsData
        name={"Etf"}
        position={[]}
        total={{}}
        series={[]}
        labels={[]}
        numberDay={numberDay}
      />
    </div>
  );
}
