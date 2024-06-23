import { Report } from "../types";
import { ReportAction } from "../types";

export const ReportReducer = (state: Report | null, action: ReportAction): Report | null => {
    switch (action.type) {
        case 'SET_REPORT':
            return action.report;
        default:
            return state;
    }
}