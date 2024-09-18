export type Difficulty = 'low' | 'medium' | 'high'

export interface Question {
  question: string
  correctOption: string
  options: string[]
}

export interface Quiz {
  id: string
  quizTitle: string
  quizImage: string
  difficulty: Difficulty
  questions: Question[]
}
