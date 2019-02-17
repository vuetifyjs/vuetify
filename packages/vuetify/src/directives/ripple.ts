import { VNode, VNodeDirective } from 'vue'
import { consoleWarn } from '../util/console'

function transform (el: HTMLElement, value: string) {
  el.style['transform'] = value
  el.style['webkitTransform'] = value
}

function opacity (el: HTMLElement, value: number) {
  el.style['opacity'] = value.toString()
}

export interface RippleOptions {
  class?: string
  center?: boolean
  circle?: boolean
}

function isTouchEvent (e: MouseEvent | TouchEvent): e is TouchEvent {
  return e.constructor.name === 'TouchEvent'
}

const calculate = (e: MouseEvent | TouchEvent, el: HTMLElement, value: RippleOptions = {}) => {
  const offset = el.getBoundingClientRect()
  const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e
  const localX = target.clientX - offset.left
  const localY = target.clientY - offset.top

  let radius = 0
  let scale = 0.3
  if (el._ripple && el._ripple.circle) {
    scale = 0.15
    radius = el.clientWidth / 2
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2
  }

  const centerX = `${(el.clientWidth - (radius * 2)) / 2}px`
  const centerY = `${(el.clientHeight - (radius * 2)) / 2}px`

  const x = value.center ? centerX : `${localX - radius}px`
  const y = value.center ? centerY : `${localY - radius}px`

  return { radius, scale, x, y, centerX, centerY }
}

const ripple = {
  /* eslint-disable max-statements */
  show (e: MouseEvent | TouchEvent, el: HTMLElement, value: RippleOptions = {}) {
    if (!el._ripple || !el._ripple.enabled) {
      return
    }

    const container = document.createElement('span')
    const animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'v-ripple__container'

    if (value.class) {
      container.className += ` ${value.class}`
    }

    const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value)

    const size = `${radius * 2}px`
    animation.className = 'v-ripple__animation'
    animation.style.width = size
    animation.style.height = size

    el.appendChild(container)

    const computed = window.getComputedStyle(el)
    if (computed.position === 'static') {
      el.style.position = 'relative'
      el.dataset.previousPosition = 'static'
    }

    animation.classList.add('v-ripple__animation--enter')
    animation.classList.add('v-ripple__animation--visible')
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`)
    opacity(animation, 0)
    animation.dataset.activated = String(performance.now())

    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--enter')
      animation.classList.add('v-ripple__animation--in')
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`)
      opacity(animation, 0.25)
    }, 0)
  },

  hide (el: HTMLElement | null) {
    if (!el || !el._ripple || !el._ripple.enabled) return

    const ripples = el.getElementsByClassName('v-ripple__animation')

    if (ripples.length === 0) return
    const animation = ripples[ripples.length - 1]

    if (animation.dataset.isHiding) return
    else animation.dataset.isHiding = 'true'

    const diff = performance.now() - Number(animation.dataset.activated)
    const delay = Math.max(250 - diff, 0)

    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--in')
      animation.classList.add('v-ripple__animation--out')
      opacity(animation, 0)

      setTimeout(() => {
        const ripples = el.getElementsByClassName('v-ripple__animation')
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition
          delete el.dataset.previousPosition
        }

        animation.parentNode && el.removeChild(animation.parentNode)
      }, 300)
    }, delay)
  }
}

function isRippleEnabled (value: any): value is true {
  return typeof value === 'undefined' || !!value
}

function rippleShow (e: MouseEvent | TouchEvent) {
  const value: RippleOptions = {}
  const element = e.currentTarget as HTMLElement
  if (!element || element._ripple!.touched) return
  if (isTouchEvent(e)) {
    element._ripple!.touched = true
  }
  value.center = element._ripple!.centered
  if (element._ripple!.class) {
    value.class = element._ripple!.class
  }
  ripple.show(e, element, value)
}

function rippleHide (e: Event) {
  const element = e.currentTarget as HTMLElement | null
  if (!element) return

  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false
    }
  })
  ripple.hide(element)
}

function updateRipple (el: HTMLElement, binding: VNodeDirective, wasEnabled: boolean) {
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
    el.addEventListener('touchstart', rippleShow, { passive: true })
    el.addEventListener('touchend', rippleHide, { passive: true })
    el.addEventListener('touchcancel', rippleHide)

    el.addEventListener('mousedown', rippleShow)
    el.addEventListener('mouseup', rippleHide)
    el.addEventListener('mouseleave', rippleHide)
    // Anchor tags can be dragged, causes other hides to fail - #1537
    el.addEventListener('dragstart', rippleHide, { passive: true })
  } else if (!enabled && wasEnabled) {
    removeListeners(el)
  }
}

function removeListeners (el: HTMLElement) {
  el.removeEventListener('mousedown', rippleShow)
  el.removeEventListener('touchstart', rippleHide)
  el.removeEventListener('touchend', rippleHide)
  el.removeEventListener('touchcancel', rippleHide)
  el.removeEventListener('mouseup', rippleHide)
  el.removeEventListener('mouseleave', rippleHide)
  el.removeEventListener('dragstart', rippleHide)
}

function directive (el: HTMLElement, binding: VNodeDirective, node: VNode) {
  updateRipple(el, binding, false)

  // warn if an inline element is used, waiting for el to be in the DOM first
  node.context && node.context.$nextTick(() => {
    if (window.getComputedStyle(el).display === 'inline') {
      const context = (node as any).fnOptions ? [(node as any).fnOptions, node.context] : [node.componentInstance]
      consoleWarn('v-ripple can only be used on block-level elements', ...context)
    }
  })
}

function unbind (el: HTMLElement) {
  delete el._ripple
  removeListeners(el)
}

function update (el: HTMLElement, binding: VNodeDirective) {
  if (binding.value === binding.oldValue) {
    return
  }

  const wasEnabled = isRippleEnabled(binding.oldValue)
  updateRipple(el, binding, wasEnabled)
}

export default {
  bind: directive,
  unbind,
  update
}
