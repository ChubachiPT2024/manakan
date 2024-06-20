import { Route, Routes } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import { Home } from "./Home";
import { Evaluation } from "./Evaluation";


export default function App() {
  return (
    // Electron では BrowserRouter ではなく HashRouter を使う
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports/:reportId/evaluation" element={<Evaluation />} />
      </Routes>
    </HashRouter>
  );
}
