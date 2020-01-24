import { PASSIVE_SUPPORTED } from './globals'

type EventOptions = boolean | AddEventListenerOptions

export function eventOptions (options: EventOptions = false): EventOptions {
  options = options || false

  if (!PASSIVE_SUPPORTED) {
    options = typeof options === 'object'
      ? Boolean(options.capture)
      : options
  }

  return options
}

export function passiveEventOptions (options: EventOptions = {}): EventOptions {
  if (typeof options === 'object' && !('passive' in options)) {
    options.passive = true
  }

  return eventOptions(options)
}

export function addOnceEventListener (
  el: EventTarget,
  eventName: string,
  cb: (event: Event) => void,
  options?: EventOptions
): void {
  options = eventOptions(options)

  var once = (event: Event) => {
    cb(event)

    el.removeEventListener(eventName, once, options)
  }

  el.addEventListener(eventName, once, options)
}
