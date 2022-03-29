import React from "react";

import Loading from "../../layout/Loading";

export default function TotalPosition({
  numberDay,
  firstValue,
  lastValue,
}: {
  numberDay: any;
  firstValue: any;
  lastValue: any;
}) {
  if (!firstValue || !lastValue) {
    return null;
  }

  return (
    <div>
      <p style={{ margin: "0px" }}>
        {numberDay}
        {" days: "}
        {(
          ((parseFloat(lastValue.total) - parseFloat(firstValue)) /
            parseFloat(firstValue)) *
          100
        ).toFixed(1)}{" "}
        %
      </p>
    </div>
  );
}
