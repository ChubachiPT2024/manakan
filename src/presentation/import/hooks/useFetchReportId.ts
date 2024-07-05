import { ReportListImportCommand } from "src/application/reportLists/reportListImportCommand";

/**
 * reportlist.xlsxのパスから、レポートIDを取得する
 * 
 * @param reportPath The path of the report to import.
 * @returns A promise that resolves to the report ID.
 */
export const fetchReportId = async (reportPath: string): Promise<number> => {
  const reportId = await window.electronAPI.importReportListAsync(
    new ReportListImportCommand(reportPath)
  );
  return reportId;
};
