import React, { useEffect, useState } from 'react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import StudentSubmissionsHeader from './StudentSubmissionsHeader'
import SubmissionContainer from './SubmissionContainer'
import SubmissionPdfContainer from './SubmissionPdfContainer'
import { useSubmissionFile } from '../hooks/useSubmissionFile'
import Spinner from 'src/presentation/common/isLoading/Spinner'

interface Student {
  name: string
  numId: number
  userId: string
}

interface StudentSubmissionsProps {
  reportId: number
  student: Student
  files: string[]
  // height: string
  width: number
  submission: Submission
}

interface Submission {
  isSubmitted: boolean
  submissionDateTime?: string
  submissionCount?: number
}

const StudentSubmissions: React.FC<StudentSubmissionsProps> = ({
  reportId,
  student,
  files,
  // height,
  width,
  submission,
}) => {
  const height = 'calc(100vh - 6rem)'
  const pageHeight = (297 / 210) * width // A4縦の比率で高さを計算

  // 未提出の場合は例外テキストを表示
  if (!submission.isSubmitted) {
    return (
      <StudentSubmissionsHeader
        student={student}
        style={{ height, width, flexShrink: 0 }}
      >
        <SubmissionContainer height={height}>
          <p className="border border-gray-300 p-4 rounded bg-gray-100">
            未提出の為、表示するデータがありません
          </p>
        </SubmissionContainer>
      </StudentSubmissionsHeader>
    )
  }

  // 提出物の取得
  const { pdfUrls, error, isLoading } = useSubmissionFile(
    reportId,
    student.numId,
    files
  )
  if (error) {
    return (
      <StudentSubmissionsHeader student={student} style={{ height, width }}>
        <SubmissionContainer height={height}>
          <p className="border border-gray-300 p-4 rounded bg-gray-100">
            提出物の取得に失敗しました
          </p>
        </SubmissionContainer>
      </StudentSubmissionsHeader>
    )
  }

  if (isLoading) return <Spinner />

  return (
    <StudentSubmissionsHeader
      student={student}
      style={{ height, width, flexShrink: 0 }}
    >
      <SubmissionContainer height={height}>
        <SubmissionPdfContainer
          files={pdfUrls}
          width={width - 50} // 50pxは Submission Container の外側の div 用の スクロールバーの幅
          pageHeight={pageHeight}
        />
      </SubmissionContainer>
    </StudentSubmissionsHeader>
  )
}

export default StudentSubmissions
