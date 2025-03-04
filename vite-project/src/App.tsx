import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Finalize from "./components/Finalize";
import Results from "./components/Results";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/results/:testId" element={<Results />} />
        <Route path="/finalize/:testId" element={<Finalize />} />
      </Routes>
    </>
  );
}
