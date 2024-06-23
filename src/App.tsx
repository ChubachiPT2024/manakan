import { Route, Routes } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import CommonLayout from "./common/CommonLayout";

// ページコンポーネントのインポート
import Home from "./pages/Home";
import Evaluation from "./pages/Evaluation";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<CommonLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/evaluation" element={<Evaluation />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}