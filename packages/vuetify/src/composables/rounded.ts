import { computed } from 'vue'
import propsFactory from '@/util/propsFactory'

// Types
export interface RoundedProps {
  rounded?: boolean | string
  tile?: boolean
}

export const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, String],
    validator (v: any) {
      if (typeof v === 'boolean') {
        return true
      } else if (typeof v !== 'string') {
        return false
      }

      const classes = v.split(' ')
      for (const item of classes) {
        if (item.match(/^(tl|tr|br|bl)?-?(sm|lg|xl)$/g) === null) {
          return false
        }
      }

      return true
    },
  },
  tile: Boolean,
})

// Effect
export function useRoundedClasses (props: RoundedProps) {
  const roundedClasses = computed(() => {
    const { rounded = props.tile ? 0 : undefined } = props

    if (rounded === true) {
      return { rounded: true }
    } else if (typeof rounded === 'string') {
      const classes: Record<string, boolean> = {}
      const values = rounded.split(' ')

      for (const value of values) {
        classes[`rounded-${value}`] = true
      }
      return classes
    } else {
      return { 'rounded-0': true }
    }
  })

  return { roundedClasses }
}
