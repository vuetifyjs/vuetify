// Utilities
import './globals.d'
import { render as _render } from '@testing-library/vue'
import { createVuetify } from '../src/framework'
import { mergeDeep } from '../src/util'
import { aliases } from '../src/iconsets/mdi-svg'

import type { RenderOptions, RenderResult } from '@testing-library/vue'
import type { VuetifyOptions } from '../src/framework'

export { userEvent, page, commands } from '@vitest/browser/context'
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

export function render<C> (
  component: C,
  options?: RenderOptions<C> | null,
  vuetifyOptions?: VuetifyOptions
): RenderResult {
  const vuetify = createVuetify(mergeDeep({ icons: { aliases } }, vuetifyOptions))

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
}
