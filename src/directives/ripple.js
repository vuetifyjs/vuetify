function transform (el, value) {
  el.style['transform'] = value
  el.style['webkitTransform'] = value
}

function opacity (el, value) {
  el.style['opacity'] = value
}

const ripple = {
  /**
   * @param {Event} e
   * @param {Element} el
   * @param {{ class?: string, center?: boolean }} [value={}]
   */
  /* eslint-disable max-statements */
  show: (e, el, value = {}) => {
    if (!el._ripple || !el._ripple.enabled) {
      return
    }

    const container = document.createElement('span')
    const animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'ripple__container'

    if (value.class) {
      container.className += ` ${value.class}`
    }

    const offset = el.getBoundingClientRect()

    let radius = 0
    if (el._ripple.circle) {
      radius = el.clientWidth / 2
    } else {
      const points = [
        { x: offset.left, y: offset.top },
        { x: offset.right, y: offset.top },
        { x: offset.left, y: offset.bottom },
        { x: offset.right, y: offset.bottom }
      ]

      let furthest = null
      let length = 0
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const l = Math.abs(p.x - e.clientX) + Math.abs(p.y - e.clientY)
        if (l > length) {
          length = l
          furthest = p
        }
      }

      radius = Math.sqrt(Math.abs(furthest.x - e.clientX)**2 + Math.abs(furthest.y - e.clientY)**2)
    }

    animation.className = 'ripple__animation'
    animation.style.width = `${radius * 2 + 5}px`
    animation.style.height = animation.style.width

    el.appendChild(container)
    const computed = window.getComputedStyle(el)
    if (computed.position !== 'absolute' && computed.position !== 'fixed') el.style.position = 'relative'

    const localX = e.clientX - offset.left
    const localY = e.clientY - offset.top
    const x = value.center ? '50%' : `${localX}px`
    const y = value.center ? '50%' : `${localY}px`

    animation.classList.add('ripple__animation--enter')
    animation.classList.add('ripple__animation--visible')
    transform(animation, `translate(-50%, -50%) translate(${x}, ${y}) scale3d(0.01,0.01,0.01)`)
    opacity(animation, 0.25)
    animation.dataset.activated = Date.now()

    setTimeout(() => {
      animation.classList.remove('ripple__animation--enter')
      transform(animation, `translate(-50%, -50%) translate(${x}, ${y}) scale3d(0.99,0.99,0.99)`)
      opacity(animation, 0)
    }, 0)
  },

  hide: el => {
    if (!el._ripple || !el._ripple.enabled) return

    const ripples = el.getElementsByClassName('ripple__animation')

    if (ripples.length === 0) return
    const animation = ripples[ripples.length - 1]
    const diff = Date.now() - Number(animation.dataset.activated)
    let delay = 900 - diff

    delay = delay < 0 ? 0 : delay

    setTimeout(() => {
      animation.classList.remove('ripple__animation--visible')

      setTimeout(() => {
        // Need to figure out a new way to do this
        try {
          if (ripples.length < 1) el.style.position = null
          animation.parentNode && el.removeChild(animation.parentNode)
        } catch (e) { console.log(e) }
      }, 300)
    }, delay)
  }
}

function isRippleEnabled (value) {
  return typeof value === 'undefined' || !!value
}

function rippleShow (e) {
  const value = {}
  const element = e.currentTarget
  value.center = element._ripple.centered
  if (element._ripple.class) {
    value.class = element._ripple.class
  }
  ripple.show(e, element, value)
}

function rippleHide (e) {
  ripple.hide(e.currentTarget)
}

function updateRipple (el, binding, wasEnabled) {
  const enabled = isRippleEnabled(binding.value)
  if (!enabled) {
    ripple.hide(el)
  }
  el._ripple = el._ripple || {}
  el._ripple.enabled = enabled
  const value = binding.value || {}
  if (value.center) {
    el._ripple.centered = true
  }
  if (value.class) {
    el._ripple.class = binding.value.class
  }
  if (value.circle) {
    el._ripple.circle = value.circle
  }
  if (enabled && !wasEnabled) {
    if ('ontouchstart' in window) {
      el.addEventListener('touchend', rippleHide, false)
      el.addEventListener('touchcancel', rippleHide, false)
    }

    el.addEventListener('mousedown', rippleShow, false)
    el.addEventListener('mouseup', rippleHide, false)
    el.addEventListener('mouseleave', rippleHide, false)
    // Anchor tags can be dragged, causes other hides to fail - #1537
    el.addEventListener('dragstart', rippleHide, false)
  } else if (!enabled && wasEnabled) {
    removeListeners(el)
  }
}

function removeListeners (el) {
  el.removeEventListener('touchstart', rippleShow, false)
  el.removeEventListener('mousedown', rippleShow, false)
  el.removeEventListener('touchend', rippleHide, false)
  el.removeEventListener('touchcancel', rippleHide, false)
  el.removeEventListener('mouseup', rippleHide, false)
  el.removeEventListener('mouseleave', rippleHide, false)
  el.removeEventListener('dragstart', rippleHide, false)
}

function directive (el, binding) {
  updateRipple(el, binding, false)
}

function unbind (el) {
  delete el._ripple
  removeListeners(el)
}

function update (el, binding) {
  if (binding.value === binding.oldValue) {
    return
  }

  const wasEnabled = isRippleEnabled(binding.oldValue)
  updateRipple(el, binding, wasEnabled)
}

export default {
  name: 'ripple',
  bind: directive,
  unbind: unbind,
  update: update
}
