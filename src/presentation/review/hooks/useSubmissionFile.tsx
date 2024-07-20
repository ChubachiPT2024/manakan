import { SubmissionFileGetCommand } from 'src/application/submissionFiles/submissionFileGetCommand'
import { SubmissionFileGetResult } from 'src/application/submissionFiles/submissionFileGetResult'
import useSWR from 'swr'

/**
 * 提出物のファイルを取得する
 *
 * @param reportId
 * @param studentNumId
 * @param files
 * @returns
 */
async function getSubmissionFile(
  reportId: number,
  studentNumId: number,
  files: string[]
) {
  const pdfDataPromises = files.map(async (file) => {
    const response = await window.electronAPI.getSubmissionFileAsync(
      new SubmissionFileGetCommand(reportId, studentNumId, file)
    )
    const blob = new Blob([response.content], { type: 'application/pdf' })
    return { name: file, url: URL.createObjectURL(blob) }
  })

  return await Promise.all(pdfDataPromises)
}

// useSWRを使ったカスタムフック
export const useSubmissionFile = (
  reportId: number,
  studentNumId: number,
  files: string[]
) => {
  const { data: pdfUrls, error } = useSWR('submissionFiles', () =>
    getSubmissionFile(reportId, studentNumId, files)
  )
  return {
    pdfUrls,
    error,
  }
}
