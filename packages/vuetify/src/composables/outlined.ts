// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface OutlinedProps {
  outlined?: boolean | number | string
}

// Composables
export const makeOutlinedProps = propsFactory({
  outlined: [Boolean, Number, String],
})

export function useOutlined (props: OutlinedProps) {
  const outlinedClasses = computed(() => {
    const classes: string[] = []

    if (props.outlined == null) return classes

    if (props.outlined === true || props.outlined === '') {
      classes.push('border')
    } else if ([false, 0, '0'].includes(props.outlined)) {
      classes.push('border-0')
    } else if (typeof props.outlined === 'string') {
      const values = props.outlined.split(' ')

      for (const value of values) {
        classes.push(`border-${value}`)
      }
    }

    return classes
  })

  return { outlinedClasses }
}
