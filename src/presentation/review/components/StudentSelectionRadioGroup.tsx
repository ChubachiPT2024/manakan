import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'

// 学生選択ラジオボタンのProps
interface IPropsStudentSelectionRadioGroup {
  submissionSummaries: SubmissionSummaryData[]
  selectedStudent: SubmissionSummaryStudentData
  setSelectedStudent: React.Dispatch<
    React.SetStateAction<SubmissionSummaryStudentData>
  >
}

// 学生選択ラジオボタン
const StudenSelectionRadioGroup: React.FC<IPropsStudentSelectionRadioGroup> = ({
  submissionSummaries,
  selectedStudent,
  setSelectedStudent,
}) => {
  // 学生選択ラジオボタンでの選択時の処理
  const handleStudentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === Number(event.target.value)
    )
    if (selected) {
      setSelectedStudent(selected.student)
    }
  }

  return (
    <div className="flex flex-col m-1">
      <FormControl>
        <h2 className="text-xl font-bold mb-1">学生選択</h2>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          value={selectedStudent.numId}
          name="radio-buttons-group"
          onChange={handleStudentChange}
        >
          {submissionSummaries.map((summary: SubmissionSummaryData) => (
            <FormControlLabel
              key={summary.student.numId}
              value={summary.student.numId}
              control={<Radio />}
              label={summary.student.name}
              sx={{ m: '0' }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default StudenSelectionRadioGroup
