import React from 'react'
import StudentSubmissionsHeader from './StudentSubmissionsHeader'
import SubmissionContainer from './SubmissionContainer'

interface SubmissionTextContainerProps {
  height: string
  width: number
  student: {
    name: string
    numId: number
    userId: string
  }
  children: React.ReactNode
}

const SubmissionTextContainer: React.FC<SubmissionTextContainerProps> = ({
  height,
  width,
  student,
  children,
}) => (
  <StudentSubmissionsHeader student={student} style={{ height, width }}>
    <SubmissionContainer height={height}>{children}</SubmissionContainer>
  </StudentSubmissionsHeader>
)

export default SubmissionTextContainer
