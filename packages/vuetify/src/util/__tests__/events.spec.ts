// Utility
import {
  addOnceEventListener,
  eventOptions,
  passiveEventOptions,
} from '../events'

describe('events.ts', () => {
  const capture = { capture: true }
  const passive = { passive: true }
  const combined = { ...capture, ...passive }
  // 2nd arg is for Evergreen Browsers
  // 3rd arg is for IE11
  const defaultOptions = [
    [true, true, true],
    [false, false, false],
    [undefined, false, false],
    [null, null, null],
    [capture, capture, true],
    [passive, passive, false],
    [combined, combined, true],
  ]

  beforeEach(jest.resetModules)

  describe('addOnceEventListener', () => {
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

  describe('eventOptions', () => {
    it('should create event options', () => {
      for (const [value, expected] of defaultOptions) {
        expect(eventOptions(value)).toEqual(expected)
      }
    })

    it('should fallback when passive is not supported', () => {
      jest.mock('../globals', () => ({ PASSIVE_SUPPORTED: false }))

      const { eventOptions } = require('../events')

      for (const [value,, expected] of defaultOptions) {
        expect(eventOptions(value)).toEqual(expected)
      }
    })
  })

  describe('passiveEventOptions', () => {
    it('should add passive to options if not already defined', () => {
      const captureFalse = { capture: false }
      const passiveFalse = { passive: false }
      const passiveOptions = [
        [false, { ...captureFalse, ...passive }],
        [true, combined],
        [null, passive],
        [undefined, passive],
        [capture, combined],
        [passive, passive],
        [passiveFalse, passiveFalse],
      ]

      for (const [value, expected] of passiveOptions) {
        expect(passiveEventOptions(value)).toEqual(expected)
      }
    })
  })
})
