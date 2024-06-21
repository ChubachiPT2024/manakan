import { Route, Routes } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import CommonLayout from "./common/CommonLayout";


export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<CommonLayout />}>
                    <Route index element={<h1>Home Page</h1>} />
                </Route>
            </Routes>
        </HashRouter>
    );
}