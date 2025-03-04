import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Finalize() {
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
        <h1 className="dashboard-header">Finalize</h1>
        <span>Spring promotion</span>
      </div>
      <button onClick={() => navigate("/")} className="back-button">
        <img alt="arw" src="/arrow.svg" />
        Back
      </button>
    </div>
  );
}
