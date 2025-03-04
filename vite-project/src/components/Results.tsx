import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Results() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="container"
    >
      <div>
        <h1 className="dashboard-header">Results</h1>
        <span>Order basket redesing</span>
      </div>
      <button onClick={() => navigate("/")} className="back-button">
        <img alt="arw" src="/arrow.svg" />
        Back
      </button>
    </div>
  );
}
