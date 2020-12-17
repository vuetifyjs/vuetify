// Utilities
import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface BorderRadiusProps {
  rounded?: boolean | number | string
}

const radius = [
  true,
  false,
  0,
  '0',
  'xs',
  'sm',
  'lg',
  'xl',
  'circle',
  'pill',
  'shaped',
  'tile',
] as const

export const makeBorderRadiusProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    validator: (v: any) => radius.includes(v),
  },
})

// Effect
export function useBorderRadiusClasses (props: BorderRadiusProps) {
  const borderRadiusClasses = computed(() => {
    const rounded = props.rounded
    const classes = []

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
