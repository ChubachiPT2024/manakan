import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'
import { AssessmentFeedbackUpdateCommand } from 'src/application/assessments/assessmentFeedbackUpdateCommand'

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
  const initialFeedbackValue =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.feedback || ''

  // フィードバックの値を状態として管理
  const [feedbackValue, setFeedbackValue] =
    useState<string>(initialFeedbackValue)

  // selectedStudent が変わるたびにフィードバックの値を更新
  useEffect(() => {
    const newFeedbackValue =
      submissionSummaries.find(
        (summary: SubmissionSummaryData) =>
          summary.student.numId === selectedStudent.numId
      )?.assessment.feedback || ''
    setFeedbackValue(newFeedbackValue)
  }, [selectedStudent])

  // フォーカスが外れたら、フィードバックを更新する
  const handleBlur = async () => {
    try {
      await window.electronAPI.updateAssessmentFeedbackAsync(
        new AssessmentFeedbackUpdateCommand(
          Number(reportId),
          selectedStudent.numId,
          feedbackValue
        )
      )
    } catch (e: Error | any) {
      console.log(e)
    }
  }

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
          onChange={(e) => setFeedbackValue(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  )
}

export default FeedbackTextarea
