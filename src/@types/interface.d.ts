import { AssessmentClassifyCommand } from 'src/application/assessments/assessmentClassifyCommand'
import { AssessmentFeedbackUpdateCommand } from 'src/application/assessments/assessmentFeedbackUpdateCommand.'
import { AssessmentMemoUpdateCommand } from 'src/application/assessments/assessmentMemoUpdateCommand'
import { ReportListGetResult } from 'src/application/reportLists/reportListGetResult'
import { ReportListImportCommand } from 'src/application/reportLists/reportListImportCommand'
import { SubmissionFileGetCommand } from 'src/application/submissionFiles/submissionFileGetCommand'
import { SubmissionFileGetResult } from 'src/application/submissionFiles/submissionFileGetResult'
import { SubmissionSummariesGetCommand } from 'src/application/submissionSummaries/submissionSummariesGetCommand'
import { SubmissionSummariesGetResult } from 'src/application/submissionSummaries/submissionSummariesGetResult'

// 型付きで API を公開するための定義
// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript
export interface IElectronAPI {
  importReportListAsync: (
    reportListImportCommand: ReportListImportCommand
  ) => Promise<number>

  getReportListAsync: (
    reportListGetCommand: ReportListGetCommand
  ) => Promise<ReportListGetResult>

  classifyAssessmentAsync: (
    assessmentClassifyCommand: AssessmentClassifyCommand
  ) => Proimse<void>

  updateAssessmentFeedbackAsync: (
    command: AssessmentFeedbackUpdateCommand
  ) => Promise<void>

  updateAssessmentMemoAsync: (
    command: AssessmentMemoUpdateCommand
  ) => Promise<void>

  getSubmissionSummariesAsync: (
    command: SubmissionSummariesGetCommand
  ) => Promise<SubmissionSummariesGetResult>

  getSubmissionFileAsync: (
    command: SubmissionFileGetCommand
  ) => Promise<SubmissionFileGetResult>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
