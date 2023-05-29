// Utilities
import { keys } from '@/util'

// Types
import type {
  DirectiveBinding,
} from 'vue'

export interface TouchHandlers {
  start?: (wrapperEvent: { originalEvent: TouchEvent } & TouchData) => void
  end?: (wrapperEvent: { originalEvent: TouchEvent } & TouchData) => void
  move?: (wrapperEvent: { originalEvent: TouchEvent } & TouchData) => void
  left?: (wrapper: TouchData) => void
  right?: (wrapper: TouchData) => void
  up?: (wrapper: TouchData) => void
  down?: (wrapper: TouchData) => void
}

export interface TouchData {
  touchstartX: number
  touchstartY: number
  touchmoveX: number
  touchmoveY: number
  touchendX: number
  touchendY: number
  offsetX: number
  offsetY: number
}

export type TouchWrapper = TouchHandlers & TouchData

export interface TouchValue extends TouchHandlers {
  parent?: boolean
  options?: AddEventListenerOptions
}

export interface TouchStoredHandlers {
  touchstart: (e: TouchEvent) => void
  touchend: (e: TouchEvent) => void
  touchmove: (e: TouchEvent) => void
}

export interface TouchDirectiveBinding extends Omit<DirectiveBinding, 'value'> {
  value?: TouchValue
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

  wrapper.start?.({ originalEvent: event, ...wrapper })
}

function touchend (event: TouchEvent, wrapper: TouchWrapper) {
  const touch = event.changedTouches[0]
  wrapper.touchendX = touch.clientX
  wrapper.touchendY = touch.clientY

  wrapper.end?.({ originalEvent: event, ...wrapper })

  handleGesture(wrapper)
}

function touchmove (event: TouchEvent, wrapper: TouchWrapper) {
  const touch = event.changedTouches[0]
  wrapper.touchmoveX = touch.clientX
  wrapper.touchmoveY = touch.clientY

  wrapper.move?.({ originalEvent: event, ...wrapper })
}

function createHandlers (value: TouchHandlers = {}): TouchStoredHandlers {
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
  const value = binding.value
  const target = value?.parent ? el.parentElement : el
  const options = value?.options ?? { passive: true }
  const uid = binding.instance?.$.uid // TODO: use custom uid generator

  if (!target || !uid) return

  const handlers = createHandlers(binding.value)

  target._touchHandlers = target._touchHandlers ?? Object.create(null)
  target._touchHandlers![uid] = handlers

  keys(handlers).forEach(eventName => {
    target.addEventListener(eventName, handlers[eventName], options)
  })
}

function unmounted (el: HTMLElement, binding: TouchDirectiveBinding) {
  const target = binding.value?.parent ? el.parentElement : el
  const uid = binding.instance?.$.uid

  if (!target?._touchHandlers || !uid) return

  const handlers = target._touchHandlers[uid]

  keys(handlers).forEach(eventName => {
    target.removeEventListener(eventName, handlers[eventName])
  })

  delete target._touchHandlers[uid]
}

export const Touch = {
  mounted,
  unmounted,
}

export default Touch
