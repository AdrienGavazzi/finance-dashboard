import React from "react";

import Loading from "../../../layout/Loading";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

import { ChangeCell, DefaultCell } from "./utilsComponents";

export default function PositionGrid({ position }: { position: any }) {
  return (
    <>
      {!position && <Loading />}
      <Grid
        data={position}
        style={{
          opacity: position ? "1" : "0",
          fontSize: "13px",
        }}
        className="panel-position"
      >
        <GridColumn title="Symbol" field="symbol" locked={true} width={70} />
        <GridColumn title="Name" field="name" width={170} />
        <GridColumn title="Change" field="variation" cell={ChangeCell} />
        <GridColumn title="Price" field="price" cell={DefaultCell} />
        <GridColumn title="Volume" field="number" />
        <GridColumn title="Value" field="value" cell={DefaultCell} />
      </Grid>
    </>
  );
}
