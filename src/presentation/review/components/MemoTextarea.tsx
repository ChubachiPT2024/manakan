import TextField from '@mui/material/TextField'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'

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
  // メモの値
  const memoValue =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.memo || ''

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
        />
      </div>
    </div>
  )
}

export default MemoTextarea
