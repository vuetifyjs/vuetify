// Utilities
import { computed, warn } from 'vue'
import { IN_BROWSER, isString } from '@/util'

export function useTeleport (target: () => (boolean | string | ParentNode)) {
  const teleportTarget = computed(() => {
    const _target = target()

    if (_target === true || !IN_BROWSER) return undefined

    const targetElement =
      _target === false ? document.body
      : isString(_target) ? document.querySelector(_target)
      : _target

    if (!targetElement) {
      warn(`Unable to locate target ${_target}`)
      return undefined
    }

    let container = [...targetElement.children].find(el => el.matches('.v-overlay-container'))

    if (!container) {
      container = document.createElement('div')
      container.className = 'v-overlay-container'
      targetElement.appendChild(container)
    }

    return container
  })

  return { teleportTarget }
}
