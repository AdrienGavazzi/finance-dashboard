import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

import PerformanceLine from "./panels/Components/PerformanceLine";

import { getFundHistoryDates } from "./services/dataService";
import ChartComplex from "./panels/Components/ChartComplex";

export default function History() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [etfSeries, setEtfSeries] = React.useState<string[]>();
  const [etfLabels, setEtfLabels] = React.useState<string[]>();
  const [actionSeries, setActionsSeries] = React.useState<string[]>();
  const [actionLabels, setActionsLabels] = React.useState<string[]>();
  const [cryptoSeries, setCryptoSeries] = React.useState<string[]>();
  const [cryptoLabels, setCryptoLabels] = React.useState<string[]>();

  async function search() {
    if (value[0] !== null && value[1] !== null) {
      console.log(
        value[0].toLocaleDateString() + " " + value[1].toLocaleDateString()
      );
      getFundHistoryDates(
        value[0].toLocaleDateString(),
        value[1].toLocaleDateString()
      ).then((data: any) => {
        setEtfSeries(data.etf.etfSeries);
        setEtfLabels(data.etf.etfLabels);
        setActionsSeries(data.action.actionSeries);
        setActionsLabels(data.action.actionLabels);
        setCryptoSeries(data.crypto.cryptoSeries);
        setCryptoLabels(data.crypto.cryptoLabels);
      });
    }
  }

  return (
    <div className="panel-history">
      <div className="panel-history-date">
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
      <div className="panel-history-chart">
        <ChartComplex data={etfSeries} labels={etfLabels} titre="Etf" />
      </div>
      <div className="panel-history-chart">
        <ChartComplex
          data={actionSeries}
          labels={actionLabels}
          titre="Action"
        />
      </div>
      <div className="panel-history-chart">
        <ChartComplex
          data={cryptoSeries}
          labels={cryptoLabels}
          titre="Crypto"
        />
      </div>
    </div>
  );
}
