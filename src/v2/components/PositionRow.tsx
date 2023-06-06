import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const fontSize = "12px";
const padding = "10px 10px";


export default function PositionRow({positions}: any) {

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
                            align="left"
                            style={{ fontSize: fontSize, padding: padding }}
                        >
                            Predict
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
                                    style={{ fontSize: fontSize, padding: padding }}
                                    >
                                    {row.symbol.split(".PA")[0]}
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
                                        fontSize: fontSize,
                                        padding: padding,
                                        color: row.data.variation < 0 ? "red" : "#5edd23",
                                        fontWeight: "bold",
                                    }}
                                    >
                                    {Number(row.data.variation).toFixed(2)}
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
                                    {Number(row.PRU).toFixed(2)}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ fontSize: fontSize, padding: padding }}
                                    >
                                    {row.number}
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
                                        // color: row.predict.price < row ? "red" : "#5edd23"
                                    }}
                                    >
                                    {Number(row.predict.price).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}   