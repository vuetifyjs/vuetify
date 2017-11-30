function style (el, value) {
  [
    'transform',
    'webkitTransform'
  ].forEach(i => {
    el.style[i] = value
  })
}

const RippleDataAttribute = 'data-ripple'

const ripple = {
  /**
   * @param {Event} e
   * @param {Element} el
   * @param {{ class?: string, center?: boolean }} [value={}]
   */
  show: (e, el, { value = {} }) => {
    if (el.getAttribute(RippleDataAttribute) !== 'true') {
      return
    }

    const container = document.createElement('span')
    const animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'ripple__container'

    if (value.class) {
      container.className += ` ${value.class}`
    }

    const size = el.clientWidth > el.clientHeight
      ? el.clientWidth
      : el.clientHeight
    animation.className = 'ripple__animation'
    animation.style.width = `${size * (value.center ? 1 : 2)}px`
    animation.style.height = animation.style.width

    el.appendChild(container)
    const computed = window.getComputedStyle(el)
    if (computed.position !== 'absolute' && computed.position !== 'fixed') el.style.position = 'relative'

    const offset = el.getBoundingClientRect()
    const x = value.center ? '50%' : `${e.clientX - offset.left}px`
    const y = value.center ? '50%' : `${e.clientY - offset.top}px`

    animation.classList.add('ripple__animation--enter')
    animation.classList.add('ripple__animation--visible')
    style(animation, `translate(-50%, -50%) translate(${x}, ${y}) scale3d(0.01,0.01,0.01)`)
    animation.dataset.activated = Date.now()

    setTimeout(() => {
      animation.classList.remove('ripple__animation--enter')
      style(animation, `translate(-50%, -50%) translate(${x}, ${y})  scale3d(0.99,0.99,0.99)`)
    }, 0)
  },

  hide: (el) => {
    if (el.getAttribute(RippleDataAttribute) !== 'true') {
      return
    }

    const ripples = el.getElementsByClassName('ripple__animation')

    if (ripples.length === 0) return
    const animation = ripples[ripples.length - 1]
    const diff = Date.now() - Number(animation.dataset.activated)
    let delay = 400 - diff

    delay = delay < 0 ? 0 : delay

    setTimeout(() => {
      animation.classList.remove('ripple__animation--visible')

      setTimeout(() => {
        // Need to figure out a new way to do this
        try {
          if (ripples.length < 1) el.style.position = null
          animation.parentNode && el.removeChild(animation.parentNode)
        } catch (e) {}
      }, 300)
    }, delay)
  }
}

function isRippleEnabled (binding) {
  return typeof binding.value === 'undefined' || !!binding.value
}

function directive (el, binding) {
  el.setAttribute(RippleDataAttribute, isRippleEnabled(binding))
  el._rippleValue = binding

  const rippleHide = () => ripple.hide(el)
  const rippleShow = e => ripple.show(e, el, el._rippleValue)

  if ('ontouchstart' in window) {
    el.addEventListener('touchend', rippleHide, false)
    el.addEventListener('touchcancel', rippleHide, false)
  }

  el.addEventListener('mousedown', rippleShow, false)
  el.addEventListener('mouseup', rippleHide, false)
  el.addEventListener('mouseleave', rippleHide, false)
  // Anchor tags can be dragged, causes other hides to fail - #1537
  el.addEventListener('dragstart', rippleHide, false)
  el._rippleHide = rippleHide
  el._rippleShow = rippleShow
}

function unbind (el, binding) {
  el.removeEventListener('touchstart', el._rippleShow, false)
  el.removeEventListener('mousedown', el._rippleShow, false)
  el.removeEventListener('touchend', el._rippleHide, false)
  el.removeEventListener('touchcancel', el._rippleHide, false)
  el.removeEventListener('mouseup', el._rippleHide, false)
  el.removeEventListener('mouseleave', el._rippleHide, false)
  el.removeEventListener('dragstart', el._rippleHide, false)
}

function update (el, binding) {
  if (binding.value === binding.oldValue) {
    return
  }

  el.setAttribute(RippleDataAttribute, isRippleEnabled(binding))
  el._rippleValue = binding
}

export default {
  name: 'ripple',
  bind: directive,
  unbind: unbind,
  update: update
}
