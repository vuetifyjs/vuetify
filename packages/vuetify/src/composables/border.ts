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

    if (props.border === true || props.border === '') {
      classes.push('border')
    } else if (
      typeof props.border === 'string' ||
      props.border === 0
    ) {
      for (const value of String(props.border).split(' ')) {
        classes.push(`border-${value}`)
      }
    }

    return classes
  })

  return { borderClasses }
}
