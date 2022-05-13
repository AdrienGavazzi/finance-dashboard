import React from "react";
import Loading from "../../../layout/Loading";
import AllocationDonut from "../AllocationDonut";
import PerformanceLine from "../PerformanceLine";
import PositionResum from "../PositionResum";
import PositionTable from "../PositionTable";
import TotalPosition from "../TotalPosition";

export default function DetailsData({
  name,
  position,
  total,
  series,
  deposit,
  labels,
  shortSeries,
  shortLabels,
  data,
  numberDay,
  colors,
}: {
  name: any;
  position: any;
  total: any;
  series: any;
  deposit: any;
  labels: any;
  shortSeries: any;
  shortLabels: any;
  data: any;
  numberDay: any;
  colors: any;
}) {
  if (!name || !position || !total || !series || !labels || !numberDay) {
    return <Loading />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="panel-flex">
        <div className="panel-details-position">
          <div className="panel-info-data">
            <PositionTable position={position} isComplex={true} />
          </div>
          <div
            className="panel-info-total"
            style={{
              backgroundImage:
                "linear-gradient(to right bottom, " +
                colors[0] +
                ", " +
                colors[1] +
                ")",
            }}
          >
            <TotalPosition
              total={total}
              data={shortSeries}
              categories={shortLabels}
            />
          </div>
          <div className="panel-info-resum">
            <PositionResum
              numberDay={10}
              firstValue={shortSeries[0]}
              lastValue={total}
            />
          </div>
        </div>
        <div className="panel-details-allocation">
          <AllocationDonut data={data} />
        </div>
      </div>
      <div className="panel-flex" style={{ height: "100%" }}>
        <div className="panel-details-performance">
          <PerformanceLine
            data={series}
            categories={labels}
            deposits={deposit}
          />
        </div>
      </div>
    </div>
  );
}
