import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Welcome</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
