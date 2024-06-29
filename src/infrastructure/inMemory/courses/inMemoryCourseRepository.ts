import { Course } from 'src/domain/models/courses/course'
import { CourseRepository } from 'src/domain/models/courses/courseRepository'

/**
 * インメモリコースリポジトリ
 */
export class InMemoryCourseRepository implements CourseRepository {
  /**
   * コース
   */
  private readonly courses = new Map<number, Course>()

  /**
   * コースを保存する
   *
   * @param course コース
   */
  public async saveAsync(course: Course): Promise<void> {
    this.courses.set(course.id, course)
  }

  /**
   * コースを検索する
   *
   * @param id ID
   * @returns コース
   */
  public async findAsync(id: number): Promise<Course> {
    const course = this.courses.get(id)
    if (!course) {
      throw new Error('The course is not found.')
    }
    return course
  }
}
