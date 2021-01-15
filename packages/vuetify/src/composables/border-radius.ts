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
    const classes: string[] = []

    if (props.rounded == null) return classes

    if (props.rounded === true || props.rounded === '') {
      classes.push('rounded')
    } else if ([false, 0, '0', 'tile'].includes(props.rounded)) {
      classes.push('rounded-0')
    } else if (typeof props.rounded === 'string') {
      const values = props.rounded.split(' ')

      for (const value of values) {
        classes.push(`rounded-${value}`)
      }
    }

    return classes
  })

  return { borderRadiusClasses }
}
