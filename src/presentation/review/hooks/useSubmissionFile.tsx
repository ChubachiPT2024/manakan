import { SubmissionFileGetCommand } from 'src/application/submissionFiles/submissionFileGetCommand'
import { SubmissionFileGetResult } from 'src/application/submissionFiles/submissionFileGetResult'
import useSWR from 'swr'

/**
 * 提出物のファイルを取得する
 *
 * @param reportId レポート ID
 * @param studentNumId 学籍番号
 * @param file ファイル名
 * @returns ファイル名とURL
 */
async function getSubmissionFile(
  reportId: number,
  studentNumId: number,
  file: string
) {
  const response = await window.electronAPI.getSubmissionFileAsync(
    new SubmissionFileGetCommand(reportId, studentNumId, file)
  )
  const blob = new Blob([response.content], { type: 'application/pdf' })
  return { name: file, url: URL.createObjectURL(blob) }
}

// useSWRを使ったカスタムフック
export const useSubmissionFile = (
  reportId: number,
  studentNumId: number,
  files: string[]
) => {
  const {
    data: pdfUrls,
    error,
    isLoading,
  } = useSWR<{ name: string; url: string }[]>('submissionFiles', () =>
    Promise.all(
      files.map((file) => getSubmissionFile(reportId, studentNumId, file))
    )
  )

  return {
    pdfUrls,
    error,
    isLoading,
  }
}
