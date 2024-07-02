import { describe, expect, test } from 'vitest'
import { InMemoryStudentRepository } from './inMemoryStudentRepository'
import { Student } from 'src/domain/models/students/student'

describe('save', () => {
  test('The saved student exists.', async () => {
    const repository = new InMemoryStudentRepository()
    const expected = new Student('a2301aa', 1, 'name')

    await repository.saveAsync(expected)

    const actual = await repository.findAsync(expected.numId)
    expect(actual.userId).toBe(expected.userId)
    expect(actual.numId).toBe(expected.numId)
    expect(actual.name).toBe(expected.name)
  })
})
