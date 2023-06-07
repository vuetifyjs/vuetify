// Utilities
import { eventName, isOn } from '@/util/helpers'

const handlers = new WeakMap<HTMLElement, Set<[string, () => void]>>()

export function bindProps (el: HTMLElement, props: Record<string, any>) {
  Object.keys(props).forEach(k => {
    if (isOn(k)) {
      const name = eventName(k)
      const handler = handlers.get(el)
      if (props[k] == null) {
        handler?.forEach(v => {
          const [n, fn] = v
          if (n === name) {
            el.removeEventListener(name, fn)
            handler.delete(v)
          }
        })
      } else if (!handler || ![...handler]?.some(v => v[0] === name && v[1] === props[k])) {
        el.addEventListener(name, props[k])
        const _handler = handler || new Set()
        _handler.add([name, props[k]])
        if (!handlers.has(el)) handlers.set(el, _handler)
      }
    } else {
      if (props[k] == null) {
        el.removeAttribute(k)
      } else {
        el.setAttribute(k, props[k])
      }
    }
  })
}

export function unbindProps (el: HTMLElement, props: Record<string, any>) {
  Object.keys(props).forEach(k => {
    if (isOn(k)) {
      const name = eventName(k)
      const handler = handlers.get(el)
      handler?.forEach(v => {
        const [n, fn] = v
        if (n === name) {
          el.removeEventListener(name, fn)
          handler.delete(v)
        }
      })
    } else {
      el.removeAttribute(k)
    }
  })
}
