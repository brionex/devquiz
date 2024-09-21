let isSliding = false

export function SlidingText(config) {
  if (isSliding) return
  isSliding = true

  const { elements, texts, duration, callback } = config

  const htmlElements = elements
    .map((elem) => {
      return elem instanceof HTMLElement ? elem : document.querySelector(elem)
    })
    .filter((elem, i) => {
      if (!elem) {
        console.error(`El elemento en la posición ${i} no se encontró.`)
        return false
      }
      return elem
    })

  htmlElements.forEach((elem, i) => {
    const slidingElem = document.createElement('div')
    slidingElem.className = 'sliding-text'

    if (duration) {
      slidingElem.style.setProperty('--time', formatDuration(duration))
    }

    const textHide =
      elem.textContent.length > texts[i].length ? elem.textContent : texts[i]

    slidingElem.innerHTML = `
      <span class="sliding-text-out">${elem.textContent}</span>
      <span class="sliding-text-in">${texts[i]}</span>
      <div class="sliding-hide">${textHide}</div>`

    elem.innerHTML = slidingElem.outerHTML

    const setText = () => {
      elem.innerHTML = texts[i]
      elem.removeEventListener('animationend', setText)
      isSliding = false

      if (callback) {
        callback(elem, i)
      }
    }

    elem.addEventListener('animationend', setText)
  })
}

function formatDuration(value) {
  if (typeof value === 'number') {
    return value >= 1000 ? `${value / 1000}s` : `${value}ms`
  }
  return value
}
