import { useState } from "react";
import "./Dashboard.css";
import TestsList from "./Tests";

export default function Dashboard() {
  const [value, setValue] = useState("");

  return (
    <div className="container">
      <h1 className="dashboard-header">Dashboard</h1>
      <div className="input-container">
        <input
          id="search"
          type="text"
          placeholder=""
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input"
        ></input>
        <div className="input-placeholder">
          <img alt="search pic" src="/search.svg" />
          <label htmlFor="search" className="input-label">
            What test are you looking for?
          </label>
        </div>
      </div>
      <TestsList value={value} setValue={setValue as (value: string) => string} />
    </div>
  );
}
