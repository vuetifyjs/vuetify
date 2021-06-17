// Composables
import { useColor } from '@/composables/color'

// Utilities
import { computed } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
const allowedVariants = [null, 'default', 'contained', 'outlined', 'text'] as const

type Variant = typeof allowedVariants[number]

export interface VariantProps {
  color?: String
  variant?: Variant
}

// Composables
export const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String as PropType<Variant>,
    default: 'default',
    validator: (v: any) => allowedVariants.includes(v),
  },
}, 'variant')

export function useVariant (props: VariantProps, name: string) {
  const variantClasses = computed(() => {
    return `${name}--variant-${props.variant}`
  })

  const { colorClasses, colorStyles } = useColor(computed(() => ({
    [props.variant === 'contained' ? 'background' : 'text']: props.color,
  })))

  return { colorClasses, colorStyles, variantClasses }
}
