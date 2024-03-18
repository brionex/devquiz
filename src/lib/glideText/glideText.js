export function glideText(elem, text) {
  if (typeof(elem) === 'string') {
    elem = document.querySelector(elem)
  }

  elem.innerHTML = `
  <span class="text-out">${elem.textContent}</span>
  <span class="text-in">${text}</span>`

  const defineText = () => {
    elem.innerHTML = text
    elem.removeEventListener('animationend', defineText)
  }

  elem.addEventListener('animationend', defineText)
}