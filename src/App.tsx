import { HashRouter, Route, Routes } from "react-router-dom";

// ページコンポーネントのインポート
import Home from "./presentation/pages/Home";
import Evaluation from "./presentation/pages/Evaluation";

export default function App() {
    return (
        // Electron では BrowserRouter ではなく HashRouter を使う
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/evaluation/:reportId" element={<Evaluation />} />
            </Routes>
        </HashRouter>
    );
}
