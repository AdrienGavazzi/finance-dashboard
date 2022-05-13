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

export default function PositionTable({
  position,
  isComplex,
}: {
  position: any;
  isComplex?: boolean;
}) {
  if (!position) {
    return null;
  }

  const extended1_1 = (element: any) => {
    if (isComplex && element) {
      if (element.oneWeek !== undefined) {
        return (
          <TableCell
            align="left"
            style={{ fontSize: fontSize, padding: padding }}
          >
            One Week
          </TableCell>
        );
      } else {
        return (
          <TableCell
            align="left"
            style={{ fontSize: fontSize, padding: padding }}
          >
            One Month
          </TableCell>
        );
      }
    }
    return null;
  };

  const extended2_1 = (element: any) => {
    if (isComplex && element) {
      return (
        <TableCell
          align="left"
          style={{ fontSize: fontSize, padding: padding }}
        >
          Three Month
        </TableCell>
      );
    }
    return null;
  };

  const extended3_1 = (element: any) => {
    if (isComplex && element) {
      return (
        <TableCell
          align="left"
          style={{ fontSize: fontSize, padding: padding }}
        >
          One Year
        </TableCell>
      );
    }
    return null;
  };

  const extended1_2 = (element: any) => {
    if (isComplex && element) {
      if (element.oneWeek !== undefined) {
        return (
          <TableCell
            align="left"
            style={{
              fontSize: fontSize,
              padding: padding,
              color: element.oneWeek < 0 ? "red" : "#5edd23",
              fontWeight: "bold",
            }}
          >
            {element.oneWeek}
          </TableCell>
        );
      } else {
        return (
          <TableCell
            align="left"
            style={{
              fontSize: fontSize,
              padding: padding,
              color: element.oneMonth < 0 ? "red" : "#5edd23",
              fontWeight: "bold",
            }}
          >
            {element.oneMonth}
          </TableCell>
        );
      }
    }
    return null;
  };

  const extended2_2 = (element: any) => {
    if (isComplex && element) {
      return (
        <TableCell
          align="left"
          style={{
            fontSize: fontSize,
            padding: padding,
            color: element.threeMonth < 0 ? "red" : "#5edd23",
            fontWeight: "bold",
          }}
        >
          {element.threeMonth}
        </TableCell>
      );
    }
    return null;
  };

  const extended3_2 = (element: any) => {
    if (isComplex && element) {
      return (
        <TableCell
          align="left"
          style={{
            fontSize: fontSize,
            padding: padding,
            color: element.oneYear < 0 ? "red" : "#5edd23",
            fontWeight: "bold",
          }}
        >
          {element.oneYear}
        </TableCell>
      );
    }
    return null;
  };

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
              {extended1_1(position[0])}
              {extended2_1(position[0])}
              {extended3_1(position[0])}
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
                {extended1_2(row)}
                {extended2_2(row)}
                {extended3_2(row)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
