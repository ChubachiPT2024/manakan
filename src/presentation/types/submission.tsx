export interface Assessment {
  grade: number
  rank: AssessmentRank
}

export type AssessmentRank = '++' | '+' | '+-' | '-' | '--'
