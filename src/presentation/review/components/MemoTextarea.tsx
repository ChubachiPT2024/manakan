import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'
import { AssessmentMemoUpdateCommand } from 'src/application/assessments/assessmentMemoUpdateCommand'
import { mutate } from 'swr'

// メモ入力欄のProps
interface MemoTextareaProps {
  reportId: string
  submissionSummaries: SubmissionSummaryData[]
  selectedStudent: SubmissionSummaryStudentData
}

// メモ入力欄コンポーネント
const MemoTextarea: React.FC<MemoTextareaProps> = ({
  reportId,
  submissionSummaries,
  selectedStudent,
}) => {
  // 初期メモの値
  const initialMemoValue =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.memo || ''

  // メモの値を状態として管理
  const [memoValue, setMemoValue] = useState<string>(initialMemoValue)

  // selectedStudent が変わるたびにメモの値を更新
  useEffect(() => {
    const newMemoValue =
      submissionSummaries.find(
        (summary: SubmissionSummaryData) =>
          summary.student.numId === selectedStudent.numId
      )?.assessment.memo || ''
    setMemoValue(newMemoValue)
  }, [selectedStudent])

  // フォーカスが外れたら、メモを更新する
  const handleBlur = async () => {
    try {
      await window.electronAPI.updateAssessmentMemoAsync(
        new AssessmentMemoUpdateCommand(
          Number(reportId),
          selectedStudent.numId,
          memoValue
        )
      )
      // SWRのキャッシュを更新
      mutate('SubmissionSummaries')
    } catch (e: Error | any) {
      console.log(e)
    }
  }

  return (
    <div className="m-1">
      <h2 className="text-xl font-bold mb-2">メモ</h2>
      <div className="pl-3">
        <TextField
          id="memo"
          multiline
          rows={6}
          placeholder="評価の為の一時的なメモを記述して下さい。このデータはmanabaには反映されません。"
          value={memoValue}
          sx={{ m: '0' }}
          fullWidth
          onChange={(e) => setMemoValue(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  )
}

export default MemoTextarea
