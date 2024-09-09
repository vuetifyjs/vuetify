// Utilities
import { render as _render } from '@testing-library/vue'
import { createVuetify } from '@/framework.ts'
import { afterEach } from 'vitest'
import { mergeDeep } from '@/util'
import { aliases } from '@/iconsets/mdi-svg'

export { userEvent } from '@vitest/browser/context'
export { screen } from '@testing-library/vue'
export * from './templates'

export function touch (element: Element) {
  const createTrigger = (eventName: string) => (clientX: number, clientY: number) => {
    const touches = [{ clientX, clientY }]
    const event = new Event(eventName)

    ;(event as any).touches = touches
    ;(event as any).changedTouches = touches
    element.dispatchEvent(event)

    return touch(element)
  }

  return {
    start: createTrigger('touchstart'),
    move: createTrigger('touchmove'),
    end: createTrigger('touchend'),
  }
}

export const wait = (timeout?: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export const waitAnimationFrame = () => {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

export const waitIdle = () => {
  return new Promise(resolve => requestIdleCallback(resolve, { timeout: 500 }))
}

export const scroll = (options: ScrollToOptions, el: Element | Window = window) => {
  return Promise.race([
    wait(500),
    new Promise(resolve => {
      el.addEventListener('scrollend', resolve, { once: true })
      el.scroll(options)
    }).then(waitIdle),
  ])
}

let vuetify: ReturnType<typeof createVuetify> | null
afterEach(() => {
  vuetify = null
})

export const render = (function render (component, options) {
  vuetify = vuetify ?? (vuetify = createVuetify({ icons: { aliases } }))

  const defaultOptions = {
    global: {
      stubs: {
        transition: false,
        'transition-group': false,
      },
      plugins: [vuetify],
    },
  }

  const mountOptions = mergeDeep(defaultOptions, options!, (a, b) => a.concat(b))

  return _render(component, mountOptions)
}) as typeof _render
