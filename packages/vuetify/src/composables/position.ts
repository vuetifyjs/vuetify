// Utilities
import type { PropType } from 'vue'
import { computed } from 'vue'
import { convertToUnit } from '@/util/helpers'
import propsFactory from '@/util/propsFactory'

// Types
export interface PositionProps {
  bottom?: boolean | string
  left?: boolean | string
  position?: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky'
  right?: boolean | string
  top?: boolean | string
}

const positionValues = ['static', 'relative', 'fixed', 'absolute', 'sticky'] as const

// Composables
export const makePositionProps = propsFactory({
  bottom: [Boolean, String],
  left: [Boolean, String],
  position: {
    type: String as PropType<Partial<typeof positionValues[number]>>,
    validator: /* istanbul ignore next */ (v: any) => positionValues.includes(v),
  },
  right: [Boolean, String],
  top: [Boolean, String],
})

export function usePosition (props: PositionProps) {
  const targets = ['top', 'right', 'bottom', 'left'] as const

  const positionClasses = computed(() => {
    return props.position ? `position-${props.position}` : undefined
  })

  const positionStyles = computed(() => {
    const styles: Partial<Record<typeof targets[number], string>> = {}

    for (const target of targets) {
      const prop = props[target]

      if (prop == null || prop === false) continue

      styles[target] = convertToUnit(prop === true ? '0' : String(prop))
    }

    return styles
  })

  return { positionClasses, positionStyles }
}
