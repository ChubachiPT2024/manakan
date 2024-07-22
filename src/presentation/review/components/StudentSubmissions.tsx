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
  submission,
}) => {
  // ウィンドウの幅と高さを計算するための状態を定義
  const [dimensions, setDimensions] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  })

  // ウィンドウのリサイズイベントに対応するためのエフェクトを定義
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    // クリーンアップ関数でイベントリスナーを削除
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 学生毎の縦のdiv
  const { innerWidth, innerHeight } = dimensions
  const width = innerWidth / 2
  const height = `calc(${innerHeight}px - 6rem)`

  // PDF用div
  const pageHeight = (297 / 210) * width // A4縦の比率で高さを計算
  const pageWidth = width - 50 // 50pxは Submission Container の外側の div 用の スクロールバーの幅

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
          width={pageWidth}
          height={pageHeight}
        />
      </SubmissionContainer>
    </StudentSubmissionsHeader>
  )
}

export default StudentSubmissions
