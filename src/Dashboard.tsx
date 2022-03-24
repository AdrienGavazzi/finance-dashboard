import React from "react";
import { Allocation, Position } from "./data/models";

//import InfoPanel from "./panels/InfoPanel";
import AllocationPanel from "./panels/AllocationPanel";
import PerformancePanel from "./panels/PerformancePanel";
import PositionsPanel from "./panels/PositionsPanel";
import {
  getFundAllocation,
  getPerformance,
  getPositions,
  getActions,
  getRealEstate,
  getCrypto,
  getValuePourcent,
} from "./services/dataService";

export default function Dashboard() {
  const [data, setData] = React.useState<Allocation[]>();
  const [data2, setData2] = React.useState<string[]>();
  const [categories, setCategories] = React.useState<string[]>();
  const [deposits, setDeposits] = React.useState<string[]>();
  const [positions, setPositions] = React.useState<Position[]>();
  const [total, setTotal] = React.useState<any>();
  const [actions, setActions] = React.useState<Position[]>();
  const [totalAction, setTotalAction] = React.useState<any>();
  const [crypto, setCrypto] = React.useState<Position[]>();
  const [totalCrypto, setTotalCrytpo] = React.useState<any>();
  const [realEstate, setRealEstate] = React.useState<Position[]>();
  const [totalRealEstate, setTotalRealEstate] = React.useState<any>();
  const [allocationFund, setAllocationFund] = React.useState<[]>([]);

  React.useEffect(() => {
    getFundAllocation().then((data: Allocation[]) => {
      setData(data);
    });

    var list: any = [];

    getPerformance().then((results: any) => {
      setData2(results.perf);
      setCategories(results.categories);
      setDeposits(results.deposits);
    });

    getPositions().then((dataPosition: any) => {
      setPositions(dataPosition.position);
      setTotal(dataPosition.total);
      list.push({
        category: "Etf " + dataPosition.total[0].total + "€",
        value: 0,
        total: dataPosition.total[0].total,
      });
      setAllocationFund(getValuePourcent(list));
    });

    getActions().then((dataAction: any) => {
      setActions(dataAction.position);
      setTotalAction(dataAction.total);
      list.push({
        category: "Action " + dataAction.total[0].total + "€",
        value: 0,
        total: dataAction.total[0].total,
      });
      setAllocationFund(getValuePourcent(list));
    });

    getRealEstate().then((dataRealEstate: any) => {
      setRealEstate(dataRealEstate.position);
      setTotalRealEstate(dataRealEstate.total);
      list.push({
        category: "Real Estate " + dataRealEstate.total[0].total + "€",
        value: 0,
        total: dataRealEstate.total[0].total,
      });
      setAllocationFund(getValuePourcent(list));
    });

    getCrypto().then((dataCrypto: any) => {
      setCrypto(dataCrypto.position);
      setTotalCrytpo(dataCrypto.total);
      list.push({
        category: "Crypto " + dataCrypto.total[0].total + "€",
        value: 0,
        total: dataCrypto.total[0].total,
      });
      setAllocationFund(getValuePourcent(list));
    });
  }, []);

  return (
    <div className="panels">
      <div className="panel-first">
        <div className="panel-positions">
          <PositionsPanel
            positions={positions}
            total={total}
            actions={actions}
            totalAction={totalAction}
            realEstate={realEstate}
            totalRealEstate={totalRealEstate}
            crypto={crypto}
            totalCrypto={totalCrypto}
          />
        </div>
      </div>
      <div className="panel-second">
        <div className="panel-allocation">
          <AllocationPanel data={data} />
        </div>
        <div className="panel-allocation">
          <AllocationPanel data={allocationFund} />
        </div>
        <div className="panel-balance">
          <PerformancePanel
            data={data2}
            categories={categories}
            deposits={deposits}
          />
        </div>
      </div>
    </div>
  );
}
