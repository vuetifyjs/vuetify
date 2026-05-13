// Utilities
import { computed } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
export interface BorderProps {
  border?: boolean | number | string
}

// Composables
export const makeBorderProps = propsFactory({
  border: [Boolean, Number, String],
}, 'border')

export function useBorder (
  props: BorderProps,
  name = getCurrentInstanceName(),
) {
  const borderClasses = computed(() => {
    const border = props.border

    if (border === true || border === '') {
      return `${name}--border`
    } else if (
      typeof border === 'string' ||
      border === 0
    ) {
      return String(border).split(' ').map(v => `border-${v}`)
    }

    return []
  })

  return { borderClasses }
}
