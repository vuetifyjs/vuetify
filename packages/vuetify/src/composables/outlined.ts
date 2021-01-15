// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface OutlinedProps {
  outlined?: boolean | string
}

// Composables
export const makeOutlinedProps = propsFactory({
  outlined: [Boolean, String],
})

export function useOutlined (props: OutlinedProps) {
  const outlinedClasses = computed(() => {
    const classes: string[] = []

    if (!props.outlined) return classes

    if (typeof props.outlined === 'string') {
      classes.push(`border-${props.outlined}`)
    } else {
      classes.push('border')
    }

    return classes
  })

  return { outlinedClasses }
}
