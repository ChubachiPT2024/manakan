// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// 'electron/renderer' から import すると Vite がエラーを出す
import { contextBridge, ipcRenderer } from 'electron'
import { ReportListImportCommand } from './application/reportLists/reportListImportCommand'
import { ReportListGetCommand } from './application/reportLists/reportListGetCommand'
import { AssessmentClassifyCommand } from './application/assessments/assessmentClassifyCommand'
import { AssessmentFeedbackUpdateCommand } from './application/assessments/assessmentFeedbackUpdateCommand'
import { AssessmentMemoUpdateCommand } from './application/assessments/assessmentMemoUpdateCommand'
import { AssessmentScoreUpdateCommand } from './application/assessments/assessmentScoreUpdateCommand'
import { SubmissionSummariesGetCommand } from './application/submissionSummaries/submissionSummariesGetCommand'
import { SubmissionFileGetCommand } from './application/submissionFiles/submissionFileGetCommand'

contextBridge.exposeInMainWorld('electronAPI', {
  importReportListAsync: (reportListImportCommand: ReportListImportCommand) =>
    ipcRenderer.invoke('importReportListAsync', reportListImportCommand),

  getReportListAsync: (reportListGetCommand: ReportListGetCommand) =>
    ipcRenderer.invoke('getReportListAsync', reportListGetCommand),

  classifyAssessmentAsync: (
    assessmentClassifyCommand: AssessmentClassifyCommand
  ) => ipcRenderer.invoke('classifyAssessmentAsync', assessmentClassifyCommand),

  updateAssessmentFeedbackAsync: (command: AssessmentFeedbackUpdateCommand) =>
    ipcRenderer.invoke('updateAssessmentFeedbackAsync', command),

  updateAssessmentMemoAsync: (command: AssessmentMemoUpdateCommand) =>
    ipcRenderer.invoke('updateAssessmentMemoAsync', command),

  updateAssessmentScoreAsync: (command: AssessmentScoreUpdateCommand) =>
    ipcRenderer.invoke('updateAssessmentScoreAsync', command),

  getSubmissionSummariesAsync: (command: SubmissionSummariesGetCommand) =>
    ipcRenderer.invoke('getSubmissionSummariesAsync', command),

  getSubmissionFileAsync: (command: SubmissionFileGetCommand) =>
    ipcRenderer.invoke('getSubmissionFileAsync', command),
})
