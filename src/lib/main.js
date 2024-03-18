import { glideText } from '../lib/glideText/glideText.js'
import '../lib/glideText/glideText.css'

const $ = (selector, context = document) => context.querySelector(selector)

const $quizMenu = $('.quiz-menu')
const $quizQuestion = $('.quiz-question')
const $progress = $('.progress', $quizQuestion)
const $question = $('.question', $quizQuestion)
const $options = $('.options', $quizQuestion)

const questions = JSON.parse($('[data-json]').dataset.json)
let currentQuestion = 0

function setQuestion() {
  glideText('.progress-number', currentQuestion+1)
  glideText('.question', questions[currentQuestion].question)

  Array.from($options.children).forEach((elem, i) => {
    glideText(elem, questions[currentQuestion].options[i])
    elem.classList.remove('correct', 'incorrect')
  })
}

function checkOption({target}) {
  if (target.tagName !== 'BUTTON') return

  if (target.textContent === questions[currentQuestion].correctAnswer) {
    target.classList.add('correct')
  }
  else {
    target.classList.add('incorrect')
  }

  currentQuestion++

  setTimeout(() => {
    if (currentQuestion === questions.length) {
      alert('fin')
      return
    }
    setQuestion()
  }, 1500)
}

function startQuiz({ target }) {
  if (target.tagName === 'BUTTON') {
    $quizMenu.classList.add('hide-menu')
    $quizQuestion.classList.add('show-question')
    setQuestion()
  }
}

// Events section
$quizMenu.addEventListener('click', startQuiz)
$quizQuestion.addEventListener('click', checkOption)
