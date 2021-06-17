// Utilities
import { computed } from 'vue'
import { propsFactory } from '@/util'

// Types
export interface BorderProps {
  border?: boolean | number | string
}

// Composables
export const makeBorderProps = propsFactory({
  border: [Boolean, Number, String],
}, 'border')

export function useBorder (props: BorderProps, name: string) {
  const borderClasses = computed(() => {
    const classes: string[] = []

    if (props.border === true || props.border === '') {
      classes.push(`${name}--border`)
    }

    if (
      (typeof props.border === 'string' && props.border !== '') ||
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
