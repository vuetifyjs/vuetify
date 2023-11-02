// Directives
import ClickOutside from '../'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { wait } from '../../../../test'

function bootstrap (args?: object) {
  const outsideEl = document.createElement('div')
  const shadowHost = document.createElement('div')
  const shadowRoot = shadowHost.attachShadow({ mode: 'open' })
  const shadowEl = document.createElement('div')

  const binding = {
    value: {
      handler: jest.fn(),
      ...args,
    },
    instance: {
      $: { uid: 1 },
    },
  } as any

  let shadowClickHandler: any
  let outsideClickHandler: any

  let shadowMousedownHandler: any
  let outsideMousedownHandler: any

  document.body.appendChild(shadowHost)
  shadowRoot.appendChild(shadowEl)

  jest.spyOn(window.document, 'addEventListener').mockImplementation((eventName, eventHandler, options) => {
    if (eventName === 'click') outsideClickHandler = eventHandler
    if (eventName === 'mousedown') outsideMousedownHandler = eventHandler
  })

  jest.spyOn(shadowRoot, 'addEventListener').mockImplementation((eventName, eventHandler, options) => {
    if (eventName === 'click') shadowClickHandler = eventHandler
    if (eventName === 'mousedown') shadowMousedownHandler = eventHandler
  })

  jest.spyOn(window.document, 'removeEventListener')
  jest.spyOn(shadowRoot, 'removeEventListener')

  ClickOutside.mounted(shadowEl as HTMLElement, binding)

  return {
    binding,
    callback: binding.value.handler,
    shadowEl: shadowEl as HTMLElement,
    outsideEl: outsideEl as HTMLElement,
    shadowRoot: shadowRoot as Node,
    shadowClickHandler,
    outsideClickHandler,
    shadowMousedownHandler,
    outsideMousedownHandler,
  }
}

describe('click-outside.js within the Shadow DOM', () => {
  it('should register and unregister handler outside of the shadow DOM', () => {
    const { outsideClickHandler, shadowEl, binding } = bootstrap()
    expect(window.document.addEventListener).toHaveBeenCalledWith('click', outsideClickHandler, true)

    ClickOutside.unmounted(shadowEl, binding)
    expect(window.document.removeEventListener).toHaveBeenCalledWith('click', outsideClickHandler, true)
  })

  it('should register and unregister handler within the shadow DOM', () => {
    const { shadowClickHandler, shadowRoot, shadowEl, binding } = bootstrap()
    expect(shadowRoot.addEventListener).toHaveBeenCalledWith('click', shadowClickHandler, true)

    ClickOutside.unmounted(shadowEl, binding)
    expect(shadowRoot.removeEventListener).toHaveBeenCalledWith('click', shadowClickHandler, true)
  })

  it('should call the callback when closeConditional returns true and event target is outside the shadow DOM', async () => {
    const { outsideClickHandler, outsideMousedownHandler, callback, outsideEl } = bootstrap({ closeConditional: () => true })
    const event = { target: outsideEl }

    outsideMousedownHandler({ target: document.body })
    outsideClickHandler(event)
    await wait()
    expect(callback).toHaveBeenCalledWith(event)
  })

  it('should call the callback when closeConditional returns true and event target is within the shadow DOM', async () => {
    const { shadowClickHandler, outsideMousedownHandler, callback, shadowRoot } = bootstrap({ closeConditional: () => true })
    const event = { target: shadowRoot }

    outsideMousedownHandler({ target: document.body })
    shadowClickHandler(event)
    await wait()
    expect(callback).toHaveBeenCalledWith(event)
  })

  it('should not call the callback when closeConditional is not provided', async () => {
    const { shadowClickHandler, outsideMousedownHandler, callback, shadowEl } = bootstrap()

    outsideMousedownHandler({ target: document.body })
    shadowClickHandler({ target: shadowEl })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when clicked in element within the shadow DOM', async () => {
    const { shadowClickHandler, outsideMousedownHandler, callback, shadowEl } = bootstrap({ closeConditional: () => true })

    outsideMousedownHandler({ target: document.body })
    shadowClickHandler({ target: shadowEl })
    await wait()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should not call the callback when mousedown was on the element within the shadow DOM', async () => {
    const { shadowClickHandler, shadowMousedownHandler, callback, shadowEl } = bootstrap({ closeConditional: () => true })
    const mousedownEvent = { target: shadowEl }
    const clickEvent = { target: document.createElement('div') }

    shadowMousedownHandler(mousedownEvent)
    shadowClickHandler(clickEvent)
    await wait()
    expect(callback).not.toHaveBeenCalledWith(clickEvent)
  })
})
