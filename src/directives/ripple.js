import { browserTransform } from '../util/helpers'

let ripple = {
  show: (e, el, binding) => {
    var container = document.createElement('span')
    var animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'ripple__container'
    
    if ((binding.value || {}).class) {
      container.classList.add(binding.value.class)
    }

    animation.className = 'ripple__animation'
    animation.style.width = `${el.clientWidth * 2}px`
    animation.style.height = animation.style.width

    el.appendChild(container)

    const offset = el.getBoundingClientRect()
    const x = e.clientX - offset.left
    const y = e.clientY - offset.top

    animation.classList.add('ripple__animation--enter')
    animation.classList.add('ripple__animation--visible')
    style(animation, `translate(-50%, -50%) translate(${x}px, ${y}px) scale(.001)`)
    animation.dataset.activated = Date.now()

    setTimeout(() => {
      animation.classList.remove('ripple__animation--enter')
      style(animation, `translate(-50%, -50%) translate(${x}px, ${y}px)`)
    }, 0)
  },

  hide: (el) => {
    let ripples = el.getElementsByClassName('ripple__animation')

    if (ripples.length === 0) return
    let animation = ripples[ripples.length - 1]
    let diff = Date.now() - Number(animation.dataset.activated)
    let delay = 400 - diff

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
  if (binding.value === false) return

  if ('ontouchstart' in window) {
    // el.addEventListener('touchstart', e => ripple.show(e, el, binding), false)
    el.addEventListener('touchend', () => ripple.hide(el), false)
    el.addEventListener('touchcancel', () => ripple.hide(el), false)
  }

  el.addEventListener('mousedown', e => ripple.show(e, el, binding), false)
  el.addEventListener('mouseup', () => ripple.hide(el), false)
  el.addEventListener('mouseleave', () => ripple.hide(el), false)
}

function unbind (el, binding) {
  el.removeEventListener('touchstart', e => ripple.show(e, el, binding), false)
  el.removeEventListener('mousedown', e => ripple.show(e, el, binding), false)
  el.removeEventListener('touchend', () => ripple.hide(el), false)
  el.removeEventListener('touchcancel', () => ripple.hide(el), false)
  el.removeEventListener('mouseup', () => ripple.hide(el), false)
  el.removeEventListener('mouseleave', () => ripple.hide(el), false)
}

export default {
  bind: directive,
  unbind: unbind
}
