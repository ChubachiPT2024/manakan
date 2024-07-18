import { Student } from 'src/domain/models/students/student'

/**
 * JSON 学生オブジェクト
 */
export class JsonStudentObject {
  /**
   * ユーザ ID
   */
  public userId: string

  /**
   * 学籍番号
   */
  public numId: number

  /**
   * 氏名
   */
  public name: string

  /**
   * 学生に変換する
   */
  public ToStudent(): Student {
    return new Student(this.userId, this.numId, this.name)
  }
}
