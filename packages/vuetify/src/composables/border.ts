// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface BorderProps {
  border?: boolean | number | string
}

// Composables
export const makeBorderProps = propsFactory({
  border: [Boolean, Number, String],
})

export function useBorder (props: BorderProps) {
  const borderClasses = computed(() => {
    const classes: string[] = []

    if (props.border == null) return classes

    if (props.border === true || props.border === '') {
      classes.push('border')
    } else if ([false, 0, '0'].includes(props.border)) {
      classes.push('border-0')
    } else if (typeof props.border === 'string') {
      const values = props.border.split(' ')

      for (const value of values) {
        classes.push(`border-${value}`)
      }
    }

    return classes
  })

  return { borderClasses }
}
