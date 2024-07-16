import { Assessment, Submission } from './assessment'

export interface Report {
  id: number
  title: string
  items: Item[]
}

export interface Item {
  student: Student
  submission: Submission
  assessment: Assessment
  isChecked: boolean
}
