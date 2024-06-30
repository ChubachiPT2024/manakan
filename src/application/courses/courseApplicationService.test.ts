import { InMemoryCourseRepository } from 'src/infrastructure/inMemory/courses/inMemoryCourseRepository'
import { describe, expect, test } from 'vitest'
import { CourseApplicationService } from './courseApplicationService'
import { CourseGetCommand } from './courseGetCommand'
import { Course } from 'src/domain/models/courses/course'

describe('get', () => {
  test('The service can get the course saved in the repository.', async () => {
    const repository = new InMemoryCourseRepository()
    const course = new Course(1, 'name')
    await repository.saveAsync(course)
    const service = new CourseApplicationService(repository)
    const command = new CourseGetCommand(course.id)

    const result = await service.getAsync(command)

    expect(result.courseData.id).toBe(course.id)
    expect(result.courseData.name).toBe(course.name)
  })
})
