import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'
import { AssessmentGrade } from 'src/domain/models/assessments/assessmentGrade'

// 評点選択コンポーネントのProps
interface GradeSelectProps {
  reportId: string
  submissionSummaries: SubmissionSummaryData[]
  selectedStudent: SubmissionSummaryStudentData
}

// 評点選択コンポーネント
const GradeSelect: React.FC<GradeSelectProps> = ({
  reportId,
  submissionSummaries,
  selectedStudent,
}) => {
  // 評点の選択肢
  const menuItems = Array.from({ length: 6 }, (_, index) => (
    <MenuItem key={index} value={(5 - index) as AssessmentGrade}>
      {5 - index}
    </MenuItem>
  ))

  // 選択された学生の評点
  const selectedGrade =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.grade || ''

  return (
    <div className="m-1">
      <h2 className="text-xl font-bold mb-2">分類</h2>
      <div className="pl-3">
        <FormControl fullWidth>
          <Select
            id="select"
            inputProps={{ 'aria-label': 'Without label' }}
            value={selectedGrade}
            displayEmpty
          >
            <MenuItem value="" disabled>
              評点を選択して下さい
            </MenuItem>
            {menuItems}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default GradeSelect
