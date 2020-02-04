import {
  createApp,
  defineComponent,
  h,
  withDirectives,
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
    const targetElement = { addEventListener: jest.fn(), removeEventListener: jest.fn() }
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
    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')
    const el = {}

    Scroll.mounted(el as HTMLElement, { value } as any, null, null)
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unmounted(el as HTMLElement, null, null, null)
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
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
