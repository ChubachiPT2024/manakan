import React from 'react'

interface Student {
  name: string
  numId: number
  userId: string
}

interface StudentHeaderProps {
  student: Student
  style: React.CSSProperties
  children?: React.ReactNode
}

const StudentHeader: React.FC<StudentHeaderProps> = ({
  student,
  style,
  children,
}) => (
  <div className="text-center p-4 border-x" style={style}>
    <h2 className="text-2xl font-bold">{student.name}</h2>
    {children}
  </div>
)

export default StudentHeader
