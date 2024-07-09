import { AssessmentClassifyCommand } from 'src/application/assessments/assessmentClassifyCommand'
import { AssessmentFeedbackUpdateCommand } from 'src/application/assessments/assessmentFeedbackUpdateCommand.'
import { AssessmentMemoUpdateCommand } from 'src/application/assessments/assessmentMemoUpdateCommand'
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

  classifyAssessmentAsync: (
    assessmentClassifyCommand: AssessmentClassifyCommand
  ) => Proimse<void>

  updateAssessmentFeedbackAsync: (
    command: AssessmentFeedbackUpdateCommand
  ) => Promise<void>

  updateAssessmentMemoAsync: (
    command: AssessmentMemoUpdateCommand
  ) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
