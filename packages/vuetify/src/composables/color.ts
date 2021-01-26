// Utilities
import { computed } from 'vue'
import { isCssColor } from '@/util/colorUtils'

// Types
import type { Ref } from 'vue'

export function useTextColor (color: Ref<string | null | undefined>) {
  const cssColor = computed(() => isCssColor(color.value))

  const textColorStyles = computed(() => {
    if (!color.value || !cssColor.value) return {}

    return {
      color: color.value,
      'caret-color': color.value,
    }
  })

  const textColorClasses = computed(() => {
    if (!color.value || cssColor.value) return null

    return `text-${color.value}`
  })

  return { textColorStyles, textColorClasses }
}

export function useBackgroundColor (color: Ref<string | null | undefined>) {
  const cssColor = computed(() => isCssColor(color.value))

  const backgroundColorStyles = computed(() => {
    if (!color.value || !isCssColor(color.value)) return {}

    return {
      'background-color': color.value,
    }
  })

  const backgroundColorClasses = computed(() => {
    if (!color.value || cssColor.value) return null

    return `bg-${color.value}`
  })

  return { backgroundColorStyles, backgroundColorClasses }
}
