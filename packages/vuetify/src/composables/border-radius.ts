// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface BorderRadiusProps {
  rounded?: boolean | string | number | null
}

export const makeBorderRadiusProps = propsFactory({
  rounded: [Boolean, Number, String],
})

// Composables
export function useBorderRadius (props: BorderRadiusProps) {
  const borderRadiusClasses = computed(() => {
    const classes = []
    const rounded = props.rounded

    /* istanbul ignore else */
    if (rounded == null) {
      // noop
    } else if (rounded === true || rounded === '') {
      classes.push('rounded')
    } else if ([false, 0, '0', 'tile'].includes(rounded)) {
      classes.push('rounded-0')
    } else if (typeof rounded === 'string') {
      const values = rounded.split(' ')

      for (const value of values) {
        classes.push(`rounded-${value}`)
      }
    }

    return classes
  })

  return { borderRadiusClasses }
}
