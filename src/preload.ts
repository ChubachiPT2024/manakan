// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// 'electron/renderer' から import すると Vite がエラーを出す
import { contextBridge, ipcRenderer } from 'electron'
import { ReportListImportCommand } from './application/reportLists/reportListImportCommand'
import { ReportGetCommand } from './application/reports/reportGetCommand'
import { CourseGetCommand } from './application/courses/courseGetCommand'
import { ReportListGetCommand } from './application/reportLists/reportListGetCommand'
import { AssessmentClassifyCommand } from './application/assessments/assessmentClassifyCommand'
import { AssessmentFeedbackUpdateCommand } from './application/assessments/assessmentFeedbackUpdateCommand.'
import { AssessmentMemoUpdateCommand } from './application/assessments/assessmentMemoUpdateCommand'

contextBridge.exposeInMainWorld('electronAPI', {
  importReportListAsync: (reportListImportCommand: ReportListImportCommand) =>
    ipcRenderer.invoke('importReportListAsync', reportListImportCommand),

  getReportListAsync: (reportListGetCommand: ReportListGetCommand) =>
    ipcRenderer.invoke('getReportListAsync', reportListGetCommand),

  getReportAsync: (reportGetCommand: ReportGetCommand) =>
    ipcRenderer.invoke('getReportAsync', reportGetCommand),

  getCourseAsync: (courseGetCommand: CourseGetCommand) =>
    ipcRenderer.invoke('getCourseAsync', courseGetCommand),

  classifyAssessmentAsync: (
    assessmentClassifyCommand: AssessmentClassifyCommand
  ) => ipcRenderer.invoke('classifyAssessmentAsync', assessmentClassifyCommand),

  updateAssessmentFeedbackAsync: (command: AssessmentFeedbackUpdateCommand) =>
    ipcRenderer.invoke('updateAssessmentFeedbackAsync', command),

  updateAssessmentMemoAsync: (command: AssessmentMemoUpdateCommand) =>
    ipcRenderer.invoke('updateAssessmentMemoAsync', command),
})
