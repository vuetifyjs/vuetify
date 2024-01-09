// Directives
import Scroll from '../'

// Utilities
import { describe, expect, it } from '@jest/globals'
import {
  createApp,
  defineComponent,
  h,
  withDirectives,
} from 'vue'
import { scrollWindow } from '../../../../test'

describe('v-scroll', () => {
  const instance = {
    $: { uid: 1 },
  }
  const el = document.createElement('div')
  const mountFunction = (value: EventListenerOrEventListenerObject, selector = ''): HTMLElement => {
    const Test = defineComponent(() => () => withDirectives(h('div', { class: 'test' }), [[Scroll, value, selector]]))

    createApp(Test).mount(el)
    return el.querySelector('.test')!
  }

  it('shoud bind event on inserted (selector)', () => {
    const value = () => {}
    const targetElement = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as any as Element
    const el = {} as HTMLElement
    const querySelector = jest.spyOn(window.document, 'querySelector').mockImplementation(
      selector => selector === '.selector' ? targetElement : null
    )

    Scroll.mounted(el, { value, arg: '.selector', instance } as any)
    expect(targetElement.addEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unmounted(el, { instance } as any)
    expect(targetElement.removeEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })

    Scroll.mounted(el, { value, arg: '.selector', instance } as any)
    expect(targetElement.addEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unmounted(el, { instance } as any)
    expect(targetElement.removeEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })

    querySelector.mockRestore()
  })

  it('shoud bind event on inserted (window)', () => {
    const value = () => {}
    const addListener = jest.spyOn(window, 'addEventListener')
    const removeListener = jest.spyOn(window, 'removeEventListener')
    const el = {}

    Scroll.mounted(el as HTMLElement, { value, instance } as any)
    expect(addListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unmounted(el as HTMLElement, { instance } as any)
    expect(removeListener).toHaveBeenCalledWith('scroll', value, { passive: true })

    addListener.mockRestore()
    removeListener.mockRestore()
  })

  it('shoud rebind event on updated', () => {
    const value1 = () => {}
    const value2 = () => {}
    const addListener = jest.spyOn(window, 'addEventListener')
    const removeListener = jest.spyOn(window, 'removeEventListener')
    const el = {}

    Scroll.mounted(el as HTMLElement, { value: value1, instance } as any)
    expect(addListener).toHaveBeenCalledTimes(1)
    expect(addListener).toHaveBeenCalledWith('scroll', value1, { passive: true })

    Scroll.updated(el as HTMLElement, { value: value2, oldValue: value1, instance } as any)
    expect(removeListener).toHaveBeenCalledTimes(1)
    expect(removeListener).toHaveBeenCalledWith('scroll', value1, { passive: true })
    expect(addListener).toHaveBeenCalledTimes(2)
    expect(addListener).toHaveBeenCalledWith('scroll', value2, { passive: true })

    addListener.mockRestore()
    removeListener.mockRestore()
  })

  it('should not fail when unbinding element without _onScroll', () => {
    expect(() => {
      Scroll.unmounted({} as HTMLElement, { instance } as any)
    }).not.toThrow()
  })

  it('should call the callback on scroll', async () => {
    const callback = jest.fn()

    mountFunction(event => callback(event.target))

    expect(callback).not.toHaveBeenCalled()

    await scrollWindow(400)

    expect(callback).toHaveBeenCalledWith(window)
  })
})
