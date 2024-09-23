import { useEffect, useState } from 'react'
import SummaryCard from '@components/SummaryCard.tsx'
import AnswerCard from '@components/AnswerCard.tsx'
import type { QuizSummary } from '@ts/types'

export default function ResultsSection() {
  const [quizSummary, setQuizResult] = useState<QuizSummary | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('devquiz')
    setQuizResult(data ? JSON.parse(data) : null)
  }, [])

  if (!quizSummary) {
    return <div>Cargando resultados...</div>
  }

  return (
    <>
      <section className="flex flex-wrap gap-10 w-full *:basis-36 *:flex-grow">
        <SummaryCard title="Preguntas" content={quizSummary.numberQuestions} />
        <SummaryCard
          title="Correctas"
          content={quizSummary.correctCount}
          type="success"
        />
        <SummaryCard
          title="Incorrectas"
          content={quizSummary.incorrectCount}
          type="error"
        />
        <SummaryCard
          title="Tiempo"
          content={quizSummary.duration}
          type="info"
        />
      </section>

      <div className="flex flex-col gap-5">
        {quizSummary.details.map(
          (
            { selectedOption, correctOption, timeTaken, question, isCorrect },
            index
          ) => (
            <AnswerCard
              key={index}
              index={index}
              question={question}
              isCorrect={isCorrect}
              selectedOption={selectedOption}
              correctOption={correctOption}
              timeTaken={timeTaken}
            />
          )
        )}
      </div>
    </>
  )
}
