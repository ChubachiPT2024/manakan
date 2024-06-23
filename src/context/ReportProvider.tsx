import React, { useReducer } from "react";
import { ReportContext } from "./ReportContext";
import { Report } from "../types";
import { ReportReducer } from "./ReportReducer";

const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [report, dispatch] = useReducer(ReportReducer, null);

    const setReport = (report: Report) => {
        dispatch({ type: 'SET_REPORT', report });
    };

    return (
        <ReportContext.Provider value={{ report, setReport }}>
            {children}
        </ReportContext.Provider>
    );
};

export { ReportProvider };
