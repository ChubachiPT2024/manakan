import { CourseRepository } from 'src/domain/models/courses/courseRepository'
import { ReportListImportCommand } from './reportListImportCommand'
import * as Excel from 'exceljs'
import { Course } from 'src/domain/models/courses/course'

/**
 * レポートリストアプリケーションサービス
 */
export class ReportListApplicationService {
  /**
   * コンストラクタ
   *
   * @param courseRepository コースリポジトリ
   */
  public constructor(private readonly courseRepository: CourseRepository) {}

  /**
   * レポートリストをインポートする
   *
   * @param reportListImportCommand レポートリストインポートコマンド
   * @returns レポート ID
   */
  public async importAsync(
    reportListImportCommand: ReportListImportCommand
  ): Promise<number> {
    const workbook = new Excel.Workbook()
    await workbook.xlsx.readFile(reportListImportCommand.reportListFilePath)

    // id によるアクセスは非推奨らしいので、名前でアクセス
    // https://github.com/exceljs/exceljs?tab=readme-ov-file#access-worksheets
    const worksheet = workbook.getWorksheet('Sheet1')
    if (!worksheet) {
      throw new Error('The Worksheet Sheet1 is not found.')
    }

    const courseId = Number(worksheet.getCell('B2').text)
    const courseName = worksheet.getCell('C2').text
    await this.courseRepository.saveAsync(new Course(courseId, courseName))

    const reportId = Number(worksheet.getCell('B3').text)

    return reportId
  }
}
