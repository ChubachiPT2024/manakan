import TextField from '@mui/material/TextField'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'

// フィードバック入力欄のProps
interface FeedbackTextareaProps {
  reportId: string
  submissionSummaries: SubmissionSummaryData[]
  selectedStudent: SubmissionSummaryStudentData
}

// フィードバック入力欄コンポーネント
const FeedbackTextarea: React.FC<FeedbackTextareaProps> = ({
  reportId,
  submissionSummaries,
  selectedStudent,
}) => {
  // フィードバックの値
  const feedbackValue =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.feedback || ''

  return (
    <div className="m-1">
      <h2 className="text-xl font-bold mb-2">フィードバック</h2>
      <div className="pl-3">
        <TextField
          id="feedback"
          multiline
          rows={6}
          placeholder="学生に伝える為のフィードバックを記述して下さい。"
          value={feedbackValue}
          sx={{ m: '0' }}
          fullWidth
        />
      </div>
    </div>
  )
}

export default FeedbackTextarea
