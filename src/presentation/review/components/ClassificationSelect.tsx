import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { SubmissionSummaryData } from 'src/application/submissionSummaries/submissionSummaryData'
import { SubmissionSummaryStudentData } from 'src/application/submissionSummaries/submissionSummaryStudentData'
import { AssessmentGrade } from 'src/domain/models/assessments/assessmentGrade'
import { AssessmentRank } from 'src/domain/models/assessments/assessmentRank'
import { AssessmentClassifyCommand } from 'src/application/assessments/assessmentClassifyCommand'
import { mutate } from 'swr'

// 分類選択コンポーネントのProps
interface ClassificationSelectProps {
  reportId: string
  submissionSummaries: SubmissionSummaryData[]
  selectedStudent: SubmissionSummaryStudentData
}

// 評点選択コンポーネント
const ClassificationSelect: React.FC<ClassificationSelectProps> = ({
  reportId,
  submissionSummaries,
  selectedStudent,
}) => {
  // 選択肢
  const grades: AssessmentGrade[] = [5, 4, 3, 2, 1, 0]
  const ranks: AssessmentRank[] = ['++', '+', '+-', '-', '--']
  const options = grades.flatMap((grade) => {
    if (grade === 0) return [`0`]
    return ranks.map((rank) => `${grade}${rank}`)
  })

  // 選択された学生の評点
  const initialSelectedGrade =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.grade ?? ''

  // 選択された学生の評点内の位置
  const initialSelectedRank =
    submissionSummaries.find(
      (summary: SubmissionSummaryData) =>
        summary.student.numId === selectedStudent.numId
    )?.assessment.rank ?? ''

  // 評点の値を状態として管理
  const [selectedGradeRank, setSelectedGradeRank] = useState<string>(
    initialSelectedGrade + initialSelectedRank
  )

  // 評点が変更されたら、評点を更新する
  const handleChange = async (event: SelectChangeEvent<string>) => {
    const newSelectedGradeRank = event.target.value as string
    setSelectedGradeRank(newSelectedGradeRank)

    // 0の場合は、評点を0に、ランクをundefinedにする
    // 評点は1桁目、ランクは2桁目以降 (例: 5++ -> 評点5, ランク++, 5+ -> 評点5, ランク+)
    let [newGrade, newRank] =
      newSelectedGradeRank.slice(0, 1) === '0'
        ? [0, undefined]
        : [
            Number(newSelectedGradeRank.slice(0, 1)),
            newSelectedGradeRank.slice(1),
          ]

    try {
      await window.electronAPI.classifyAssessmentAsync(
        new AssessmentClassifyCommand(
          Number(reportId),
          selectedStudent.numId,
          newGrade as AssessmentGrade,
          newRank as AssessmentRank
        )
      )
      // SWRのキャッシュを更新
      mutate('SubmissionSummaries')
    } catch (e: Error | any) {
      console.log(e)
    }
  }

  // selectedStudent が変わるたびにGradeとRankの値を更新
  // それぞれ、新しい学生の値を取得して、状態にセット
  useEffect(() => {
    const newGrade =
      submissionSummaries.find(
        (summary: SubmissionSummaryData) =>
          summary.student.numId === selectedStudent.numId
      )?.assessment.grade ?? ''
    const newRank =
      submissionSummaries.find(
        (summary: SubmissionSummaryData) =>
          summary.student.numId === selectedStudent.numId
      )?.assessment.rank ?? ''
    setSelectedGradeRank(newGrade + newRank)
  }, [selectedStudent])

  return (
    <>
      {/* 評点セレクト */}
      <div className="m-1">
        <h2 className="text-xl font-bold mb-2">分類</h2>
        <div className="pl-3">
          <FormControl fullWidth>
            <Select
              id="select"
              inputProps={{ 'aria-label': 'Without label' }}
              value={selectedGradeRank}
              displayEmpty
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                評点を選択して下さい
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  )
}

export default ClassificationSelect
