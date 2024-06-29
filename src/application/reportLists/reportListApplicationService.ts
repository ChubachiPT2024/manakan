import { CourseRepository } from 'src/domain/models/courses/courseRepository'
import { ReportListImportCommand } from './reportListImportCommand'
import * as Excel from 'exceljs'
import { Course } from 'src/domain/models/courses/course'
import { ReportRepository } from 'src/domain/models/reports/reportRepository'
import { Report } from 'src/domain/models/reports/report'
import { StudentRepository } from 'src/domain/models/students/studentRepository'
import { Student } from 'src/domain/models/students/student'

/**
 * レポートリストアプリケーションサービス
 */
export class ReportListApplicationService {
  /**
   * コンストラクタ
   *
   * @param courseRepository コースリポジトリ
   * @param reportRepository レポートリポジトリ
   * @param studentRepository 学生リポジトリ
   */
  public constructor(
    private readonly courseRepository: CourseRepository,
    private readonly reportRepository: ReportRepository,
    private readonly studentRepository: StudentRepository
  ) {}

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
    const reportTitle = worksheet.getCell('C3').text
    await this.reportRepository.saveAsync(
      new Report(courseId, reportId, reportTitle)
    )

    for (let i = 8; ; i++) {
      const row = worksheet.getRow(i)
      const role = row.getCell('A').text
      if (role === '#end') {
        break
      }
      if (role !== '履修生') {
        continue
      }

      const userId: string = row.getCell('B').text
      const numId: number = Number(row.getCell('C').text)
      const name: string = row.getCell('D').text
      await this.studentRepository.saveAsync(new Student(userId, numId, name))
    }

    return reportId
  }
}
