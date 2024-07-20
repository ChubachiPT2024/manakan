import { describe, expect, onTestFinished, test } from 'vitest'
import { JsonCourseRepository } from './jsonCourseRepository'
import { Course } from 'src/domain/models/courses/course'
import { mkdtemp, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { sep } from 'node:path'

describe('save', () => {
  test('The saved course exists.', async () => {
    // Arrange
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonCourseRepository(join(tmpDir, 'courses.json'))
    const expected = new Course(1, 'name')
    await repository.saveAsync(expected)

    // Act
    const actual = await repository.findAsync(expected.id)

    // Assert
    expect(actual.id).toBe(expected.id)
    expect(actual.name).toBe(expected.name)
  })

  test('should return all courses', async () => {
    // Arrange
    const tmpDir = await mkdtemp(`${tmpdir()}${sep}`)
    onTestFinished(() => rm(tmpDir, { recursive: true }))
    const repository = new JsonCourseRepository(join(tmpDir, 'courses.json'))
    const expected1 = new Course(1, 'name')
    const expected2 = new Course(2, 'name')
    await repository.saveAsync(expected1)
    await repository.saveAsync(expected2)

    // Act
    const actual = await repository.findAllAsync()

    // Assert
    expect(actual.length).toBe(2)
  })
})
