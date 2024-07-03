import React, { useReducer } from "react";
import { ReportContext } from "./ReportContext";
import { Report } from "../types";
import { reportReducer } from "./ReportReducer";

// ReportProvider: 子コンポーネントにReportContextを提供するコンポーネント
const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // useReducerを使用してreportの状態管理を行う
    const [report, dispatch] = useReducer(reportReducer, null);

    // setReport: Reportを更新するための関数
    const setReport = (report: Report) => {
        dispatch({ type: 'SET_REPORT', report });
    };

    // ReportContext.Providerを使用してコンテキストの値を提供
    return (
        <ReportContext.Provider value={{ report, setReport }}>
            {children}
        </ReportContext.Provider>
    );
};

export { ReportProvider };
