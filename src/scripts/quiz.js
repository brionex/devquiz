import '@scripts/glideText/glideText.css'
import { GlideText } from '@scripts/glideText/glideText.js'

const classNames = ['answerSuccess', 'answerError']
let counterElem = null
let questionElem = null
let optionsElem = null
let quiz = null
let currentQuestion = 0

document.addEventListener('astro:page-load', updateScript)

function updateScript() {
  const path = window.location.pathname
  if (!path.includes('/quiz/')) {
    currentQuestion = 0
    return
  }

  counterElem = document.querySelector('#quiz-counter')
  questionElem = document.querySelector('#quiz-question')
  optionsElem = document.querySelector('#quiz-options')

  const data64 = document.querySelector('[data-quiz]')
  quiz = JSON.parse(atob(data64.dataset.quiz))

  optionsElem.addEventListener('click', clickedOption)
}

function clickedOption({ target }) {
  if (target.tagName !== 'LI') return

  const option = +target.dataset.i
  const isCorrect = checkAnswer(option)

  isCorrect
    ? target.classList.add(classNames[0])
    : target.classList.add(classNames[1])

  currentQuestion++

  setTimeout(() => {
    target.classList.remove(...classNames)

    GlideText({
      elements: [
        counterElem,
        questionElem,
        ...Array.from(optionsElem.children),
      ],
      texts: [
        currentQuestion + 1,
        quiz.questions[currentQuestion].question,
        ...quiz.questions[currentQuestion].options,
      ],
      duration: '300ms',
    })

    if (currentQuestion === quiz.questions.length - 1) {
      window.location.href = '/results'
    }
  }, 1500)
}

function checkAnswer(answer) {
  console.log(answer)
  console.log(quiz.questions[currentQuestion].correctOption)

  return answer === quiz.questions[currentQuestion].correctOption
}
