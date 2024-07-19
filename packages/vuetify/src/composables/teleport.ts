// Composables
import { useSSRHandler } from '@/composables/ssr'

// Utilities
import { computed, warn } from 'vue'

export function useTeleport (target: () => (boolean | string | ParentNode)) {
  const { isServer } = useSSRHandler()
  const teleportTarget = computed(() => {
    const _target = target()

    if (_target === true || isServer) return undefined

    const targetElement =
      _target === false ? document.body
      : typeof _target === 'string' ? document.querySelector(_target)
      : _target

    if (targetElement == null) {
      warn(`Unable to locate target ${_target}`)
      return undefined
    }

    let container = targetElement.querySelector(':scope > .v-overlay-container')

    if (!container) {
      container = document.createElement('div')
      container.className = 'v-overlay-container'
      targetElement.appendChild(container)
    }

    return container
  })

  return { teleportTarget }
}
