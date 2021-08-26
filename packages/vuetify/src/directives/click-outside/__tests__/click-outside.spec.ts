// Directives
import ClickOutside from '../'
import { wait } from '../../../../test'

function bootstrap (args?: object) {
  const el = document.createElement('div')

  const binding = {
    value: {
      handler: jest.fn(),
      ...args,
    },
  }

  let clickHandler
  let mousedownHandler
  jest.spyOn(window.document, 'addEventListener').mockImplementation((eventName, eventHandler, options) => {
    if (eventName === 'click') clickHandler = eventHandler
    if (eventName === 'mousedown') mousedownHandler = eventHandler
  })
  jest.spyOn(window.document, 'removeEventListener')

  ClickOutside.inserted(el as HTMLElement, binding as any)

  return {
    callback: binding.value.handler,
    el: el as HTMLElement,
    clickHandler,
    mousedownHandler,
  }
}

describe('click-outside', () => {
  it('should register and unregister handler', () => {
    const { clickHandler, el } = bootstrap()
    expect(window.document.addEventListener).toHaveBeenCalledWith('click', clickHandler, true)

    ClickOutside.unbind(el)
    expect(window.document.removeEventListener).toHaveBeenCalledWith('click', clickHandler, true)
  })

  it('should call the callback when closeConditional returns true', async () => {
    const { clickHandler, callback } = bootstrap({ closeConditional: () => true })
    const event = { target: document.createElement('div') }

    clickHandler(event)
    await wait()
    expect(callback).toHaveBeenCalledWith(event)
  })

  it('should not call the callback when closeConditional returns false', async () => {
    const { clickHandler, callback, el } = bootstrap({ closeConditional: () => false })

    clickHandler({ target: el })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when closeConditional is not provided', async () => {
    const { clickHandler, callback, el } = bootstrap()

    clickHandler({ target: el })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when clicked in element', async () => {
    const { clickHandler, callback, el } = bootstrap({ closeConditional: () => true })

    clickHandler({ target: el })
    await wait()
    expect(callback).not.toHaveBeenCalledWith()
  })

  it('should not call the callback when clicked in elements', async () => {
    const { clickHandler, callback, el } = bootstrap({
      closeConditional: () => true,
      include: () => [el],
    })

    clickHandler({ target: document.createElement('div') })
    await wait()
    expect(callback).not.toHaveBeenCalledWith()
  })

  it('should not call the callback when event is not fired by user action', async () => {
    const { clickHandler, callback } = bootstrap({ closeConditional: () => true })

    clickHandler({ isTrusted: false })
    await wait()
    expect(callback).not.toHaveBeenCalledWith()

    clickHandler({ pointerType: false })
    await wait()
    expect(callback).not.toHaveBeenCalledWith()
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
