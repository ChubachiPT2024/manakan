import { Course } from './course'

/**
 * コースリポジトリ
 */
export interface CourseRepository {
  /**
   * コースを保存する
   *
   * @param course コース
   */
  saveAsync(course: Course): Promise<void>

  /**
   * コースを検索する
   *
   * @param id ID
   */
  findAsync(id: number): Promise<Course>
}
