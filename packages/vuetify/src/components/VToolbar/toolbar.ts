// Utilities
import { computed } from 'vue'

// Types
import type { Ref } from 'vue'
import type { Density } from './VToolbar'

export function useToolbarHeight (
  props: { height: number | string, extensionHeight: number | string, density: Density },
  isExtended: Readonly<Ref<boolean>>,
) {
  const contentHeight = computed(() => parseInt((
    Number(props.height) +
    (props.density === 'prominent' ? Number(props.height) : 0) -
    (props.density === 'comfortable' ? 8 : 0) -
    (props.density === 'compact' ? 16 : 0)
  ), 10))
  const extensionHeight = computed(() => isExtended.value
    ? parseInt((
      Number(props.extensionHeight) +
      (props.density === 'prominent' ? Number(props.extensionHeight) : 0) -
      (props.density === 'comfortable' ? 4 : 0) -
      (props.density === 'compact' ? 8 : 0)
    ), 10)
    : 0
  )

  return { contentHeight, extensionHeight }
}
