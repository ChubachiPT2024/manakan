import { Route, Routes } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import CommonLayout from "./common/CommonLayout";
import Home from "./pages/Home";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<CommonLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}