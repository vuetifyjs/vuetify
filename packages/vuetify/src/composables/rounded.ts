// Utilities
import { computed, isRef } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

type RoundedValue = boolean | string | number | null | undefined

export interface RoundedProps {
  rounded?: RoundedValue
  tile?: boolean
}

type RoundedData = {
  roundedClasses: Ref<string[]>
}

// Composables
export const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: undefined,
  },
  tile: Boolean,
}, 'rounded')

export function useRounded (
  props: RoundedProps | Ref<RoundedValue>,
  name = getCurrentInstanceName(),
): RoundedData {
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded
    const tile = isRef(props) ? props.value : props.tile
    const classes: string[] = []

    if (rounded === true || rounded === '') {
      classes.push(`${name}--rounded`)
    } else if (
      typeof rounded === 'string' ||
      rounded === 0
    ) {
      for (const value of String(rounded).split(' ')) {
        classes.push(`rounded-${value}`)
      }
    } else if (tile || rounded === false) {
      classes.push('rounded-0')
    }

    return classes
  })

  return { roundedClasses }
}
