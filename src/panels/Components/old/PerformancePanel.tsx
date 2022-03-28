import React from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
} from "@progress/kendo-react-charts";
import { LineStyle } from "@progress/kendo-react-charts/dist/npm/field-types/line-style";

import Loading from "../../../layout/Loading";

export default function PerformancePanel({
  data,
  categories,
  deposits,
}: {
  data: any;
  categories: any;
  deposits: any;
}) {
  const [styleLine, setStyleLine] = React.useState<LineStyle>("smooth");

  return (
    <>
      {!data && <Loading />}
      <Chart style={{ opacity: data ? "1" : "0" }}>
        <ChartValueAxis>
          <ChartValueAxisItem min={2000} />
        </ChartValueAxis>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem
            markers={{
              visible: false,
            }}
            type="line"
            data={data}
            color="#33C4FF"
            style={styleLine}
          />
          <ChartSeriesItem
            markers={{
              visible: false,
            }}
            type="line"
            data={deposits}
            color="#FF334C"
            style={styleLine}
          />
        </ChartSeries>
      </Chart>
    </>
  );
}
