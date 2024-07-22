import React from 'react'

interface SubmissionContainerProps {
  height: string
  children: React.ReactNode
}

const SubmissionContainer: React.FC<SubmissionContainerProps> = ({
  height,
  children,
}) => (
  <div className="overflow-y-auto pb-4" style={{ height }}>
    {children}
  </div>
)

export default SubmissionContainer
