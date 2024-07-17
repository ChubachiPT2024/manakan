import { Course } from 'src/domain/models/courses/course'
import { CourseRepository } from 'src/domain/models/courses/courseRepository'
import { readFile, writeFile } from 'node:fs/promises'

/**
 * JSON コースリポジトリ
 */
export class JsonCourseRepository implements CourseRepository {
  /**
   * コンストラクタ
   *
   * @param jsonFileAbsolutePath JSON ファイルの絶対パス
   */
  public constructor(private readonly jsonFileAbsolutePath: string) {}

  /**
   * コースを保存する
   *
   * @param course コース
   */
  public async saveAsync(course: Course): Promise<void> {
    const courses = await this.readFromJsonFileAsync()

    const courseMap = new Map<number, Course>(courses.map((x) => [x.id, x]))
    courseMap.set(course.id, course)

    await this.writeToJsonFileAsync(Array.from(courseMap.values()))
  }

  /**
   * コースを検索する
   *
   * @param id ID
   * @returns コース
   */
  public async findAsync(id: number): Promise<Course> {
    const courses = await this.readFromJsonFileAsync()

    const course = courses.find((x) => x.id === id)
    if (!course) {
      throw new Error('The course is not found.')
    }
    return course
  }

  /**
   * コースを全件取得する
   *
   * @returns コース
   */
  public async findAllAsync(): Promise<Course[]> {
    return await this.readFromJsonFileAsync()
  }

  /**
   * コースリストを JSON ファイルから読み込む
   *
   * @returns コースリスト
   */
  private async readFromJsonFileAsync(): Promise<Course[]> {
    try {
      return JSON.parse(await readFile(this.jsonFileAbsolutePath, 'utf8'))
    } catch {
      // まだファイルが存在しない場合
      return []
    }
  }

  /**
   * コースリストをJSON ファイルに書き込む
   *
   * @param courses コースリスト
   */
  private async writeToJsonFileAsync(courses: Course[]): Promise<void> {
    await writeFile(this.jsonFileAbsolutePath, JSON.stringify(courses))
  }
}
