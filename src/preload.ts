// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// 'electron/renderer' から import すると Vite がエラーを出す
import { contextBridge, ipcRenderer } from 'electron'
import { ReportListImportCommand } from './application/reportLists/reportListImportCommand'

contextBridge.exposeInMainWorld('electronAPI', {
  importReportListAsync: (reportListImportCommand: ReportListImportCommand) =>
    ipcRenderer.invoke('importReportListAsync', reportListImportCommand),
})
