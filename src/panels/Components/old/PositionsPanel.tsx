import React from "react";

import Loading from "../../../layout/Loading";
import EtfGrid from "./EtfGrid";
import ActionGrid from "./ActionGrid";
import OtherGrid from "./OtherGrid";

export default function PositionsPanel({
  positions,
  total,
  actions,
  totalAction,
  realEstate,
  totalRealEstate,
  crypto,
  totalCrypto,
}: {
  positions: any;
  total: any;
  actions: any;
  totalAction: any;
  realEstate: any;
  totalRealEstate: any;
  crypto: any;
  totalCrypto: any;
}) {
  return (
    <>
      {!positions && <Loading />}
      <div className="panel-etf">
        <EtfGrid total={total} positions={positions} />
      </div>
      <div className="panel-action">
        <ActionGrid totalAction={totalAction} actions={actions} />
      </div>
      <div className="panel-other">
        <OtherGrid
          totalCrypto={totalCrypto}
          crypto={crypto}
          totalRealEstate={totalRealEstate}
          realEstate={realEstate}
        />
      </div>
    </>
  );
}
