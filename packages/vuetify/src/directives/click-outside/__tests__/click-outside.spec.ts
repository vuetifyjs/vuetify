// Directives
import ClickOutside from '../'
import { wait } from '../../../../test'

function bootstrap (args?: object) {
  let registeredHandler
  const el = document.createElement('div')

  const binding = {
    value: {
      handler: jest.fn(),
      ...args,
    },
  }

  jest.spyOn(window.document.body, 'addEventListener').mockImplementation((eventName, eventHandler, options) => {
    registeredHandler = eventHandler
  })
  jest.spyOn(window.document.body, 'removeEventListener')

  ClickOutside.inserted(el as HTMLElement, binding as any)

  return {
    callback: binding.value.handler,
    el: el as HTMLElement,
    registeredHandler,
  }
}

describe('click-outside.js', () => {
  it('should register and unregister handler', () => {
    const { registeredHandler, el } = bootstrap()
    expect(window.document.body.addEventListener).toHaveBeenCalledWith('click', registeredHandler, true)

    ClickOutside.unbind(el)
    expect(window.document.body.removeEventListener).toHaveBeenCalledWith('click', registeredHandler, true)
  })

  it('should call the callback when closeConditional returns true', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => true })
    const event = { target: document.createElement('div') }

    registeredHandler(event)
    await wait()
    expect(callback).toHaveBeenCalledWith(event)
  })

  it('should not call the callback when closeConditional returns false', async () => {
    const { registeredHandler, callback, el } = bootstrap({ closeConditional: () => false })

    registeredHandler({ target: el })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when closeConditional is not provided', async () => {
    const { registeredHandler, callback, el } = bootstrap()

    registeredHandler({ target: el })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when clicked in element', async () => {
    const { registeredHandler, callback, el } = bootstrap({ closeConditional: () => true })

    registeredHandler({ target: el })
    await wait()
    expect(callback).not.toHaveBeenCalledWith()
  })

  it('should not call the callback when clicked in elements', async () => {
    const { registeredHandler, callback, el } = bootstrap({
      closeConditional: () => true,
      include: () => [el],
    })

    registeredHandler({ target: document.createElement('div') })
    await wait()
    expect(callback).not.toHaveBeenCalledWith()
  })

  it('should not call the callback when event is not fired by user action', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => true })

    registeredHandler({ isTrusted: false })
    await wait()
    expect(callback).not.toHaveBeenCalledWith()

    registeredHandler({ pointerType: false })
    await wait()
    expect(callback).not.toHaveBeenCalledWith()
  })
})
