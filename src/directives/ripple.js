let ripple = {
  show: (e, el, binding) => {
    var container = document.createElement('span')
    var animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'ripple__container'
    
    if (binding.value.class) {
      container.classList.add(binding.value.class)
    }

    animation.className = 'ripple__animation'
    animation.style.width = `${el.clientWidth * 2.2}px`
    animation.style.height = animation.style.width

    el.appendChild(container)

    const x = e.layerX
    const y = e.layerY

    animation.classList.add('ripple__animation--enter')
    animation.classList.add('ripple__animation--visible')
    animation.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0) scale3d(.15, .15, 1)`
    animation.dataset.activated = Date.now()

    setTimeout(() => {
      animation.classList.remove('ripple__animation--enter')
      animation.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0)`
    }, 0)
  },

  hide: (el) => {
    let ripples = el.getElementsByClassName('ripple__animation')

    if (ripples.length === 0) return
    let animation = ripples[ripples.length - 1]
    let diff = Date.now() - Number(animation.dataset.activated)
    let delay = 350 - diff

    delay = delay < 0 ? 0 : delay

    setTimeout(() => {
      animation.classList.remove('ripple__animation--visible')

      setTimeout(() => {
        animation.parentNode.remove()
      }, 300)
    }, delay)
  }
}

function directive (el, binding, v) {
  if (!binding.value) return

  if ('ontouchstart' in window) {
    el.addEventListener('touchend', () => ripple.hide(el), false)
    el.addEventListener('touchcancel', () => ripple.hide(el), false)
  }

  el.addEventListener('mousedown', e => ripple.show(e, el, binding), false)
  el.addEventListener('mouseup', () => ripple.hide(el), false)
  el.addEventListener('mouseleave', () => ripple.hide(el), false)
}

export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive
}
