import Vue from 'vue'
import { test } from '@/test'
import ClickOutside from '@/directives/click-outside'

function bootstrap (args) {
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

  global.document.body.addEventListener = jest.fn((eventName, eventHandler, options) => {
    registeredHandler = eventHandler
  })
  global.document.body.removeEventListener = jest.fn()

  ClickOutside.inserted(el, binding)

  return {
    callback: binding.value,
    el,
    registeredHandler
  }
}

test('click-outside.js', () => {
  it('should register and unregister handler', () => {
    const { registeredHandler, el } = bootstrap()
    expect(global.document.body.addEventListener).toBeCalledWith('click', registeredHandler, true)

    ClickOutside.unbind(el)
    expect(global.document.body.removeEventListener).toBeCalledWith('click', registeredHandler, true)
  })

  it('should call the callback when closeConditional returns true', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => true })
    const event = { clientX: 5, clientY: 20}

    registeredHandler(event)
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).toBeCalledWith(event)
  })

  it('should not call the callback when closeConditional returns false', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => false })

    registeredHandler({ clientX: 5, clientY: 20})
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalled()
  })

  it('should not call the callback when closeConditional is not provided', async () => {
    const { registeredHandler, callback } = bootstrap()

    registeredHandler({ clientX: 5, clientY: 20})
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalled()
  })

  it('should not call the callback when clicked in element', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => true })

    registeredHandler({ clientX: 105, clientY: 120})
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalledWith()
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

    registeredHandler({ clientX: 1105, clientY: 1120})
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalledWith()
  })

  it('should not call the callback when event is not fired by user action', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => true })

    registeredHandler({ clientX: 5, clientY: 20, isTrusted: false })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalledWith()

    registeredHandler({ clientX: 5, clientY: 20, pointerType: false })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalledWith()
  })
})
