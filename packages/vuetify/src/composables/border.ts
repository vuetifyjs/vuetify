// Utilities
import { computed, isRef } from 'vue'
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
    const border = isRef(props) ? props.value : props.border
    const classes: string[] = []

    if (border === true || border === '') {
      classes.push(`${name}--border`)
    } else if (
      typeof border === 'string' ||
      border === 0
    ) {
      for (const value of String(border).split(' ')) {
        classes.push(`border-${value}`)
      }
    }

    return classes
  })

  return { borderClasses }
}
