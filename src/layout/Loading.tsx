import React from "react";

export default function Loading({color}: any) {

  if (color) {
    return <span className="k-icon k-i-loading" style={{color: color}}></span>
  }
  return (
    <span className="k-icon k-i-loading"></span>
  );
}
