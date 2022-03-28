import React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";

export const NumberCell = (props: GridCellProps) => {
  const field = props.field || "";
  const startingValue = props.dataItem[field];
  let finalValue = (startingValue / 1000000).toFixed(2) + "M";
  if (startingValue > 1000000000) {
    finalValue = (startingValue / 1000000000).toFixed(2) + "B";
  }

  return <td>{finalValue}</td>;
};

export const ChangeCell = (props: GridCellProps) => {
  const field = props.field || "";
  const value = props.dataItem[field];
  return <td className={value > 0 ? "change-up" : "change-down"}>{value}%</td>;
};

export const DefaultCell = (props: GridCellProps) => {
  const field = props.field || "";
  const value = props.dataItem[field];
  return <td>{Number(value).toFixed(2)}</td>;
};
