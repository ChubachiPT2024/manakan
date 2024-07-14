import { describe, expect, test } from 'vitest'
import { SubmissionFolderScanner } from './submissionFolderScanner'

describe('scan', () => {
  test('The result contains all the files.', async () => {
    // Arrange
    const scanner = new SubmissionFolderScanner(
      __dirname,
      'submissionFolderScannerTestData'
    )

    // Act
    const files = await scanner.scanAsync()

    // Assert
    expect(files).toContain('a.txt')
    expect(files).toContain('b.pdf')
    expect(files).toContain('日本語.txt')
  })
})
