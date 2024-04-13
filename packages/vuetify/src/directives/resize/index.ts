// Types
import type { DirectiveBinding } from 'vue'

interface ResizeDirectiveBinding extends Omit<DirectiveBinding, 'modifiers'> {
  value: () => void
  modifiers?: {
    active?: boolean
    quiet?: boolean
  }
}

function mounted (el: HTMLElement, binding: ResizeDirectiveBinding) {
  const handler = binding.value
  const options: AddEventListenerOptions = {
    passive: !binding.modifiers?.active,
  }

  window.addEventListener('resize', handler, options)

  el._onResize = Object(el._onResize)
  el._onResize![binding.instance!.$.uid] = {
    handler,
    options,
  }

  if (!binding.modifiers?.quiet) {
    handler()
  }
}

function unmounted (el: HTMLElement, binding: ResizeDirectiveBinding) {
  if (!el._onResize?.[binding.instance!.$.uid]) return

  const { handler, options } = el._onResize[binding.instance!.$.uid]!

  window.removeEventListener('resize', handler, options)

  delete el._onResize[binding.instance!.$.uid]
}

export const Resize = {
  mounted,
  unmounted,
}

export default Resize
