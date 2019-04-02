import Vue from 'vue'
import { test } from '@/test'
import ClickOutside from '@/directives/click-outside'

function bootstrap (args) {
  let registeredHandler
  const el = document.createElement('div')

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
    const event = { target: document.createElement('div') }

    registeredHandler(event)
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).toBeCalledWith(event)
  })

  it('should not call the callback when closeConditional returns false', async () => {
    const { registeredHandler, callback, el } = bootstrap({ closeConditional: () => false })

    registeredHandler({ target: el })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalled()
  })

  it('should not call the callback when closeConditional is not provided', async () => {
    const { registeredHandler, callback, el } = bootstrap()

    registeredHandler({ target: el })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalled()
  })

  it('should not call the callback when clicked in element', async () => {
    const { registeredHandler, callback, el } = bootstrap({ closeConditional: () => true })

    registeredHandler({ target: el })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalledWith()
  })

  it('should not call the callback when clicked in elements', async () => {
    const { registeredHandler, callback, el } = bootstrap({
      closeConditional: () => true,
      include: () => [el]
    })

    registeredHandler({ target: document.createElement('div') })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalledWith()
  })

  it('should not call the callback when event is not fired by user action', async () => {
    const { registeredHandler, callback } = bootstrap({ closeConditional: () => true })

    registeredHandler({ isTrusted: false })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalledWith()

    registeredHandler({ pointerType: false })
    await new Promise(resolve => setTimeout(resolve))
    expect(callback).not.toBeCalledWith()
  })
})
