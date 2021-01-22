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

    if (props.rounded === true || props.rounded === '') {
      classes.push('rounded')
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

  return { borderRadiusClasses }
}
