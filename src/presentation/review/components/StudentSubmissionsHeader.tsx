import React from 'react'

interface Student {
  name: string
  numId: number
  userId: string
}

interface StudentSubmissionsHeaderProps {
  student: Student
  style: React.CSSProperties
  children?: React.ReactNode
}

const StudentSubmissionsHeader: React.FC<StudentSubmissionsHeaderProps> = ({
  student,
  style,
  children,
}) => (
  <div
    className="text-center p-4 border-x overflow-x-auto overflow-y-hidden"
    style={style}
  >
    <h2 className="text-2xl font-bold">{student.name}</h2>
    {children}
  </div>
)

export default StudentSubmissionsHeader
