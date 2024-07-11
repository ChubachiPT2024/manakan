import { useEffect, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SubmissionCard } from '../classification/components/SubmissionCard'
import { SideMenu } from '../classification/components/SideMenu'
import { SelectedButton } from '../classification/components/SelectedButton'
import { GradeColumn } from '../classification/components/GradeColumn'
import { RankRow } from '../classification/components/RankRow'

const Classification = () => {
  const [draggingSubmissionId, setDraggingSubmissionId] = useState(null)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const handleDragStart = (event: DragStartEvent) => {
    setDraggingSubmissionId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggingSubmissionId(null)
    const { active, over } = event
    let columnId: number | null
    let rowId: number | null

    if (over && active.id !== over?.id) {
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) => {
          if (submission.id === Number(active.id)) {
            if (over.id !== 'has-not-grade') {
              const [overColumnId, overRowId] = (over.id as string).split('-')
              columnId = Number(overColumnId)
              rowId = Number(overRowId)
            }

            return {
              ...submission,
              columnId,
              rowId,
            }
          }
          return submission
        })
      )
    }
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.id === id
          ? { ...submission, isChecked: event.target.checked }
          : submission
      )
    )
  }

  //TODO:Delete dummy data
  const course = {
    name: '情報アーキテクチャ特論7',
  }
  const [gradeColumns, setGradeColumns] = useState<GradeColumn[]>([
    { id: 5, title: '5', submissionNum: 0 },
    { id: 4, title: '4', submissionNum: 0 },
    { id: 3, title: '3', submissionNum: 0 },
    { id: 2, title: '2', submissionNum: 0 },
    { id: 1, title: '1', submissionNum: 0 },
    { id: 0, title: '0', submissionNum: 0 },
  ])
  const rankRows = [
    { id: 5, title: '++' },
    { id: 4, title: '+' },
    { id: 3, title: '+-' },
    { id: 2, title: '-' },
    { id: 1, title: '--' },
  ]
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      studentName: 'ハリー',
      isChecked: false,
      rowId: 1,
      columnId: 2,
    },
    {
      id: 2,
      studentName: 'ロン',
      isChecked: false,
      rowId: null,
      columnId: null,
    },
    {
      id: 3,
      studentName: 'ハーマイオニー',
      isChecked: false,
      rowId: null,
      columnId: null,
    },
  ])

  useEffect(() => {
    setGradeColumns(
      gradeColumns.map((column) => ({
        ...column,
        submissionNum: submissions.filter(
          (submission) => submission.columnId === column.id
        ).length,
      }))
    )
  }, [submissions])

  useEffect(() => {
    const isCheckedInSubmissions = submissions.some(
      (submission) => submission.isChecked
    )
    setIsDisabled(!isCheckedInSubmissions)
  }, [submissions.map((s) => s.isChecked).join(',')])

  // BUG:https://github.com/clauderic/dnd-kit/issues/591
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  )

  const draggingSubmission = submissions.find(
    (submission) => submission.id === Number(draggingSubmissionId)
  )
  const notHasGradeSubmissions = submissions
    .filter((submission) => submission.id !== draggingSubmissionId)
    .filter((submission) => submission.columnId == null)
  const hasGradeSubmissions = submissions
    .filter((submission) => submission.id !== draggingSubmissionId)
    .filter((submission) => submission.columnId != null)

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {draggingSubmissionId && (
          <DragOverlay>
            <SubmissionCard
              key={draggingSubmissionId}
              id={draggingSubmissionId}
              submission={draggingSubmission}
              onChange={() => {}}
            />
          </DragOverlay>
        )}
        <div className="flex h-screen">
          <SideMenu isDisabled={notHasGradeSubmissions.length == 0}>
            {notHasGradeSubmissions.map((submission) => {
              return (
                <SubmissionCard
                  key={submission.id}
                  id={submission.id}
                  submission={submission}
                  onChange={(e) => handleCheckboxChange(e, submission.id)}
                />
              )
            })}
          </SideMenu>
          <div className="flex-1 overflow-hidden">
            <div className="pt-3 pl-3 h-full flex flex-col">
              <div className="pb-7 flex justify-between">
                <h1 className="text-2xl">{course.name}</h1>
                <div>
                  <SelectedButton
                    styles="bg-sky-400"
                    title="複数開く"
                    isDisabled={isDisabled}
                    onClick={() => {}}
                  />
                  <SelectedButton
                    styles="bg-red-400"
                    title="選択解除"
                    isDisabled={isDisabled}
                    onClick={() => {}}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex h-full">
                  {gradeColumns.map((column) => (
                    <GradeColumn
                      key={column.id}
                      title={column.title}
                      submissionNum={column.submissionNum}
                    >
                      {rankRows.map((row) => (
                        <RankRow
                          key={`${row.id}`}
                          id={`${column.id}-${row.id}`}
                          title={row.title}
                        >
                          {hasGradeSubmissions
                            .filter(
                              (submission) =>
                                `${submission.columnId}-${submission.rowId}` ===
                                `${column.id}-${row.id}`
                            )
                            .map((submission) => (
                              <SubmissionCard
                                key={submission.id}
                                id={submission.id}
                                submission={submission}
                                onChange={(e) =>
                                  handleCheckboxChange(e, submission.id)
                                }
                              />
                            ))}
                        </RankRow>
                      ))}
                    </GradeColumn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </>
  )
}

export default Classification
