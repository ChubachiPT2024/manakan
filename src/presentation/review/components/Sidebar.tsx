import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'
import StudentSelectionRadioGroup from 'src/presentation/review/components/StudentSelectionRadioGroup'
import GradeSelect from 'src/presentation/review/components/GradeSelect'
import MemoTextarea from 'src/presentation/review/components/MemoTextarea'
import FeedbackTextarea from 'src/presentation/review/components/FeedbackTextarea'

// サイドバーのProps
interface IPropsSidebar {
  reportId: string
  submissionSummaries: SubmissionSummaryData[]
}

// reviewページサイドバーコンポーネント
const Sidebar: React.FC<IPropsSidebar> = ({
  reportId,
  submissionSummaries,
}) => {
  // 選択された学生
  const [selectedStudent, setSelectedStudent] =
    useState<SubmissionSummaryStudentData>(submissionSummaries[0].student)

  return (
    <div className="w-96 p-4 m-2 border-l-4 flex flex-col justify-start overflow-y-auto">
      <StudentSelectionRadioGroup
        submissionSummaries={submissionSummaries}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />

      {/* 提出者情報 */}
      <div className="flex flex-col m-1">
        <h2 className="text-xl font-bold mb-2">提出者情報</h2>
        <ul className="pl-3">
          <li className="mb-2">学生名：{selectedStudent.name}</li>
          <li className="mb-2">学籍番号：{selectedStudent.numId}</li>
          <li className="mb-2">
            提出日時：
            {
              submissionSummaries.find(
                (summary) => summary.student.numId === selectedStudent.numId
              )?.submission.submissionDateTime
            }
          </li>
        </ul>
      </div>

      {/* 評点 セレクトボタン*/}
      <GradeSelect
        reportId={reportId}
        submissionSummaries={submissionSummaries}
        selectedStudent={selectedStudent}
      />

      {/* TODO: rankをどう表現するか べつにセレクトボックスをもたせるかどうか　*/}

      {/* 点数 */}
      <div className="m-1">
        <h2 className="text-xl font-bold mb-2">点数</h2>
        <div className="pl-3">
          <TextField
            id="score"
            type="number"
            disabled
            value={
              submissionSummaries.find(
                (summary: SubmissionSummaryData) =>
                  summary.student.numId === selectedStudent.numId
              )?.assessment.score
            }
            variant="outlined"
            fullWidth
            inputProps={{
              'aria-label': 'Without label',
              min: 0,
              max: 100,
            }}
          />
        </div>
      </div>

      {/* メモ */}
      <MemoTextarea
        reportId={reportId}
        submissionSummaries={submissionSummaries}
        selectedStudent={selectedStudent}
      />

      {/* フィードバック */}
      <FeedbackTextarea
        reportId={reportId}
        submissionSummaries={submissionSummaries}
        selectedStudent={selectedStudent}
      />
    </div>
  )
}

export default Sidebar
