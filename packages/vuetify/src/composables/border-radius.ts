// Utilities
import { computed } from 'vue'
import type { Prop } from 'vue'

import propsFactory from '@/util/propsFactory'

// Types
export type IRounded = typeof radius[number]
export interface BorderRadiusProps {
  rounded?: IRounded
}

const radius = [
  true,
  false,
  '',
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
  } as Prop<IRounded>,
})

export const roundedClassNames = (
  props: BorderRadiusProps,
): string[] => {
  const classes = []

  if (props && 'rounded' in props) {
    const rounded = props.rounded

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
  }

  return classes.sort()
}

// Effect
export function useBorderRadius (props: BorderRadiusProps) {
  const borderRadiusClasses = computed(() => {
    return roundedClassNames(props)
  })

  return { borderRadiusClasses }
}
