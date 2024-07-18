import { Student } from 'src/domain/models/students/student'
import { StudentRepository } from 'src/domain/models/students/studentRepository'
import { readFile, writeFile } from 'node:fs/promises'

/**
 * JSON 学生リポジトリ
 */
export class JsonStudentRepository implements StudentRepository {
  /**
   * コンストラクタ
   *
   * @param jsonFileAbsolutePath JSON ファイルの絶対パス
   */
  public constructor(private readonly jsonFileAbsolutePath: string) {}

  /**
   * 学生を保存する
   *
   * @param student 学生
   */
  public async saveAsync(student: Student): Promise<void> {
    const students = await this.readFromJsonFileAsync()
    const studentMap = new Map<number, Student>(
      students.map((x) => [x.numId, x])
    )
    studentMap.set(student.numId, student)

    await this.writeToJsonFileAsync(Array.from(studentMap.values()))
  }

  /**
   * 学生を検索する
   *
   * @param numId 学籍番号
   * @returns 学生
   */
  public async findAsync(numId: number): Promise<Student> {
    const students = await this.readFromJsonFileAsync()

    const student = students.find((x) => x.numId === numId)
    if (!student) {
      throw new Error('The student is not found.')
    }
    return student
  }

  /**
   * 学生を JSON ファイルから読み込む
   *
   * @returns 学生
   */
  private async readFromJsonFileAsync(): Promise<Student[]> {
    try {
      return JSON.parse(await readFile(this.jsonFileAbsolutePath, 'utf8'))
    } catch {
      // まだファイルが存在しない場合
      return []
    }
  }

  /**
   * 学生を JSON ファイルに書き込む
   *
   * @param students 学生
   */
  private async writeToJsonFileAsync(students: Student[]): Promise<void> {
    await writeFile(this.jsonFileAbsolutePath, JSON.stringify(students))
  }
}
