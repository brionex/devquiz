import '@scripts/slidingText/slidingText.css'
import { SlidingText } from '@scripts/slidingText/slidingText.js'
import { getTimeLapse, sumTimeLapses } from '@scripts/utils.js'

let counterElem = null
let questionElem = null
let optionsElem = null

const classNames = ['answerError', 'answerSuccess']
const timeLapses = []
let currentQuestion = 0
let startTime = 0

let quiz = null
const quizResults = {
  numberQuestions: null,
  correctAnswers: 0,
  incorrectAnswers: 0,
  totalTime: null,
  questionDetails: [],
}

document.addEventListener('astro:page-load', updateScript)

function updateScript() {
  const isQuizPage = window.location.pathname.includes('/quiz/')

  if (!isQuizPage) {
    currentQuestion = 0
    return
  }

  initVars()
  optionsElem.addEventListener('click', optionClick)
}

function initVars() {
  startTime = Date.now()
  counterElem = document.querySelector('#quiz-counter')
  questionElem = document.querySelector('#quiz-question')
  optionsElem = document.querySelector('#quiz-options')
  quiz = JSON.parse(atob(document.querySelector('[data-quiz]').dataset.quiz))
}

function optionClick({ target }) {
  if (target.tagName !== 'LI') return

  const optionIndex = +target.dataset.i
  const questionData = quiz.questions[currentQuestion]
  const isCorrect = optionIndex === questionData.correctOption

  target.classList.add(classNames[+isCorrect])

  updateQuizResults(isCorrect, questionData, optionIndex)
  timeLapses.push(getTimeLapse(startTime, Date.now()))
  currentQuestion++

  setTimeout(() => {
    target.classList.remove(...classNames)

    if (currentQuestion === quiz.questions.length - 1) {
      finalizeQuiz()
      return
    }

    slidingElements()
  }, 1500)
}

function updateQuizResults(isCorrect, questionData, optionIndex) {
  isCorrect ? quizResults.correctAnswers++ : quizResults.incorrectAnswers++
  const timeTaken = getTimeLapse(startTime, Date.now())

  timeLapses.push(timeTaken)
  quizResults.questionDetails.push({
    selectedOption: questionData.options[optionIndex],
    correctOption: questionData.options[questionData.correctOption],
    timeTaken: timeTaken,
  })
}

function slidingElements() {
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
  quizResults.numberQuestions = quiz.questions.length
  quizResults.totalTime = sumTimeLapses(timeLapses)
  localStorage.setItem('devquiz', JSON.stringify(quizResults))
  window.location.href = '/results'
}
