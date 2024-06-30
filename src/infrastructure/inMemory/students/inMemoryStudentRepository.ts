import { Student } from 'src/domain/models/students/student'
import { StudentRepository } from 'src/domain/models/students/studentRepository'

/**
 * インメモリ学生リポジトリ
 */
export class InMemoryStudentRepository implements StudentRepository {
  /**
   * 学生
   */
  private readonly students = new Map<number, Student>()

  /**
   * 学生を保存する
   *
   * @param student 学生
   */
  public async saveAsync(student: Student): Promise<void> {
    this.students.set(student.numId, student)
  }

  /**
   * 学生を検索する
   *
   * @param numId 学籍番号
   * @returns 学生
   */
  public async findAsync(numId: number): Promise<Student> {
    const student = this.students.get(numId)
    if (!student) {
      throw new Error('The student is not found.')
    }
    return student
  }
}
