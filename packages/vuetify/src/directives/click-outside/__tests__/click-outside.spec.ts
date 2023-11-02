// Directives
import ClickOutside from '../'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { wait } from '../../../../test'

function bootstrap (args?: object) {
  const el = document.createElement('div')
  const el2 = document.createElement('div')

  const binding = {
    value: {
      handler: jest.fn(),
      ...args,
    },
    instance: {
      $: { uid: 1 },
    },
  } as any

  let clickHandler: any
  let mousedownHandler: any
  jest.spyOn(window.document, 'addEventListener').mockImplementation((eventName, eventHandler, options) => {
    if (eventName === 'click') clickHandler = eventHandler
    if (eventName === 'mousedown') mousedownHandler = eventHandler
  })
  jest.spyOn(window.document, 'removeEventListener')

  ClickOutside.mounted(el as HTMLElement, binding)

  return {
    binding,
    callback: binding.value.handler,
    el: el as HTMLElement,
    el2: el2 as HTMLElement,
    clickHandler,
    mousedownHandler,
  }
}

describe('v-click-outside', () => {
  it('should register and unregister handler', () => {
    const { clickHandler, el, binding } = bootstrap()
    expect(window.document.addEventListener).toHaveBeenCalledWith('click', clickHandler, true)

    ClickOutside.unmounted(el, binding)
    expect(window.document.removeEventListener).toHaveBeenCalledWith('click', clickHandler, true)
  })

  it('should call the callback when closeConditional returns true', async () => {
    const { clickHandler, mousedownHandler, callback } = bootstrap({ closeConditional: () => true })
    const event = { target: document.createElement('div') }

    mousedownHandler({ target: document.body })
    clickHandler(event)
    await wait()
    expect(callback).toHaveBeenCalledWith(event)
  })

  it('should not call the callback when closeConditional returns false', async () => {
    const { clickHandler, mousedownHandler, callback, el } = bootstrap({ closeConditional: () => false })

    mousedownHandler({ target: document.body })
    clickHandler({ target: el })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when closeConditional is not provided', async () => {
    const { clickHandler, mousedownHandler, callback, el } = bootstrap()

    mousedownHandler({ target: document.body })
    clickHandler({ target: el })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when clicked in element', async () => {
    const { clickHandler, mousedownHandler, callback, el } = bootstrap({ closeConditional: () => true })

    mousedownHandler({ target: document.body })
    clickHandler({ target: el })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when clicked in included element', async () => {
    const { clickHandler, mousedownHandler, callback, el2 } = bootstrap({
      closeConditional: () => true,
      include: () => [el2],
    })

    mousedownHandler({ target: document.body })
    clickHandler({ target: el2 })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when mousedown was on the element', async () => {
    const { clickHandler, mousedownHandler, callback, el } = bootstrap({ closeConditional: () => true })
    const mousedownEvent = { target: el }
    const clickEvent = { target: document.createElement('div') }

    mousedownHandler(mousedownEvent)
    clickHandler(clickEvent)
    await wait()
    expect(callback).not.toHaveBeenCalledWith(clickEvent)
  })
})
