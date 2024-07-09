import { CourseGetCommand } from 'src/application/courses/courseGetCommand'
import { ReportListGetResult } from 'src/application/reportLists/reportListGetResult'
import { ReportListImportCommand } from 'src/application/reportLists/reportListImportCommand'
import { ReportGetResult } from 'src/application/reports/reportGetResult'

// 型付きで API を公開するための定義
// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript
export interface IElectronAPI {
  importReportListAsync: (
    reportListImportCommand: ReportListImportCommand
  ) => Promise<number>

  getReportListAsync: (
    reportListGetCommand: ReportListGetCommand
  ) => Promise<ReportListGetResult>

  getReportAsync: (
    reportGetCommand: ReportGetCommand
  ) => Promise<ReportGetResult>

  getCourseAsync: (
    courseGetCommand: CourseGetCommand
  ) => Promise<CourseGetResult>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
