export interface Assessment {
  grade: number
  rank: AssessmentRank
}

export interface submission {
  isSubmitted: boolean
}

export type AssessmentRank = '++' | '+' | '+-' | '-' | '--'
