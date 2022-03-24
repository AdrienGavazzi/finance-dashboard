import React from "react";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";

import Loading from "../layout/Loading";

const NumberCell = (props: GridCellProps) => {
  const field = props.field || "";
  const startingValue = props.dataItem[field];
  let finalValue = (startingValue / 1000000).toFixed(2) + "M";
  if (startingValue > 1000000000) {
    finalValue = (startingValue / 1000000000).toFixed(2) + "B";
  }

  return <td>{finalValue}</td>;
};

const ChangeCell = (props: GridCellProps) => {
  const field = props.field || "";
  const value = props.dataItem[field];
  return <td className={value > 0 ? "change-up" : "change-down"}>{value}%</td>;
};

const DefaultCell = (props: GridCellProps) => {
  const field = props.field || "";
  const value = props.dataItem[field];
  return <td>{Number(value).toFixed(2)}</td>;
};

export default function PositionsPanel({
  positions,
  total,
  actions,
  totalAction,
  realEstate,
  totalRealEstate,
  crypto,
  totalCrypto,
}: {
  positions: any;
  total: any;
  actions: any;
  totalAction: any;
  realEstate: any;
  totalRealEstate: any;
  crypto: any;
  totalCrypto: any;
}) {
  return (
    <>
      {!positions && <Loading />}
      <div className="panel-etf">
        <Grid data={total} style={{ opacity: total ? "1" : "0" }}>
          <GridColumn title="Board" field="finance" locked={true} width={70} />
          <GridColumn title="In bourse" field="bourse" cell={DefaultCell} />
          <GridColumn title="Money" field="money" cell={DefaultCell} />
          <GridColumn title="Total" field="total" cell={DefaultCell} />
          <GridColumn
            title="Total Invest"
            field="totalinvest"
            cell={DefaultCell}
          />
          <GridColumn title="Variation" field="variation" cell={ChangeCell} />
        </Grid>
        <Grid
          data={positions}
          style={{ opacity: positions ? "1" : "0" }}
          className="panel-position"
        >
          <GridColumn title="Symbol" field="symbol" locked={true} width={70} />
          <GridColumn title="Name" field="name" width={180} />
          <GridColumn title="% Change" field="variation" cell={ChangeCell} />
          <GridColumn title="Volume" field="number" />
          <GridColumn title="Value" field="value" cell={DefaultCell} />
          <GridColumn title="Price" field="price" cell={DefaultCell} />
        </Grid>
      </div>
      <div className="panel-action">
        <Grid data={totalAction} style={{ opacity: totalAction ? "1" : "0" }}>
          <GridColumn title="Board" field="finance" locked={true} width={90} />
          <GridColumn title="Total" field="total" cell={DefaultCell} />
          <GridColumn
            title="Total Invest"
            field="totalinvest"
            cell={DefaultCell}
          />
          <GridColumn title="Variation" field="variation" cell={ChangeCell} />
        </Grid>
        <Grid
          data={actions}
          style={{ opacity: actions ? "1" : "0" }}
          className="panel-position"
        >
          <GridColumn title="Symbol" field="symbol" locked={true} width={90} />
          <GridColumn title="Name" field="name" width={140} />
          <GridColumn title="% Change" field="variation" cell={ChangeCell} />
          <GridColumn title="Volume" field="number" />
          <GridColumn title="Value" field="value" cell={DefaultCell} />
          <GridColumn title="Price" field="price" cell={DefaultCell} />
        </Grid>

        <Grid
          data={totalCrypto}
          style={{ opacity: totalCrypto ? "1" : "0" }}
          className="panel-position"
        >
          <GridColumn title="Board" field="finance" locked={true} width={90} />
          <GridColumn title="Total" field="total" cell={DefaultCell} />
          <GridColumn
            title="Total Invest"
            field="totalinvest"
            cell={DefaultCell}
          />
          <GridColumn title="Variation" field="variation" cell={ChangeCell} />
        </Grid>
        <Grid
          data={crypto}
          style={{ opacity: actions ? "1" : "0" }}
          className="panel-crypto"
        >
          <GridColumn title="Symbol" field="symbol" locked={true} width={90} />
          <GridColumn title="Name" field="name" width={140} />
          <GridColumn title="% Change" field="variation" cell={ChangeCell} />
          <GridColumn title="Volume" field="number" />
          <GridColumn title="Value" field="value" cell={DefaultCell} />
          <GridColumn title="Price" field="price" cell={DefaultCell} />
        </Grid>
      </div>
      <div className="panel-immo">
        <Grid
          data={totalRealEstate}
          style={{ opacity: totalRealEstate ? "1" : "0" }}
        >
          <GridColumn title="Board" field="finance" locked={true} width={90} />
          <GridColumn title="Total" field="total" cell={DefaultCell} />
          <GridColumn
            title="Total Invest"
            field="totalinvest"
            cell={DefaultCell}
          />
          <GridColumn title="Variation" field="variation" cell={ChangeCell} />
        </Grid>
        <Grid
          data={realEstate}
          style={{ opacity: realEstate ? "1" : "0" }}
          className="panel-position"
        >
          <GridColumn title="Symbol" field="symbol" locked={true} width={90} />
          <GridColumn title="Name" field="name" width={180} />
          <GridColumn title="% Change" field="variation" cell={ChangeCell} />
          <GridColumn title="Volume" field="number" />
          <GridColumn title="Value" field="value" cell={DefaultCell} />
          <GridColumn title="Price" field="price" cell={DefaultCell} />
        </Grid>
      </div>
    </>
  );
}
