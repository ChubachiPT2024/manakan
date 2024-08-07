// 'electron/main' から import すると Vite がエラーを出す
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { ReportListApplicationService } from './application/reportLists/reportListApplicationService'
import { ReportListImportCommand } from './application/reportLists/reportListImportCommand'
import { ReportListGetCommand } from './application/reportLists/reportListGetCommand'
import { AssessmentClassifyCommand } from './application/assessments/assessmentClassifyCommand'
import { AssessmentApplicationService } from './application/assessments/assessmentApplicationService'
import { AssessmentFeedbackUpdateCommand } from './application/assessments/assessmentFeedbackUpdateCommand'
import { AssessmentMemoUpdateCommand } from './application/assessments/assessmentMemoUpdateCommand'
import { SubmissionSummaryApplicationService } from './application/submissionSummaries/submissionSummaryApplicationService'
import { SubmissionSummariesGetCommand } from './application/submissionSummaries/submissionSummariesGetCommand'
import { SubmissionFileApplicationService } from './application/submissionFiles/submissionFileApplicationService'
import { SubmissionFileGetCommand } from './application/submissionFiles/submissionFileGetCommand'
import { ReportListExportCommand } from './application/reportLists/reportListExportCommand'
import { ReportCourseApplicationService } from './application/reportCourse/reportCourseApplicationService'
import { JsonCourseRepository } from './infrastructure/json/courses/jsonCourseRepository'
import { JsonReportRepository } from './infrastructure/json/reports/jsonReportRepository'
import { JsonStudentRepository } from './infrastructure/json/students/jsonStudentRepository'
import { JsonSubmissionRepository } from './infrastructure/json/submissions/jsonSubmissionRepository'
import { JsonAssessmentRepository } from './infrastructure/json/assessments/jsonAssessmentRepository'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../assets/icon/manakan_icon.png'),
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }
}

// TODO 定義場所の検討
// TODO DI フレームワークの利用を検討
const jsonsFolderAbsolutePath = join(
  app.getPath('userData'),
  'repositories',
  'jsons'
)
mkdirSync(jsonsFolderAbsolutePath, { recursive: true })
const courseRepository = new JsonCourseRepository(
  join(jsonsFolderAbsolutePath, 'courses.json')
)
const reportRepository = new JsonReportRepository(
  join(jsonsFolderAbsolutePath, 'reports.json')
)
const studentRepository = new JsonStudentRepository(
  join(jsonsFolderAbsolutePath, 'students.json')
)
const submissionRepository = new JsonSubmissionRepository(
  join(jsonsFolderAbsolutePath, 'submissions.json')
)
const assessmentRepository = new JsonAssessmentRepository(
  join(jsonsFolderAbsolutePath, 'assessments.json')
)
const reportListApplicationService = new ReportListApplicationService(
  courseRepository,
  reportRepository,
  studentRepository,
  submissionRepository,
  assessmentRepository
)
const assessmentApplicationService = new AssessmentApplicationService(
  assessmentRepository
)
const submissionSummaryApplicationService =
  new SubmissionSummaryApplicationService(
    reportRepository,
    submissionRepository,
    studentRepository,
    assessmentRepository
  )
const submissionFileApplicationService = new SubmissionFileApplicationService(
  reportRepository,
  submissionRepository
)
const reportCourseApplicationService = new ReportCourseApplicationService(
  courseRepository,
  reportRepository
)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle(
    'importReportListAsync',
    async (_, reportListImportCommand: ReportListImportCommand) =>
      await reportListApplicationService.importAsync(reportListImportCommand)
  )

  ipcMain.handle(
    'exportReportListAsync',
    async (_, reportListExportCommand: ReportListExportCommand) =>
      await reportListApplicationService.exportAsync(reportListExportCommand)
  )

  ipcMain.handle(
    'getReportCourseAsync',
    async () => await reportCourseApplicationService.getReportCourseAsync()
  )

  ipcMain.handle(
    'getReportListAsync',
    async (_, reportListGetCommand: ReportListGetCommand) =>
      await reportListApplicationService.getAsync(reportListGetCommand)
  )

  ipcMain.handle(
    'classifyAssessmentAsync',
    async (_, assessmentClassifyCommand: AssessmentClassifyCommand) =>
      await assessmentApplicationService.classifyAsync(
        assessmentClassifyCommand
      )
  )

  ipcMain.handle(
    'updateAssessmentFeedbackAsync',
    async (_, command: AssessmentFeedbackUpdateCommand) =>
      await assessmentApplicationService.updateFeedbackAsync(command)
  )

  ipcMain.handle(
    'updateAssessmentMemoAsync',
    async (_, command: AssessmentMemoUpdateCommand) =>
      await assessmentApplicationService.updateMemoAsync(command)
  )

  ipcMain.handle(
    'getSubmissionSummariesAsync',
    async (_, command: SubmissionSummariesGetCommand) =>
      await submissionSummaryApplicationService.getSubmissionSummariesAsync(
        command
      )
  )

  ipcMain.handle(
    'getSubmissionFileAsync',
    async (_, command: SubmissionFileGetCommand) =>
      await submissionFileApplicationService.getAsync(command)
  )

  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
