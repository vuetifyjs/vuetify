// Styles
import './VRipple.sass'

// Utilities
import { isObject, keyValues } from '@/util'

// Types
import type { DirectiveBinding } from 'vue'

const stopSymbol = Symbol('rippleStop')

type VuetifyRippleEvent = (PointerEvent | KeyboardEvent) & { [stopSymbol]?: boolean }

const DELAY_RIPPLE = 80

function transform (el: HTMLElement, value: string) {
  el.style.transform = value
  el.style.webkitTransform = value
}

interface RippleOptions {
  class?: string
  center?: boolean
  circle?: boolean
}

export interface RippleDirectiveBinding extends Omit<DirectiveBinding, 'modifiers' | 'value'> {
  value?: boolean | { class: string }
  modifiers: {
    center?: boolean
    circle?: boolean
    stop?: boolean
  }
}

const calculate = (
  e: VuetifyRippleEvent,
  el: HTMLElement,
  value: RippleOptions = {}
) => {
  let localX = 0
  let localY = 0

  if (e instanceof PointerEvent) {
    const offset = el.getBoundingClientRect()

    localX = e.clientX - offset.left
    localY = e.clientY - offset.top
  }

  let radius = 0
  let scale = 0.3
  if (el._ripple?.circle) {
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

const ripples = {
  /* eslint-disable max-statements */
  show (
    e: VuetifyRippleEvent,
    el: HTMLElement,
    value: RippleOptions = {}
  ) {
    if (!el?._ripple?.enabled) {
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
    if (computed && computed.position === 'static') {
      el.style.position = 'relative'
      el.dataset.previousPosition = 'static'
    }

    animation.classList.add('v-ripple__animation--enter')
    animation.classList.add('v-ripple__animation--visible')
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`)
    animation.dataset.activated = String(performance.now())

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animation.classList.remove('v-ripple__animation--enter')
        animation.classList.add('v-ripple__animation--in')
        transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`)
      })
    })
  },

  hide (el: HTMLElement | null) {
    if (!el?._ripple?.enabled) return

    const animation = el.querySelector<HTMLElement>('.v-ripple__animation:not([data-is-hiding])')
    if (!animation) return

    animation.dataset.isHiding = 'true'

    const diff = performance.now() - Number(animation.dataset.activated)
    const delay = Math.max(250 - diff, 0)

    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--in')
      animation.classList.add('v-ripple__animation--out')

      setTimeout(() => {
        const ripples = el.getElementsByClassName('v-ripple__animation')
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition
          delete el.dataset.previousPosition
        }

        if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode)
      }, 300)
    }, delay)
  },
}

function isRippleEnabled (value: any): value is true {
  return typeof value === 'undefined' || !!value
}

function getActivingKey (e: VuetifyRippleEvent): string{
  return e instanceof PointerEvent ? `pointer-${e.pointerId}` : `keyboard-${e.key}`
}

function rippleShow (e: VuetifyRippleEvent) {
  const value: RippleOptions = {}
  const element = e.currentTarget as HTMLElement | undefined

  if (!element?._ripple|| e[stopSymbol]) return

  // Don't allow the event to trigger ripples on any other elements
  e[stopSymbol] = true

  value.center = element._ripple.centered || e instanceof KeyboardEvent
  if (element._ripple.class) {
    value.class = element._ripple.class
  }

  // Display only when the ripple is activated for the first time.
  if (element._ripple.activing.length === 0) {
    window.clearTimeout(element._ripple.showTimer)
    if (e instanceof PointerEvent && e.pointerType !== 'mouse') {
      element._ripple.showTimerCommit = () => {
        ripples.show(e, element, value)
      }
      element._ripple.showTimer = window.setTimeout(() => {
        if (element?._ripple?.showTimerCommit) {
          element._ripple.showTimerCommit()
          element._ripple.showTimerCommit = null
        }
      }, DELAY_RIPPLE)
    } else {
      if (element._ripple.showTimerCommit) {
        element._ripple.showTimerCommit = null
      }
      ripples.show(e, element, value)
    }
  }
  const activingKey = getActivingKey(e)
  if (!element._ripple.activing.includes(activingKey)) {
    element._ripple.activing.push(activingKey)
  }
}

function rippleStop (e: VuetifyRippleEvent) {
  e[stopSymbol] = true
}

function rippleHide (e: Event) {
  const element = e.currentTarget as HTMLElement | null
  if (!element?._ripple) return

  window.clearTimeout(element._ripple.showTimer)

  // The touch interaction occurs before the show timer is triggered.
  // We still want to show ripple effect.
  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit()
    element._ripple.showTimerCommit = null
  }

  if (e instanceof FocusEvent) {
    element._ripple.activing = [];
  } else if (e instanceof PointerEvent || e instanceof KeyboardEvent) {
    const activingKey = getActivingKey(e)
    if (element._ripple.activing.includes(activingKey)) {
      element._ripple.activing.splice(element._ripple.activing.indexOf(activingKey), 1);
    }
  }

  if (element._ripple.activing.length === 0) {
    ripples.hide(element)
  }
}

function rippleLeave (e: PointerEvent) {
  if (e.pointerType === 'touch') return
  rippleHide(e)
}

function rippleMove (e: PointerEvent) {
  // During touch screen, any movement typically cancels the operation.
  if (e.pointerType !== 'touch') return
  const element = e.currentTarget as HTMLElement | null
  if (!element) return
  const offset = element.getBoundingClientRect()
  const localX = e.clientX - offset.left
  const localY = e.clientY - offset.top
  if (localX < 0 || localX > offset.width || localY < 0 || localY > offset.height){
    rippleHide(e)
  }
}

function rippleCancel (e: PointerEvent) {
  const element = e.currentTarget as HTMLElement | undefined
  if (!element?._ripple) return

  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null
  }

  rippleHide(e)
}

function keyboardRippleShow (e: KeyboardEvent) {
  if (e.key === keyValues.space || e.key === keyValues.enter) {
    rippleShow(e)
  }
}

function keyboardRippleHide (e: KeyboardEvent) {
  if (e.key === keyValues.space || e.key === keyValues.enter) {
    rippleHide(e)
  }
}

function updateRipple (el: HTMLElement, binding: RippleDirectiveBinding, wasEnabled: boolean) {
  const { value, modifiers } = binding
  const enabled = isRippleEnabled(value)
  if (!enabled) {
    ripples.hide(el)
  }

  el._ripple = el._ripple ?? { activing: [] }
  el._ripple.enabled = enabled
  el._ripple.centered = modifiers.center
  el._ripple.circle = modifiers.circle
  if (isObject(value) && value.class) {
    el._ripple.class = value.class
  }

  if (enabled && !wasEnabled) {
    if (modifiers.stop) {
      el.addEventListener('pointerdown', rippleStop)
      return
    }

    el.addEventListener('pointerdown', rippleShow)
    el.addEventListener('pointerup', rippleHide)
    el.addEventListener('pointerleave', rippleLeave)
    el.addEventListener('pointermove', rippleMove)
    el.addEventListener('pointercancel', rippleCancel)

    el.addEventListener('keydown', keyboardRippleShow)
    el.addEventListener('keyup', keyboardRippleHide)

    el.addEventListener('blur', rippleHide)

    // Anchor tags can be dragged, causes other hides to fail - #1537
    el.addEventListener('dragstart', rippleHide, { passive: true })
  } else if (!enabled && wasEnabled) {
    removeListeners(el)
  }
}

function removeListeners (el: HTMLElement) {
  el.removeEventListener('pointerdown', rippleShow)
  el.removeEventListener('pointerup', rippleHide)
  el.removeEventListener('pointerleave', rippleLeave)
  el.removeEventListener('pointermove', rippleMove)
  el.removeEventListener('pointercancel', rippleCancel)
  el.removeEventListener('keydown', keyboardRippleShow)
  el.removeEventListener('keyup', keyboardRippleHide)
  el.removeEventListener('dragstart', rippleHide)
  el.removeEventListener('blur', rippleHide)
}

function mounted (el: HTMLElement, binding: RippleDirectiveBinding) {
  updateRipple(el, binding, false)
}

function unmounted (el: HTMLElement) {
  delete el._ripple
  removeListeners(el)
}

function updated (el: HTMLElement, binding: RippleDirectiveBinding) {
  if (binding.value === binding.oldValue) {
    return
  }

  const wasEnabled = isRippleEnabled(binding.oldValue)
  updateRipple(el, binding, wasEnabled)
}

export const Ripple = {
  mounted,
  unmounted,
  updated,
}

export default Ripple
