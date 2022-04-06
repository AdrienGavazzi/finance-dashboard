import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getFundHistoryDates } from "./services/dataService";
import ChartComplex from "./panels/Components/ChartComplex";
import HistoryDetails from "./panels/Components/HistoryDetails";

export default function History() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [globalSeries, setGlobalSeries] = React.useState<
    string[] | null | undefined
  >(null);
  const [globalDeposit, setGlobalDeposit] = React.useState<
    string[] | null | undefined
  >(null);
  const [globalLabels, setGlobalLabels] = React.useState<
    string[] | null | undefined
  >(null);
  const [etfSeries, setEtfSeries] = React.useState<string[] | null | undefined>(
    null
  );
  const [etfDeposit, setEtfDeposit] = React.useState<
    string[] | null | undefined
  >(null);
  const [etfLabels, setEtfLabels] = React.useState<string[] | null | undefined>(
    null
  );
  const [actionSeries, setActionsSeries] = React.useState<
    string[] | null | undefined
  >(null);
  const [actionDeposit, setActionDeposit] = React.useState<
    string[] | null | undefined
  >(null);
  const [actionLabels, setActionsLabels] = React.useState<
    string[] | null | undefined
  >(null);
  const [cryptoSeries, setCryptoSeries] = React.useState<
    string[] | null | undefined
  >(null);
  const [cryptoDeposit, setCryptoDeposit] = React.useState<
    string[] | null | undefined
  >(null);
  const [cryptoLabels, setCryptoLabels] = React.useState<
    string[] | null | undefined
  >(null);

  async function search() {
    if (value[0] !== null && value[1] !== null) {
      console.log(
        value[0].toLocaleDateString() + " " + value[1].toLocaleDateString()
      );
      setGlobalSeries(undefined);
      setGlobalDeposit(undefined);
      setGlobalLabels(undefined);

      setEtfSeries(undefined);
      setEtfDeposit(undefined);
      setEtfLabels(undefined);

      setActionsSeries(undefined);
      setActionDeposit(undefined);
      setActionsLabels(undefined);

      setCryptoSeries(undefined);
      setCryptoDeposit(undefined);
      setCryptoLabels(undefined);
      getFundHistoryDates(
        value[0].toLocaleDateString(),
        value[1].toLocaleDateString()
      ).then((data: any) => {
        setGlobalSeries(data.global.globalSeries);
        setGlobalDeposit(data.global.globalDeposit);
        setGlobalLabels(data.global.globalLabels);

        setEtfSeries(data.etf.etfSeries);
        setEtfDeposit(data.etf.etfDeposit);
        setEtfLabels(data.etf.etfLabels);

        setActionsSeries(data.action.actionSeries);
        setActionDeposit(data.action.actionDeposit);
        setActionsLabels(data.action.actionLabels);

        setCryptoSeries(data.crypto.cryptoSeries);
        setCryptoDeposit(data.crypto.cryptoDeposit);
        setCryptoLabels(data.crypto.cryptoLabels);
      });
    }
  }

  return (
    <div className="panel-history">
      <div className="panel-history-date">
        <div className="button" onClick={() => setValue([null, null])}>
          <p style={{ margin: "0px", fontSize: "20px" }}>Reset</p>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            startText="Check-in"
            endText="Check-out"
            value={value}
            onChange={(newValue: any) => {
              setValue(newValue);
            }}
            renderInput={(startProps: any, endProps: any) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        <div className="button" onClick={() => search()}>
          <p style={{ margin: "0px", fontSize: "20px" }}>Search</p>
        </div>
      </div>
      <div className="panel-history-accordion">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Global</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="panel-history-chart">
              <div className="panel-history-chartline">
                <ChartComplex
                  data={globalSeries}
                  labels={globalLabels}
                  deposit={globalDeposit}
                  colors={["#16ACEA", "#d51a399a"]}
                  titre="Global"
                />
              </div>
              <div
                className="panel-history-details"
                style={{
                  backgroundImage:
                    "linear-gradient(to right bottom, #de2767, #e63671e0)",
                }}
              >
                <HistoryDetails
                  data={globalSeries}
                  labels={globalLabels}
                  deposit={globalDeposit}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Etf</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="panel-history-chart">
              <div className="panel-history-chartline">
                <ChartComplex
                  data={etfSeries}
                  labels={etfLabels}
                  deposit={etfDeposit}
                  colors={["#16ACEA", "#d51a399a"]}
                  titre="Etf"
                />
              </div>
              <div
                className="panel-history-details"
                style={{
                  backgroundImage:
                    "linear-gradient(to right bottom, #0093E9, #80C5D0e0)",
                }}
              >
                <HistoryDetails
                  data={etfSeries}
                  labels={etfLabels}
                  deposit={etfDeposit}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Action</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="panel-history-chart">
              <div className="panel-history-chartline">
                <ChartComplex
                  data={actionSeries}
                  labels={actionLabels}
                  deposit={actionDeposit}
                  colors={["#16ACEA", "#d51a399a"]}
                  titre="Action"
                />
              </div>
              <div
                className="panel-history-details"
                style={{
                  backgroundImage:
                    "linear-gradient(to right bottom, #57CA22, #91CA22e0)",
                }}
              >
                <HistoryDetails
                  data={actionSeries}
                  labels={actionLabels}
                  deposit={actionDeposit}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Crypto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="panel-history-chart">
              <div className="panel-history-chartline">
                <ChartComplex
                  data={cryptoSeries}
                  labels={cryptoLabels}
                  deposit={cryptoDeposit}
                  colors={["#16ACEA", "#d51a399a"]}
                  titre="Crypto"
                />
              </div>
              <div
                className="panel-history-details"
                style={{
                  backgroundImage:
                    "linear-gradient(to right bottom, #FC6835, #FC9235e0)",
                }}
              >
                <HistoryDetails
                  data={cryptoSeries}
                  labels={cryptoLabels}
                  deposit={cryptoDeposit}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
