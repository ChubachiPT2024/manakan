export interface Assessment {
  grade: number
  rank: AssessmentRank
}

export interface Submission {
  isSubmitted: boolean
}

export type AssessmentRank = '++' | '+' | '+-' | '-' | '--'
