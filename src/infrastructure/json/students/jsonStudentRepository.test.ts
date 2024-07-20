import { describe, expect, onTestFinished, test } from 'vitest'
import { JsonStudentRepository } from './jsonStudentRepository'
import { Student } from 'src/domain/models/students/student'
import { mkdtemp, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { sep } from 'node:path'

describe('save', () => {
  test('The saved student exists.', async () => {
    // Arrange
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonStudentRepository(join(tmpDir, 'students.json'))
    const expected = new Student('a2301aa', 1, 'name')

    // Act
    await repository.saveAsync(expected)

    // Assert
    const actual = await repository.findAsync(expected.numId)
    expect(actual.userId).toBe(expected.userId)
    expect(actual.numId).toBe(expected.numId)
    expect(actual.name).toBe(expected.name)
  })
})
