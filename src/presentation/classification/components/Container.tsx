import { useEffect, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { GradeColumn } from './GradeColumn'
import { RankRow } from './RankRow'
import { SubmissionCard } from './SubmissionCard'
import { SideMenu } from './SideMenu'
import { SelectedButton } from './SelectedButton'
const Container = () => {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) => {
          if (submission.id === Number(active.id)) {
            if (over.id === 'has-not-grade') {
              return {
                ...submission,
                columnId: null,
                rowId: null,
              }
            }
            const [columnId, rowId] = (over.id as string).split('-')
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

  //TODO:Delete dummy data
  const corse = {
    name: '情報アーキテクチャ特論7',
  }
  const gradeColumns = [
    { id: 5, title: '5', submissionNum: 0 },
    { id: 4, title: '4', submissionNum: 0 },
    { id: 3, title: '3', submissionNum: 0 },
    { id: 2, title: '2', submissionNum: 0 },
    { id: 1, title: '1', submissionNum: 0 },
    { id: 0, title: '0', submissionNum: 0 },
  ]
  const rankRows = [
    { id: 5, title: '++' },
    { id: 4, title: '+' },
    { id: 3, title: '+-' },
    { id: 2, title: '-' },
    { id: 1, title: '--' },
  ]
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      studentName: 'ハリー',
      isChecked: false,
      rowId: '1',
      columnId: '2',
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
    const isCheckedInSubmissions = submissions.some(
      (submission) => submission.isChecked
    )
    setIsDisabled(!isCheckedInSubmissions)
  }, [submissions.map((s) => s.isChecked).join(',')])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const notHasGradeSubmissions = submissions.filter(
    (submission) => submission.columnId == null
  )

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

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="flex h-screen overflow-hidden">
          <SideMenu submissions={notHasGradeSubmissions} />
          <div className="flex-1 overflow-hidden">
            <div className="pt-3 pl-3 h-full flex flex-col">
              <div className="pb-7 flex justify-between">
                <h1 className="text-2xl">{corse.name}</h1>
                <div className="absolute top-3 right-2">
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
                      id={column.id}
                      title={column.title}
                      submissionNum={column.submissionNum}
                    >
                      {rankRows.map((row) => (
                        <RankRow
                          key={`${row.id}`}
                          id={`${column.id}-${row.id}`}
                          title={row.title}
                        >
                          {submissions
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

export default Container
