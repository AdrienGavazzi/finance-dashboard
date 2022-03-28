import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Loading from "../../layout/Loading";

const fontSize = "13px";
const padding = "10px 5px";

export default function PositionTable({ position }: { position: any }) {
  if (!position) {
    return null;
  }

  // ADD component={Paper} for design
  return (
    <div style={{ width: "100%", position: "relative" }}>
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
                Volume
              </TableCell>
              <TableCell
                align="left"
                style={{ fontSize: fontSize, padding: padding }}
              >
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {position.map((row: any) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ fontSize: fontSize }}
              >
                <TableCell
                  align="left"
                  style={{ fontSize: fontSize, padding: padding }}
                >
                  {row.symbol}
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontSize: fontSize, padding: padding }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontSize: fontSize,
                    padding: padding,
                    color: row.variation < 0 ? "red" : "#5edd23",
                    fontWeight: "bold",
                  }}
                >
                  {row.variation}
                </TableCell>
                <TableCell
                  align="left"
                  style={{ fontSize: fontSize, padding: padding }}
                >
                  {Number(row.price).toFixed(2)}
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
                  {Number(row.value).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
