import React from 'react'

interface SubmissionContainerProps {
  height: string
  children: React.ReactNode
}

const SubmissionContainer: React.FC<SubmissionContainerProps> = ({
  height,
  children,
}) => (
  // 複数ファイルの一番下が見切れる場合は pb を深くする / なんか自動調整できるようにしたい
  <div className="overflow-y-auto pb-8" style={{ height }}>
    {children}
  </div>
)

export default SubmissionContainer
