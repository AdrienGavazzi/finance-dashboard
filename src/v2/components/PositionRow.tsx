import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from '@mui/material/Tooltip';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const fontSize = "12px";
const padding = "10px 10px";


export default function PositionRow({positions}: any) {

    const getTooltip = (pricDerniereSeance: number, prixPredict: number, date: string) => {
        return (
            <div>
                <div>Predicted: {prixPredict}</div>
                <div>Date: {date}</div>
                <div>Last Close: {pricDerniereSeance}</div>
            </div>
        )
    }

    const getZoomTooltip = (data: any) => {
        return (
            <div className="position-tooltip-zoom-content">
                <h5>{data.name} ({data.symbol})</h5>
                <p>One Month: {data.data.oneMonth}</p>
                <p>Three Months: {data.data.threeMonth}</p>
                <p>One Year: {data.data.oneYear}</p>
            </div>
        )
    }

    function obtenirIconeVariationPredictive(prixDerniereSeance: number, prixPredict: number, date: string) {
        var variation = ((prixPredict - prixDerniereSeance) / prixDerniereSeance) * 100;
        
        if (variation < -9 ) {
            return (
                <div>
                    <Tooltip title={getTooltip(prixDerniereSeance, prixPredict, date)} placement="left-start">
                        <KeyboardDoubleArrowDownIcon sx={{ fontSize: 17 }} style={{ color: "red" }} />
                    </Tooltip>
                </div>
              );
        } else if (variation < 0) {
            return (
                <div>
                    <Tooltip title={getTooltip(prixDerniereSeance, prixPredict, date)} placement="left-start">
                        <KeyboardArrowDownIcon sx={{ fontSize: 17 }} style={{ color: "red" }} />
                    </Tooltip>
                </div>
            );
        } else if (variation > 9) {
            return (
            <div>
                <Tooltip title={getTooltip(prixDerniereSeance, prixPredict, date)} placement="left-start">
                    <KeyboardDoubleArrowUpIcon sx={{ fontSize: 17 }} style={{ color: "#5edd23" }} />
                </Tooltip>
            </div>
            );
        } else {
            return (
                <div>
                    <Tooltip title={getTooltip(prixDerniereSeance, prixPredict, date)} placement="left-start">
                        <KeyboardArrowUpIcon sx={{ fontSize: 17 }} style={{ color: "#5edd23" }} />
                    </Tooltip>
                </div>
            );
        }
    }

    return (
        <div>
            <TableContainer>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="left"
                                style={{ fontSize: fontSize, padding: padding }}
                            >
                                Symbol
                            </TableCell>
                            <TableCell
                                align="left"
                                style={{ fontSize: fontSize, padding: padding }}
                            >
                                Name
                            </TableCell>
                            <TableCell
                                align="left"
                                style={{ fontSize: fontSize, padding: padding }}
                            >
                                Change
                            </TableCell>
                            <TableCell
                                align="left"
                                style={{ fontSize: fontSize, padding: padding }}
                            >
                                Price
                            </TableCell>
                            <TableCell
                                align="left"
                                style={{ fontSize: fontSize, padding: padding }}
                            >
                                PRU
                            </TableCell>
                            <TableCell
                                align="left"
                                style={{ fontSize: fontSize, padding: padding }}
                            >
                                Vol.
                            </TableCell>
                            <TableCell
                                align="left"
                                style={{ fontSize: fontSize, padding: padding }}
                            >
                                Value
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{ fontSize: fontSize, padding: padding }}
                            >
                                +/- 
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {positions.map((row: any) => (
                            <TableRow
                                key={row.symbol}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                style={{ fontSize: fontSize }}
                            >
                                <TableCell
                                    align="left"
                                    style={{ 
                                        position: "relative",
                                        fontSize: fontSize, 
                                        padding: padding 
                                    }}
                                    >
                                        {row.symbol.split(".PA")[0]}
                                        <Tooltip title={getZoomTooltip(row)} placement="bottom-start">
                                            <div className="position-tooltip-zoom">
                                            </div>
                                        </Tooltip>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{
                                        fontSize: fontSize,
                                        padding: padding,
                                        cursor: "pointer",
                                    }}
                                    onClick={() => window.open(row.link, "_blank")}
                                    >
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{
                                        position: "relative",
                                        fontSize: fontSize,
                                        padding: padding,
                                        color: row.data.variation < 0 ? "red" : "#5edd23",
                                        fontWeight: "bold",
                                    }}
                                    >
                                        {Number(row.data.variation).toFixed(2)}
                                        <div className="position-predict-arrow">
                                            {
                                                obtenirIconeVariationPredictive(row.data.lastPrice, row.predict.price, row.predict.date)
                                            }
                                        </div>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ fontSize: fontSize, padding: padding }}
                                    >
                                    {Number(row.data.price).toFixed(2)}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ fontSize: fontSize, padding: padding }}
                                    >
                                    {Number(Number(row.PRU).toFixed(2))}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ fontSize: fontSize, padding: padding }}
                                    >
                                    {Number(Number(row.number).toFixed(3))}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ fontSize: fontSize, padding: padding }}
                                    >
                                    {Number(row.data.price * row.number).toFixed(0)}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    style={{ 
                                        fontSize: fontSize, 
                                        padding: padding,
                                        // color: Number((row.data.price * row.number) - (row.PRU * row.number)) < 0 ? "red" : "#5edd23"
                                    }}
                                    >
                                    {Number((row.data.price * row.number) - (row.PRU * row.number)).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}   