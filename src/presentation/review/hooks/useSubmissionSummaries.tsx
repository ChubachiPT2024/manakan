import { SubmissionSummariesGetCommand } from 'src/application/submissionSummaries/submissionSummariesGetCommand'
import { SubmissionSummariesGetResult } from 'src/application/submissionSummaries/submissionSummariesGetResult'
import useSWR from 'swr'

/**
 * 提出者サマリーを取得する
 *
 * @param reportId
 * @param studentNumIds
 * @returns
 */
async function getSubmissionSummaries(
  reportId: string,
  studentNumIds: number[]
): Promise<SubmissionSummariesGetResult> {
  return window.electronAPI.getSubmissionSummariesAsync(
    new SubmissionSummariesGetCommand(Number(reportId), studentNumIds)
  )
}

// useSWRを使ったカスタムフック
export const useSubmissionSummaries = (
  reportId: string,
  studentNumIds: number[]
) => {
  const { data, error, isLoading } = useSWR<SubmissionSummariesGetResult>(
    'SubmissionSummaries',
    () => getSubmissionSummaries(reportId, studentNumIds)
  )

  return {
    //　疑問点:reportIdも返す必要があるかどうか
    submissionSummaries: data?.submissionSummaries,
    error,
    isLoading,
  }
}
