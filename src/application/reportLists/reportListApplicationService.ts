import { CourseRepository } from 'src/domain/models/courses/courseRepository'
import { ReportListImportCommand } from './reportListImportCommand'
import * as Excel from 'exceljs'
import { Course } from 'src/domain/models/courses/course'
import { ReportRepository } from 'src/domain/models/reports/reportRepository'
import { Report } from 'src/domain/models/reports/report'
import { StudentRepository } from 'src/domain/models/students/studentRepository'
import { Student } from 'src/domain/models/students/student'
import { SubmissionRepository } from 'src/domain/models/submissions/submissionRepository'
import { Submission } from 'src/domain/models/submissions/submission'
import { AssessmentRepository } from 'src/domain/models/assessments/assessmentRepository'
import { Assessment } from 'src/domain/models/assessments/assessment'

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
   * @param submissionRepository 提出物リポジトリ
   * @param assessmentRepository 個別評価リポジトリ
   */
  public constructor(
    private readonly courseRepository: CourseRepository,
    private readonly reportRepository: ReportRepository,
    private readonly studentRepository: StudentRepository,
    private readonly submissionRepository: SubmissionRepository,
    private readonly assessmentRepository: AssessmentRepository
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

      // TODO できればハイパーリンクから取得
      // なぜか isHyperlink が false, hyperlink が undefined で取得できなかった
      const folderRelativePath = `${numId}@${userId}`
      await this.submissionRepository.saveAsync(
        new Submission(reportId, numId, folderRelativePath)
      )

      // レポート ID と学籍番号以外は未定義で作成
      // もし、最初から Excel に値が入っていることがあり得るなら要修正
      await this.assessmentRepository.saveAsync(new Assessment(reportId, numId))
    }

    return reportId
  }
}
