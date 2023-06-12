import React from "react";
import { Allocation, DonutData, Position } from "./data/models";

//import InfoPanel from "./panels/InfoPanel";
import AllocationDonut from "./panels/Components/AllocationDonut";
import DetailFund from "./panels/Components/DetailFund";
import PerformanceLine from "./panels/Components/PerformanceLine";
import PositionsPanel2 from "./panels/PositionsPanel2";
import {
  getPositions,
  getActions,
  getRealEstate,
  getCrypto,
  getValuePourcent,
  getPerformanceHistory,
} from "./services/dataService";

export default function Dashboard() {
  const [data, setData] = React.useState<DonutData[]>();
  const [data2, setData2] = React.useState<string[]>();
  const [categories, setCategories] = React.useState<string[]>();
  const [deposits, setDeposits] = React.useState<string[]>();
  const [positions, setPositions] = React.useState<Position[]>();
  const [total, setTotal] = React.useState<any>();
  const [actions, setActions] = React.useState<Position[]>();
  const [totalAction, setTotalAction] = React.useState<any>();
  const [cryptos, setCryptos] = React.useState<Position[]>();
  const [totalCrypto, setTotalCrytpo] = React.useState<any>();
  const [realEstate, setRealEstate] = React.useState<Position[]>();
  const [totalRealEstate, setTotalRealEstate] = React.useState<any>();
  const [allocationFund, setAllocationFund] = React.useState<any>();

  React.useEffect(() => {
    
    document.title = 'Dashboard';
    getInfo();

    const interval = setInterval(() => {
      getInfo();
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  async function getInfo() {
    //    getFundAllocation().then((data: any) => {
    //      setData(data);
    //    });

    var list: any = [];
    var labels: any = [];

    getPerformanceHistory().then((results: any) => {
      setData2(results.perf);
      setCategories(results.categories);
      setDeposits(results.deposits);
    });

    getPositions().then((dataPosition: any) => {
      setPositions(dataPosition.position);
      setTotal(dataPosition.total);
      labels.push("Etf " + dataPosition.total.total + "€");
      list.push({
        value: 0,
        total: dataPosition.total.total,
      });
      setAllocationFund({ labels, series: getValuePourcent(list) });
    });

    getActions().then((dataAction: any) => {
      setActions(dataAction.position);
      setTotalAction(dataAction.total);
      labels.push("Action " + dataAction.total.total + "€");
      list.push({
        value: 0,
        total: dataAction.total.total,
      });
      setAllocationFund({ labels, series: getValuePourcent(list) });
    });

    getRealEstate().then((dataRealEstate: any) => {
      setRealEstate(dataRealEstate.position);
      setTotalRealEstate(dataRealEstate.total);
      labels.push("Real Estate " + dataRealEstate.total.total + "€");
      list.push({
        value: 0,
        total: dataRealEstate.total.total,
      });
      setAllocationFund({ labels, series: getValuePourcent(list) });
    });

    getCrypto().then((dataCrypto: any) => {
      setCryptos(dataCrypto.position);
      setTotalCrytpo(dataCrypto.total);
      labels.push("Crypto " + dataCrypto.total.total + "€");
      list.push({
        value: 0,
        total: dataCrypto.total.total,
      });
      setAllocationFund({ labels, series: getValuePourcent(list) });
    });
  }

  return (
    <div className="panels">
      <div className="panel-first">
        <div className="panel-positions">
          <PositionsPanel2
            positions={positions}
            total={total}
            actions={actions}
            totalAction={totalAction}
            realEstate={realEstate}
            totalRealEstate={totalRealEstate}
            cryptos={cryptos}
            totalCrypto={totalCrypto}
          />
        </div>
      </div>
      <div className="panel-second">
        <div className="panel-allocation">
          <DetailFund total={data2} deposit={deposits} />
          <div className="panel-allocation-fund">
            <AllocationDonut data={allocationFund} />
          </div>
        </div>
        <div className="panel-balance">
          <PerformanceLine
            data={data2}
            categories={categories}
            deposits={deposits}
          />
        </div>
      </div>
    </div>
  );
}
