import { createContext } from "react";
import { Report } from "../types";

// ReportContext: Reportの状態とsetReport関数を格納するコンテキストを作成
// 初期値はnull
export const ReportContext = createContext<{
    report: Report | null;
    setReport: (report: Report) => void;
} | null>(null);
