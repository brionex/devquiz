import '@scripts/slidingText/slidingText.css'
import { SlidingText } from '@scripts/slidingText/slidingText.js'

const className = ['answerError', 'answerSuccess']
let counterElem = null
let questionElem = null
let optionsElem = null
let currentQuestion = 0
let quiz = null

document.addEventListener('astro:page-load', updateScript)

function updateScript() {
  if (!window.location.pathname.includes('/quiz/')) {
    currentQuestion = 0
    return
  }

  counterElem = document.querySelector('#quiz-counter')
  questionElem = document.querySelector('#quiz-question')
  optionsElem = document.querySelector('#quiz-options')

  const dataElem = document.querySelector('[data-quiz]')
  quiz = JSON.parse(atob(dataElem.dataset.quiz))

  optionsElem.addEventListener('click', clickedOption)
}

function clickedOption({ target }) {
  if (target.tagName !== 'LI') return

  const optionIndex = +target.dataset.i
  const questionObj = quiz.questions[currentQuestion]
  const answerIsCorrect = optionIndex === questionObj.correctOption

  target.classList.add(className[+answerIsCorrect])
  currentQuestion++

  setTimeout(() => {
    target.classList.remove(...className)

    SlidingText({
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
