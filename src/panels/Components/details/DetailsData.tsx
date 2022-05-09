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
  labels,
  numberDay,
}: {
  name: any;
  position: any;
  total: any;
  series: any;
  labels: any;
  numberDay: any;
}) {
  if (!name || !position || !total || !series || !labels || !numberDay) {
    return <Loading />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="panel-flex">
        <div className="panel-details-position">
          <div className="panel-info-data">
            <PositionTable position={position} />
          </div>
          <div
            className="panel-info-total"
            style={{
              backgroundImage:
                "linear-gradient(to right bottom, #0093E9, #80C5D0e0)",
            }}
          >
            <TotalPosition total={total} data={series} categories={labels} />
          </div>
          <div className="panel-info-resum">
            <PositionResum
              numberDay={numberDay}
              firstValue={series[0]}
              lastValue={total}
            />
          </div>
        </div>
        <div className="panel-details-allocation">
          <AllocationDonut data={[]} />
        </div>
      </div>
      <div className="panel-flex">
        <div className="panel-balance">
          <PerformanceLine data={[]} categories={[]} deposits={[]} />
        </div>
      </div>
    </div>
  );
}
