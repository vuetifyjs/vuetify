import Vue, { ComponentOptions } from 'vue'
import { Wrapper } from '@vue/test-utils'
import toHaveBeenWarnedInit from './util/to-have-been-warned'

export function functionalContext (context: ComponentOptions<Vue> = {}, children = []) {
  if (!Array.isArray(children)) children = [children]
  return {
    context: {
      data: {},
      props: {},
      ...context,
    },
    children,
  }
}

export function mouse (wrapper: Wrapper<any>) {
  const createTrigger = (eventName: string) => (clientX: number, clientY: number) => {
    const event = new Event(eventName)
    ;(event as any).clientX = clientX
    ;(event as any).clientY = clientY

    wrapper.element.dispatchEvent(event)

    return mouse(wrapper)
  }

  return {
    click: createTrigger('click'),
    mousedown: createTrigger('mousedown'),
    mouseup: createTrigger('mouseup'),
  }
}

export function touch (wrapper: Wrapper<any>) {
  const createTrigger = (eventName: string) => (clientX: number, clientY: number) => {
    const touches = [{ clientX, clientY }]
    const event = new Event(eventName)

    ;(event as any).touches = touches
    ;(event as any).changedTouches = touches
    wrapper.element.dispatchEvent(event)

    return touch(wrapper)
  }

  return {
    start: createTrigger('touchstart'),
    move: createTrigger('touchmove'),
    end: createTrigger('touchend'),
  }
}

export const resizeWindow = (width = window.innerWidth, height = window.innerHeight) => {
  (window as any).innerWidth = width
  ;(window as any).innerHeight = height
  window.dispatchEvent(new Event('resize'))
  return new Promise(resolve => setTimeout(resolve, 200))
}

export const scrollWindow = (y: number) => {
  (window as any).pageYOffset = y
  window.dispatchEvent(new Event('scroll'))

  return new Promise(resolve => setTimeout(resolve, 200))
}

// Add a global mockup for IntersectionObserver
(global as any).IntersectionObserver = class IntersectionObserver {
  callback: (entries: any, observer: any) => {}

  constructor (callback, options) {
    this.callback = callback
  }

  observe () {
    this.callback([], this)
    return null
  }

  unobserve () {
    this.callback = undefined
    return null
  }
}

toHaveBeenWarnedInit()
