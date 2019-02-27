import { VNodeDirective } from 'vue/types/vnode'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

interface ResizeVNodeDirective extends VNodeDirective {
  value?: () => void
  options?: boolean | AddEventListenerOptions
}

function inserted (el: HTMLElement, binding: ResizeVNodeDirective) {
  const callback = binding.value!

  el._resizeSensor = new ResizeSensor(el, callback)

  if (!binding.modifiers || !binding.modifiers.quiet) {
    callback()
  }
}

function unbind (el: HTMLElement) {
  if (!el._resizeSensor) return

  delete el._resizeSensor
}

const resize = {
  inserted,
  unbind
}

export { resize }
export default resize
