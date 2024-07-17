import { describe, expect, test } from 'vitest'
import { InMemoryCourseRepository } from './inMemoryCourseRepository'
import { Course } from 'src/domain/models/courses/course'

describe('save', () => {
  test('The saved course exists.', async () => {
    const repository = new InMemoryCourseRepository()
    const expected = new Course(1, 'name')

    await repository.saveAsync(expected)

    const actual = await repository.findAsync(expected.id)
    expect(actual.id).toBe(expected.id)
    expect(actual.name).toBe(expected.name)
  })

  test('should return all courses', async () => {
    const repository = new InMemoryCourseRepository()
    const expected1 = new Course(1, 'name')
    const expected2 = new Course(2, 'name')

    await repository.saveAsync(expected1)
    await repository.saveAsync(expected2)

    const actual = await repository.findAllAsync()
    expect(actual.length).toBe(2)
  })
})
