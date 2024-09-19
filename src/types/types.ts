// Define los niveles de dificultad
export type Difficulty = 'low' | 'medium' | 'high'

// Define las opciones de una pregunta
export interface Question {
  question: string
  correctOption: string
  options: string[]
}

// Define la estructura de un quiz
export interface Quiz {
  id: string
  quizTitle: string
  quizImage: string
  difficulty: Difficulty
  questions: Question[]
}

// Define las rutas estáticas
export interface StaticPaths {
  params: { quiz: string }
  props: { quiz: any }
}

// Extiende de Quiz agregando la propiedad 'default'
export interface QuizJson extends Quiz {
  default: Quiz
}
