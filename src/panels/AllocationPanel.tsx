import React from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels, //ChartTitle,
  ChartTooltip,
} from "@progress/kendo-react-charts";

import Loading from "../layout/Loading";

const labelContent = (e: any) => `${e.value}%`;

const renderTooltip = (e: any) => {
  return <div>{e.point ? e.point.category : ""}</div>;
};

export default function AllocationPanel({ data }: { data: any }) {
  return (
    <>
      {!data && <Loading />}
      <Chart style={{ opacity: data ? "1" : "0" }}>
        <ChartSeries>
          <ChartSeriesItem type="donut" data={data}>
            <ChartSeriesLabels
              content={labelContent}
              background="none"
              color="#fff"
            />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend position={"bottom"} visible={true} />
        <ChartTooltip render={renderTooltip} />
      </Chart>
    </>
  );
}
