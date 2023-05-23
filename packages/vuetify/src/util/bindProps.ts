import { eventName, isOn } from '@/util/helpers'

const handlers = new WeakMap<HTMLElement, Set<[string, () => void]>>()

export function bindProps (el: HTMLElement, props: Record<string, any>) {
  Object.keys(props).forEach(k => {
    if (isOn(k)) {
      const name = eventName(k)
      if (props[k] == null) {
        const handler = handlers.get(el)
        handler?.forEach(v => {
          const [n, fn] = v
          if (n === name) {
            el.removeEventListener(name, fn)
            handler.delete(v)
          }
        })
      } else {
        el.addEventListener(name, props[k])
        const handler = handlers.get(el) || new Set()
        handler.add([name, props[k]])
        if (!handlers.has(el)) handlers.set(el, handler)
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
