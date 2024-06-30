import { ReportListImportCommand } from 'src/application/reportLists/reportListImportCommand'

// 型付きで API を公開するための定義
// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript
export interface IElectronAPI {
  importReportListAsync: (
    reportListImportCommand: ReportListImportCommand
  ) => Promise<number>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
