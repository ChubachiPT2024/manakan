import { createContext } from "react";
import { Report } from "../types";

export const ReportContext = createContext<{
    report: Report | null;
    setReport: (report: Report) => void;
} | null>(null);
