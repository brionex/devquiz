// Define los tipos para el objeto json de un quiz
export interface Question {
  question: string
  correctOption: number
  options: string[]
}

export interface Quiz {
  url: string
  quizTitle: string
  quizImage: string
  color: string
  questions: Question[]
}

// Define los tipos para la función getStaticPaths
export interface StaticPaths {
  params: { quiz: string }
  props: { quiz: Quiz }
}

// Define los tipos del objeto resultados de un quiz
interface DetailAnswers {
  isCorrect: boolean
  question: string
  selectedOption: string
  correctOption: string
  timeTaken: string
}

export interface QuizSummary {
  quizTitle: string
  quizImage: string
  numberQuestions: number
  correctCount: number
  incorrectCount: number
  duration: string
  details: DetailAnswers[]
}
