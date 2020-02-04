import {
  createApp,
  defineComponent,
  h,
  withDirectives,
  reactive,
} from 'vue'

// Directives
import Scroll from '../'
import { scrollWindow } from '../../../../test'

describe('scroll.ts', () => {
  const el = document.createElement('div')
  const mountFunction = (value: EventListenerOrEventListenerObject, selector?: string): HTMLElement => {
    const Test = defineComponent(() => () => withDirectives(h('div', { class: 'test' }), [[Scroll, value, selector]]))

    createApp().mount(Test, el)
    return el.querySelector('.test')
  }

  it('shoud bind event on inserted (selector)', () => {
    const value = () => {}
    const targetElement = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as any as Element
    const el = {}

    jest.spyOn(window.document, 'querySelector').mockImplementation(selector => selector === '.selector' ? targetElement : undefined)

    Scroll.mounted(el as HTMLElement, { value, arg: '.selector' } as any, null, null)
    expect(targetElement.addEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unmounted(el as HTMLElement, null, null, null)
    expect(targetElement.removeEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })

    Scroll.mounted(el as HTMLElement, { value, arg: '.selector' } as any, null, null)
    expect(targetElement.addEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unmounted(el as HTMLElement, null, null, null)
    expect(targetElement.removeEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
  })

  it('shoud bind event on inserted (window)', () => {
    const value = () => {}
    const addListener = jest.spyOn(window, 'addEventListener')
    const removeListener = jest.spyOn(window, 'removeEventListener')
    const el = {}

    Scroll.mounted(el as HTMLElement, { value } as any, null, null)
    expect(addListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unmounted(el as HTMLElement, null, null, null)
    expect(removeListener).toHaveBeenCalledWith('scroll', value, { passive: true })

    addListener.mockClear()
    removeListener.mockClear()
  })

  it('shoud rebind event on updated', () => {
    const value1 = () => {}
    const value2 = () => {}
    const addListener = jest.spyOn(window, 'addEventListener')
    const removeListener = jest.spyOn(window, 'removeEventListener')
    const el = {}

    Scroll.mounted(el as HTMLElement, { value: value1 } as any, null, null)
    expect(addListener).toHaveBeenCalledTimes(1)
    expect(addListener).toHaveBeenCalledWith('scroll', value1, { passive: true })

    Scroll.updated(el as HTMLElement, { value: value2, oldValue: value1 } as any, null, null)
    expect(removeListener).toHaveBeenCalledTimes(1)
    expect(removeListener).toHaveBeenCalledWith('scroll', value1, { passive: true })
    expect(addListener).toHaveBeenCalledTimes(2)
    expect(addListener).toHaveBeenCalledWith('scroll', value2, { passive: true })

    addListener.mockClear()
    removeListener.mockClear()
  })

  it('should not fail when unbinding element without _onScroll', () => {
    Scroll.unmounted({} as HTMLElement, null, null, null)
  })

  it('should call the callback on scroll', async () => {
    const callback = jest.fn()

    mountFunction(event => callback(event.target))

    expect(callback).not.toHaveBeenCalled()

    await scrollWindow(400)

    expect(callback).toHaveBeenCalledWith(window)
  })
})
