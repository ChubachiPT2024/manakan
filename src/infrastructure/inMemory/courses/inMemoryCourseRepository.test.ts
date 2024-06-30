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
})
