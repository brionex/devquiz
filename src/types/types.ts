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

// // Extiende de Quiz agregando la propiedad 'default'
// export interface QuizJson extends Quiz {
//   default: Quiz
// }

// // Props del componente StatisticsCard
// export type ColorOptions = 'success' | 'error' | 'warning' | 'info' | 'default'

// export interface StatisticsCardProps {
//   title: string
//   number: number | string
//   suffix?: string
//   color?: ColorOptions
// }
