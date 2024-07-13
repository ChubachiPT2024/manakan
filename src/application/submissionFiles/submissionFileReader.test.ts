import { describe, expect, test } from 'vitest'
import { SubmissionFileReader } from './submissionFileReader'

describe('read', () => {
  test('The result is the file content.', async () => {
    // Arrange
    const scanner = new SubmissionFileReader(
      __dirname,
      'submissionFileReaderTestData'
    )

    // Act
    const content = await scanner.readAsync('hello.txt')

    // Assert
    expect(new TextDecoder().decode(content)).toBe('hello')
  })
})
