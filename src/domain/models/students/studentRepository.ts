import { Student } from './student'

/**
 * 学生リポジトリ
 */
export interface StudentRepository {
  /**
   * 学生を保存する
   *
   * @param student 学生
   */
  saveAsync(student: Student): Promise<void>

  /**
   * 学生を検索する
   *
   * @param numId 学籍番号
   * @returns 学生
   */
  findAsync(numId: number): Promise<Student>
}
