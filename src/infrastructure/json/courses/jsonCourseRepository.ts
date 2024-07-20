import { Course } from 'src/domain/models/courses/course'
import { CourseRepository } from 'src/domain/models/courses/courseRepository'
import { readFile, writeFile } from 'node:fs/promises'
import { JsonCourseObject } from './jsonCourseObject'

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

    const index = courses.findIndex((x) => x.id === course.id)
    if (index === -1) {
      courses.push(course)
    } else {
      courses[index] = course
    }

    await this.writeToJsonFileAsync(courses)
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
   * コースを JSON ファイルから読み込む
   *
   * @returns コース
   */
  private async readFromJsonFileAsync(): Promise<Course[]> {
    try {
      const objects: Object[] = JSON.parse(
        await readFile(this.jsonFileAbsolutePath, 'utf8')
      )
      // https://www.geeksforgeeks.org/how-to-cast-a-json-object-inside-of-typescript-class/
      return objects.map((x) =>
        Object.assign(new JsonCourseObject(), x).ToCourse()
      )
    } catch {
      // まだファイルが存在しない場合
      return []
    }
  }

  /**
   * コースを JSON ファイルに書き込む
   *
   * @param courses コース
   */
  private async writeToJsonFileAsync(courses: Course[]): Promise<void> {
    await writeFile(this.jsonFileAbsolutePath, JSON.stringify(courses))
  }
}
