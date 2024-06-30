import { CourseGetCommand } from 'src/application/courses/courseGetCommand'
import { ReportListImportCommand } from 'src/application/reportLists/reportListImportCommand'
import { ReportGetResult } from 'src/application/reports/reportGetResult'

// 型付きで API を公開するための定義
// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript
export interface IElectronAPI {
  importReportListAsync: (
    reportListImportCommand: ReportListImportCommand
  ) => Promise<number>

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
