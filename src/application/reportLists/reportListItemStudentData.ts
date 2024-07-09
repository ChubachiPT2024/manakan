import { Student } from 'src/domain/models/students/student'

/**
 * レポートリスト項目学生データ
 */
export class ReportListItemStudentData {
  /**
   * ユーザ ID
   */
  public readonly userId: string

  /**
   * 学籍番号
   */
  public readonly numId: number

  /**
   * 氏名
   */
  public readonly name: string

  /**
   * コンストラクタ
   *
   * @param student 学生
   */
  public constructor(student: Student) {
    this.userId = student.userId
    this.numId = student.numId
    this.name = student.name
  }
}
