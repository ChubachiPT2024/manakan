import React, { useEffect, useState } from 'react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { SubmissionFileGetCommand } from 'src/application/submissionFiles/submissionFileGetCommand'
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
  height: string
  width: number
  pageHeight: number
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
  height,
  width,
  pageHeight,
  submission,
}) => {
  // 未提出の場合は例外テキストを表示
  if (!submission.isSubmitted) {
    return (
      <StudentSubmissionsHeader student={student} style={{ height, width }}>
        <SubmissionContainer height={height}>
          <p className="border border-gray-300 p-4 rounded bg-gray-100">
            未提出の為、表示するデータがありません
          </p>
        </SubmissionContainer>
      </StudentSubmissionsHeader>
    )
  }

  const [pdfFiles, setPdfFiles] = useState<{ name: string; url: string }[]>([])

  // useEffect(() => {
  //   const fetchPdfFiles = async () => {
  //     const pdfDataPromises = files.map(async (file) => {
  //       const response = await window.electronAPI.getSubmissionFileAsync(
  //         new SubmissionFileGetCommand(reportId, student.numId, file)
  //       )
  //       const blob = new Blob([response.content], { type: 'application/pdf' })
  //       return { name: file, url: URL.createObjectURL(blob) }
  //     })

  //     const pdfFilesArray = await Promise.all(pdfDataPromises)
  //     setPdfFiles(pdfFilesArray)

  //     return () => {
  //       // クリーンアップ: URLオブジェクトを解放
  //       pdfFilesArray.forEach((file) => URL.revokeObjectURL(file.url))
  //     }
  //   }

  //   fetchPdfFiles()
  // }, [reportId, student.numId, files])

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
    <StudentSubmissionsHeader student={student} style={{ height, width }}>
      <SubmissionContainer height={height}>
        <SubmissionPdfContainer
          files={pdfUrls}
          width={width}
          pageHeight={pageHeight}
        />
      </SubmissionContainer>
    </StudentSubmissionsHeader>
  )
}

export default StudentSubmissions
