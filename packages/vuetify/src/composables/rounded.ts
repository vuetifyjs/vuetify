// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface RoundedProps {
  rounded?: boolean | string | number | null
}

// Composables
export const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: undefined,
  },
}, 'rounded')

export function useRounded (props: RoundedProps, name: string) {
  const roundedClasses = computed(() => {
    const classes: string[] = []

    if (props.rounded === true || props.rounded === '') {
      classes.push(`${name}--rounded`)
    } else if (
      typeof props.rounded === 'string' ||
      props.rounded === 0
    ) {
      for (const value of String(props.rounded).split(' ')) {
        classes.push(`rounded-${value}`)
      }
    }

    return classes
  })

  return { roundedClasses }
}
