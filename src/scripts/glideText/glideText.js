let isGlide = false

export function GlideText(config) {
  if (isGlide) return
  isGlide = true

  const { elements, texts, duration = '1s', callback } = config

  function formatDuration(value) {
    if (typeof value === 'number') {
      return value >= 1000 ? `${value / 1000}s` : `${value}ms`
    }
    return value
  }

  const formattedDuration = formatDuration(duration)

  const htmlElements = elements
    .map((elem) => {
      return elem instanceof HTMLElement ? elem : document.querySelector(elem)
    })
    .filter((elem) => elem)

  htmlElements.forEach((elem, i) => {
    const glideTextContainer = document.createElement('div')
    glideTextContainer.className = 'glide-text'
    glideTextContainer.style.setProperty('--time', formattedDuration)

    const textHide =
      elem.textContent.length > texts[i].length ? elem.textContent : texts[i]

    glideTextContainer.innerHTML = `
      <span class="glide-text-out">${elem.textContent}</span>
      <span class="glide-text-in">${texts[i]}</span>
      <div class="glide-hide">${textHide}</div>`

    elem.innerHTML = ''
    elem.appendChild(glideTextContainer)

    const setText = () => {
      elem.innerHTML = texts[i]
      elem.removeEventListener('animationend', setText)
      isGlide = false

      if (callback) {
        callback(elem)
      }
    }

    elem.addEventListener('animationend', setText)
  })
}
