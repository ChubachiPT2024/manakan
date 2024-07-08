import { ReactNode, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core'
import { GradeColumn } from './GradeColumn'
import { RankRow } from './RankRow'
import { SubmissionCard } from './SubmissionCard'
import { SideMenu } from './SideMenu'
import { SelectedButton } from './SelectedButton'

const Container = () => {
  function handleDragEnd(event: DragEndEvent) {
    // const { active, over } = event
    // console.log(over?.id)
    // if (active.id !== over?.id && over?.id) {
    //   setTasks((prevTasks) =>
    //     prevTasks.map((task) => {
    //       if (task.name === active.id) {
    //         const [newStatus, newRowLevel] = (over.id as string).split('-')
    //         return {
    //           ...task,
    //           status: newStatus,
    //           rowLevel: newStatus === 'notStarted' ? 'A' : newRowLevel,
    //         }
    //       }
    //       return task
    //     })
    //   )
    // }
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
    { id: 5, title: '++', submissionNum: 0 },
    { id: 4, title: '+', submissionNum: 0 },
    { id: 3, title: '+-', submissionNum: 0 },
    { id: 2, title: '-', submissionNum: 0 },
    { id: 1, title: '--', submissionNum: 0 },
  ]

  const submissions: Submission[] = [
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
      isChecked: true,
      rowId: '3',
      columnId: '2',
    },
    {
      id: 3,
      studentName: 'ハーマイオニー',
      isChecked: true,
      rowId: null,
      columnId: null,
    },
  ]

  const isCheckedInSubmissions = !submissions.some(
    (submission) => submission.isChecked
  )

  const [isDisabled, setIsDisabled] = useState<boolean>(isCheckedInSubmissions)

  const nonGradeSubmissions = submissions.filter(
    (submission) => submission.columnId === null
  )

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen">
          {/* sidemenu */}
          <SideMenu submissions={nonGradeSubmissions} />
          {/* corse title & select button*/}
          <div className="pt-3 pl-3 w-screen">
            <div className="pb-7 flex justify-between">
              <h1 className="text-xl">コース名</h1>
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
            {/* canban */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {gradeColumns.map((column) => (
                <GradeColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
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
                          />
                        ))}
                    </RankRow>
                  ))}
                </GradeColumn>
              ))}
            </div>
          </div>
        </div>
      </DndContext>
    </>
  )
}

export default Container
