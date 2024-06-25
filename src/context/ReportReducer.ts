import { Report, ReportAction } from "../types";

// ReportReducer: reportの状態を管理するReducer関数
// アクションに基づいて状態を更新
export const reportReducer = (state: Report | null, action: ReportAction): Report | null => {
    switch (action.type) {
        case 'SET_REPORT':
            return action.report;
        default:
            return state;
    }
}
