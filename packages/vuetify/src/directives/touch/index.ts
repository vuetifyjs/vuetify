// Libraries
import { DirectiveBinding, ObjectDirective } from 'vue'

// Utilities
import { keys } from '../../util/helpers'

// Types
import { TouchHandlers, TouchValue, TouchWrapper } from 'types'

export interface TouchStoredHandlers {
  touchstart: (e: TouchEvent) => void
  touchend: (e: TouchEvent) => void
  touchmove: (e: TouchEvent) => void
}

interface TouchDirectiveBinding extends DirectiveBinding {
  value: TouchValue | undefined
}

const handleGesture = (wrapper: TouchWrapper) => {
  const { touchstartX, touchendX, touchstartY, touchendY } = wrapper
  const dirRatio = 0.5
  const minDistance = 16
  wrapper.offsetX = touchendX - touchstartX
  wrapper.offsetY = touchendY - touchstartY

  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && (touchendX < touchstartX - minDistance) && wrapper.left(wrapper)
    wrapper.right && (touchendX > touchstartX + minDistance) && wrapper.right(wrapper)
  }

  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && (touchendY < touchstartY - minDistance) && wrapper.up(wrapper)
    wrapper.down && (touchendY > touchstartY + minDistance) && wrapper.down(wrapper)
  }
}

function touchstart (event: TouchEvent, wrapper: TouchWrapper) {
  const touch = event.changedTouches[0]
  wrapper.touchstartX = touch.clientX
  wrapper.touchstartY = touch.clientY

  wrapper.start &&
    wrapper.start(Object.assign(event, wrapper))
}

function touchend (event: TouchEvent, wrapper: TouchWrapper) {
  const touch = event.changedTouches[0]
  wrapper.touchendX = touch.clientX
  wrapper.touchendY = touch.clientY

  wrapper.end &&
    wrapper.end(Object.assign(event, wrapper))

  handleGesture(wrapper)
}

function touchmove (event: TouchEvent, wrapper: TouchWrapper) {
  const touch = event.changedTouches[0]
  wrapper.touchmoveX = touch.clientX
  wrapper.touchmoveY = touch.clientY

  wrapper.move && wrapper.move(Object.assign(event, wrapper))
}

function createHandlers (value: TouchHandlers): TouchStoredHandlers {
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end,
  }

  return {
    touchstart: (e: TouchEvent) => touchstart(e, wrapper),
    touchend: (e: TouchEvent) => touchend(e, wrapper),
    touchmove: (e: TouchEvent) => touchmove(e, wrapper),
  }
}

function mounted (el: HTMLElement, binding: TouchDirectiveBinding) {
  const value = binding.value!
  const target = value.parent ? el.parentElement : el
  const options = value.options || { passive: true }

  // Needed to pass unit tests
  if (!target) return

  const handlers = createHandlers(binding.value!)
  target._touch = handlers

  keys(handlers).forEach(eventName => {
    target.addEventListener(eventName, handlers[eventName] as EventListener, options)
  })
}

function unmounted (el: HTMLElement, binding: TouchDirectiveBinding) {
  const target = binding.value!.parent ? el.parentElement : el

  if (!target || !target._touchHandlers) return

  const handlers = target._touch
  keys(handlers).forEach(eventName => {
    target.removeEventListener(eventName, handlers[eventName])
  })
  delete target._touchHandlers
}

export const Touch: ObjectDirective<HTMLElement> = {
  mounted,
  unmounted,
}

export default Touch
