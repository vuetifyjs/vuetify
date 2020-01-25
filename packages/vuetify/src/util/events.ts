import { PASSIVE_SUPPORTED } from './globals'

type EventOptions = boolean | AddEventListenerOptions

export function eventOptions (options: EventOptions = false): EventOptions {
  if (!PASSIVE_SUPPORTED) {
    options = options != null && typeof options === 'object'
      ? Boolean(options.capture)
      : options
  }

  return options
}

export function passiveEventOptions (options?: EventOptions): EventOptions {
  return eventOptions({
    passive: true,
    ...(typeof options === 'object' ? options : {}),
  })
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
