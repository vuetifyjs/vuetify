// Directives
import ClickOutside from '../'

function bootstrap (args?: object) {
  let registeredHandler
  const el = {
    getBoundingClientRect: () => ({
      top: 100,
      bottom: 200,
      left: 100,
      right: 200
    })
  }

  const binding = {
    value: jest.fn(),
    args
  }

  jest.spyOn(window.document.body, 'addEventListener').mockImplementation((eventName, eventHandler, options) => {
    registeredHandler = eventHandler
  })
  jest.spyOn(window.document.body, 'removeEventListener')

  ClickOutside.inserted(el as HTMLElement, binding as any)

  return {
    callback: binding.value,
    el: el as HTMLElement,
    registeredHandler
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
    const event = { clientX: 5, clientY: 20 }

    registeredHandler(event)
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).toHaveBeenCalledWith(event)
  })

  it('should not call the callback when closeConditional returns false', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => false })

    registeredHandler({ clientX: 5, clientY: 20 })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when closeConditional is not provided', async () => {
    const { registeredHandler, callback } = bootstrap()

    registeredHandler({ clientX: 5, clientY: 20 })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when clicked in element', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => true })

    registeredHandler({ clientX: 105, clientY: 120 })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toHaveBeenCalledWith()
  })

  it('should not call the callback when clicked in elements', async () => {
    const { registeredHandler, callback } = bootstrap({
      closeConditional: () => true,
      include: () => [{
        getBoundingClientRect: () => ({
          top: 1100,
          bottom: 1200,
          left: 1100,
          right: 1200
        })
      }]
    })

    registeredHandler({ clientX: 1105, clientY: 1120 })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toHaveBeenCalledWith()
  })

  it('should not call the callback when event is not fired by user action', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => true })

    registeredHandler({ clientX: 5, clientY: 20, isTrusted: false })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toHaveBeenCalledWith()

    registeredHandler({ clientX: 5, clientY: 20, pointerType: false })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toHaveBeenCalledWith()
  })
})
