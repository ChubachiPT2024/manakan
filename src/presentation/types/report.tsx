import { Assessment, submission } from './submission'

export interface Report {
  id: number
  title: string
  items: Item[]
}

export interface Item {
  student: Student
  submission: submission
  assessment: Assessment
  isChecked: boolean
}
