// 'electron/main' から import すると Vite がエラーを出す
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { ReportListApplicationService } from './application/reportLists/reportListApplicationService'
import { InMemoryStudentRepository } from './infrastructure/inMemory/students/inMemoryStudentRepository'
import { InMemoryReportRepository } from './infrastructure/inMemory/reports/inMemoryReportRepository'
import { InMemoryCourseRepository } from './infrastructure/inMemory/courses/inMemoryCourseRepository'
import { ReportListImportCommand } from './application/reportLists/reportListImportCommand'

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
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// TODO 定義場所の検討
// TODO DI フレームワークの利用を検討
const courseRepository = new InMemoryCourseRepository()
const reportRepository = new InMemoryReportRepository()
const studentRepository = new InMemoryStudentRepository()
const reportListApplicationService = new ReportListApplicationService(
  courseRepository,
  reportRepository,
  studentRepository
)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle(
    'importReportListAsync',
    async (_, reportListImportCommand: ReportListImportCommand) => {
      return await reportListApplicationService.importAsync(
        reportListImportCommand
      )
    }
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
