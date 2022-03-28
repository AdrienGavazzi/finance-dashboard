import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ChangeCell, DefaultCell } from "./utilsComponents";

export default function OtherGrid({
  totalCrypto,
  crypto,
  totalRealEstate,
  realEstate,
}: {
  totalCrypto: any;
  crypto: any;
  totalRealEstate: any;
  realEstate: any;
}) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div>
            <h5>Crypto</h5>
            <Grid
              data={totalCrypto}
              style={{ opacity: totalCrypto ? "1" : "0" }}
            >
              <GridColumn
                title="Board"
                field="finance"
                locked={true}
                width={90}
              />
              <GridColumn title="Total" field="total" cell={DefaultCell} />
              <GridColumn
                title="Total Invest"
                field="totalinvest"
                cell={DefaultCell}
              />
              <GridColumn
                title="Variation"
                field="variation"
                cell={ChangeCell}
              />
            </Grid>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            data={crypto}
            style={{ opacity: crypto ? "1" : "0" }}
            className="panel-position"
          >
            <GridColumn
              title="Symbol"
              field="symbol"
              locked={true}
              width={90}
            />
            <GridColumn title="Name" field="name" width={110} />
            <GridColumn title="% Change" field="variation" cell={ChangeCell} />
            <GridColumn title="Price" field="price" cell={DefaultCell} />
            <GridColumn title="Volume" field="number" />
            <GridColumn title="Value" field="value" cell={DefaultCell} />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div>
            <h5>Real Estate</h5>
            <Grid
              data={totalRealEstate}
              style={{ opacity: totalRealEstate ? "1" : "0" }}
              className="panel-position"
            >
              <GridColumn
                title="Board"
                field="finance"
                locked={true}
                width={90}
              />
              <GridColumn title="Total" field="total" cell={DefaultCell} />
              <GridColumn
                title="Total Invest"
                field="totalinvest"
                cell={DefaultCell}
              />
              <GridColumn
                title="Variation"
                field="variation"
                cell={ChangeCell}
              />
            </Grid>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            data={realEstate}
            style={{ opacity: realEstate ? "1" : "0" }}
            className="panel-position"
          >
            <GridColumn
              title="Symbol"
              field="symbol"
              locked={true}
              width={90}
            />
            <GridColumn title="Name" field="name" width={180} />
            <GridColumn title="% Change" field="variation" cell={ChangeCell} />
            <GridColumn title="Price" field="price" cell={DefaultCell} />
            <GridColumn title="Volume" field="number" />
            <GridColumn title="Value" field="value" cell={DefaultCell} />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
