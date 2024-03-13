const $ = (selector) => document.querySelector(selector)

const $quizMenu = $('.quiz-menu')
const $btnStart = $('.btn-start')
const $quizQuestionSec = $('.quiz-questionSec')
const $quizProgress = $('.quiz-progress')
const $quizQuestion = $('.quiz-question')
const $quizOptions = $('.quiz-options')
const $questionsJson = $('[data-json]')

const questions = JSON.parse($questionsJson.dataset.json)
const questionShown = 0



function showQuestion() {
  $quizProgress.textContent = `Pregunta ${questionShown+1} de ${questions.length}`
  $quizQuestion.textContent = questions[questionShown].question


  Array.from($quizOptions.children).forEach((elem, i) => {
    elem.textContent = questions[questionShown].options[i]
  });
}


function checkOption({target}) {
  if (target.tagName !== 'LI') return 

  if (target.textContent === questions[questionShown].correctOption) {
    target.classList.add('correct')
  }
  else {
    target.classList.add('incorrect')
  }
}


// Funciones de inicio
function startQuiz() {
  $quizMenu.classList.add('hide-menu')
}

function hideQuizMenu() {
  $quizMenu.classList.add('hidden')
  $quizQuestionSec.classList.remove('hidden')
  $quizMenu.removeEventListener('animationend', showQuestion)
  showQuestion()
}
showQuestion()

$btnStart.addEventListener('click', startQuiz)
$quizMenu.addEventListener('animationend', hideQuizMenu)
$quizOptions.addEventListener('click', checkOption)
