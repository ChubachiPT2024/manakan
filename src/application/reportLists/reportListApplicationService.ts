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
import { ReportListGetResult } from './reportListGetResult'
import { ReportListGetCommand } from './reportListGetCommand'
import { ReportListItemData } from './reportListItemData'
import { ReportListItemSubmissionData } from './reportListItemSubmissionData'
import { ReportListItemAssessmentData } from './reportListItemAssessmentData'
import { ReportListItemStudentData } from './reportListItemStudentData'
import { ReportListData } from './reportListData'
import path from 'path'
import { ReportListExportCommand } from './reportListExportCommand'
import { ReportListExportResult } from './reportListExportResult'

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
    await workbook.xlsx.readFile(
      reportListImportCommand.reportListFileAbsolutePath
    )

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
    const reportListFolderAbsolutePath = path.dirname(
      reportListImportCommand.reportListFileAbsolutePath
    )
    await this.reportRepository.saveAsync(
      new Report(courseId, reportId, reportTitle, reportListFolderAbsolutePath)
    )

    for (const row of this.getStudentRows(worksheet)) {
      const userId: string = row.getCell('B').text
      const numId: number = Number(row.getCell('C').text)
      const name: string = row.getCell('D').text
      await this.studentRepository.saveAsync(new Student(userId, numId, name))

      const isSubmitted = row.getCell('J').text === '提出済'
      if (isSubmitted) {
        const submittedDateTime: string = row.getCell('K').text
        const submissionCount: number = Number(row.getCell('L').text)

        // TODO できればハイパーリンクから取得
        // なぜか isHyperlink が false, hyperlink が undefined で取得できなかった
        const folderRelativePath = `${numId}@${userId}`

        await this.submissionRepository.saveAsync(
          new Submission(
            reportId,
            numId,
            true,
            submittedDateTime,
            submissionCount,
            folderRelativePath
          )
        )
      } else {
        await this.submissionRepository.saveAsync(
          new Submission(reportId, numId, false)
        )
      }

      // レポート ID と学籍番号以外は未定義で作成
      // もし、最初から Excel に値が入っていることがあり得るなら要修正
      await this.assessmentRepository.saveAsync(new Assessment(reportId, numId))
    }

    return reportId
  }

  /**
   * レポートリストを取得する
   *
   * @param command レポートリスト取得コマンド
   * @returns レポートリスト取得結果
   */
  public async getAsync(
    command: ReportListGetCommand
  ): Promise<ReportListGetResult> {
    // 対象のレポートについて、学籍番号を Key, 提出物を Value とする Map を作成
    const submissions = await this.submissionRepository.findByReportIdAsync(
      command.reportId
    )
    const submissionMap = new Map(submissions.map((x) => [x.studentNumId, x]))

    // 対象のレポートについて、学籍番号を Key, 個別評価を Value とする Map を作成
    const assessments = await this.assessmentRepository.findByReportIdAsync(
      command.reportId
    )
    const assessmentMap = new Map(assessments.map((x) => [x.studentNumId, x]))

    const items: ReportListItemData[] = []
    for (const studentNumId of submissionMap.keys()) {
      const student = await this.studentRepository.findAsync(studentNumId)
      items.push(
        new ReportListItemData(
          new ReportListItemStudentData(student),
          new ReportListItemSubmissionData(submissionMap.get(studentNumId)),
          new ReportListItemAssessmentData(assessmentMap.get(studentNumId))
        )
      )
    }

    const report = await this.reportRepository.findAsync(command.reportId)
    const course = await this.courseRepository.findAsync(report.courseId)

    return new ReportListGetResult(
      new ReportListData(course.id, course.name, report.id, report.title, items)
    )
  }

  /**
   * レポートリストをエクスポートする
   *
   * @param command レポートリストエクスポートコマンド
   * @returns レポートリストエクスポート結果
   */
  public async exportAsync(
    command: ReportListExportCommand
  ): Promise<ReportListExportResult> {
    const report = await this.reportRepository.findAsync(command.reportId)

    const workbook = new Excel.Workbook()
    await workbook.xlsx.readFile(
      path.join(report.reportListFolderAbsolutePath, 'reportlist.xlsx')
    )

    // id によるアクセスは非推奨らしいので、名前でアクセス
    // https://github.com/exceljs/exceljs?tab=readme-ov-file#access-worksheets
    const worksheet = workbook.getWorksheet('Sheet1')
    if (!worksheet) {
      throw new Error('The Worksheet Sheet1 is not found.')
    }

    for (const row of this.getStudentRows(worksheet)) {
      const studentNumId = Number(row.getCell('C').text)
      const assessment = await this.assessmentRepository.findAsync(
        command.reportId,
        studentNumId
      )

      if (assessment.getScore() !== undefined) {
        row.getCell('G').value = assessment.getScore()
      }
      if (assessment.grade !== undefined) {
        row.getCell('H').value = assessment.grade
      }
      if (assessment.feedback !== undefined) {
        row.getCell('I').value = assessment.feedback
      }
    }

    return new ReportListExportResult(
      new Uint8Array(await workbook.xlsx.writeBuffer())
    )
  }

  /**
   * 学生の行を取得する
   *
   * @param worksheet ワークシート
   * @returns 学生の行
   */
  private getStudentRows(worksheet: Excel.Worksheet): Excel.Row[] {
    const rows = []
    for (let i = 8; ; i++) {
      const row = worksheet.getRow(i)
      const role = row.getCell('A').text
      if (role === '#end') {
        break
      }
      if (role === '履修生') {
        rows.push(row)
      }
    }
    return rows
  }
}
