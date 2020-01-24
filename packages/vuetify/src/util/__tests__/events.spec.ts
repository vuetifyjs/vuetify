// Utility
import { eventOptions, passiveEventOptions, addOnceEventListener } from '../events'

describe('events.ts', () => {
  const capture = { capture: true }
  const passive = { passive: true }
  const combined = { ...capture, ...passive }
  /* eslint-disable-next-line */
  const noOptions = [, false]
  const defaultOptions = [
    noOptions,
    [true, true],
    [false, false],
    [undefined, false],
    [null, false],
    [capture, capture],
    [passive, passive],
    [combined, combined],
  ]
  const ie11Options = [
    noOptions,
    [true, true],
    [false, false],
    [undefined, false],
    [null, false],
    [capture, true],
    [passive, false],
    [combined, true],
  ]

  beforeEach(jest.resetModules)

  it('should create event options', () => {
    for (const [value, expected] of defaultOptions) {
      expect(eventOptions(value)).toEqual(expected)
    }
  })

  it('should fallback when passive is not supported', () => {
    jest.mock('../globals', () => ({ PASSIVE_SUPPORTED: false }))

    const { eventOptions } = require('../events')

    for (const [value, expected] of ie11Options) {
      expect(eventOptions(value)).toEqual(expected)
    }
  })

  it('should add passive to options if not already defined', () => {
    const passiveFalse = { passive: false }
    const passiveOptions = [
      /* eslint-disable-next-line */
      [, passive],
      [capture, { ...capture, ...passive }],
      [passive, passive],
      [passiveFalse, passiveFalse],
    ]

    for (const [value, expected] of passiveOptions) {
      expect(passiveEventOptions(value)).toEqual(expected)
    }
  })

  it('should add an event listener that removes after firing once', () => {
    const callback = jest.fn()
    const event = new Event('click')
    const el = document.createElement('button')

    document.body.appendChild(el)

    addOnceEventListener(el, 'click', callback)

    el.dispatchEvent(event)

    expect(callback).toHaveBeenCalled()

    el.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    document.body.removeChild(el)
  })
})
