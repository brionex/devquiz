import '@scripts/slidingText/slidingText.css'
import { SlidingText } from '@scripts/slidingText/slidingText.js'
import { calcDuration, sumDurations, formatDuration } from '@scripts/utils.js'

let counterElem = null
let questionElem = null
let optionsElem = null

const classNames = ['answerError', 'answerSuccess']
const times = []
let currentQuestion = 0
let startTime = 0

let quiz = null
const quizSummary = {
  quizTitle: null,
  quizImage: null,
  numberQuestions: null,
  correctCount: 0,
  incorrectCount: 0,
  duration: null,
  details: [],
}

document.addEventListener('astro:page-load', updateScript)

function updateScript() {
  const isQuizPage = window.location.pathname.startsWith('/quiz/')

  if (!isQuizPage) {
    currentQuestion = 0
    return
  }

  counterElem = document.querySelector('#quiz-counter')
  questionElem = document.querySelector('#quiz-question')
  optionsElem = document.querySelector('#quiz-options')

  startTime = Date.now()
  quiz = JSON.parse(atob(document.querySelector('[data-quiz]').dataset.quiz))
  quizSummary.quizImage = quiz.quizImage
  quizSummary.quizTitle = quiz.quizTitle
  optionsElem.addEventListener('click', handlerClick)
}

function handlerClick({ target }) {
  if (target.tagName !== 'LI') return

  const optionIndex = +target.dataset.i
  const questionData = quiz.questions[currentQuestion]
  const isCorrect = optionIndex === questionData.correctOption

  target.classList.add(classNames[+isCorrect])
  updateQuizSummary(isCorrect, optionIndex, questionData)
  times.push(calcDuration(startTime, Date.now()))

  setTimeout(() => {
    target.classList.remove(...classNames)

    if (currentQuestion === quiz.questions.length - 1) {
      finalizeQuiz()
      return
    } else {
      currentQuestion++
      nextQuestion()
    }
  }, 1500)
}

function updateQuizSummary(
  isCorrect,
  optionIndex,
  { correctOption, question, options }
) {
  isCorrect ? quizSummary.correctCount++ : quizSummary.incorrectCount++
  const duration = calcDuration(startTime, Date.now())

  times.push(duration)
  quizSummary.details.push({
    isCorrect,
    question,
    selectedOption: options[optionIndex],
    correctOption: options[correctOption],
    timeTaken: formatDuration(duration, true),
  })
}

function nextQuestion() {
  SlidingText({
    elements: [counterElem, questionElem, ...Array.from(optionsElem.children)],
    texts: [
      currentQuestion + 1,
      quiz.questions[currentQuestion].question,
      ...quiz.questions[currentQuestion].options,
    ],
    duration: '300ms',
    callback: () => {
      startTime = Date.now()
    },
  })
}

function finalizeQuiz() {
  quizSummary.numberQuestions = quiz.questions.length
  quizSummary.duration = formatDuration(sumDurations(times))
  localStorage.setItem('devquiz', JSON.stringify(quizSummary))
  window.location.href = '/results'
}
