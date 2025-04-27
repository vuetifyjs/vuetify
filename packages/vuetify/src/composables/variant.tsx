// Composables
import { useColor } from '@/composables/color'

// Utilities
import { toRef, toValue } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
import type { MaybeRefOrGetter, PropType } from 'vue'

export const allowedVariants = [
  'elevated',
  'flat',
  'tonal',
  'outlined',
  'text',
  'plain',
] as const

export type Variant = typeof allowedVariants[number]

export interface VariantProps {
  color?: string
  variant: Variant
}

export function genOverlays (isClickable: boolean, name: string) {
  return (
    <>
      { isClickable && <span key="overlay" class={ `${name}__overlay` } /> }

      <span key="underlay" class={ `${name}__underlay` } />
    </>
  )
}

export const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String as PropType<Variant>,
    default: 'elevated',
    validator: (v: any) => allowedVariants.includes(v),
  },
}, 'variant')

export function useVariant (
  props: MaybeRefOrGetter<VariantProps>,
  name = getCurrentInstanceName(),
) {
  const variantClasses = toRef(() => {
    const { variant } = toValue(props)
    return `${name}--variant-${variant}`
  })

  const { colorClasses, colorStyles } = useColor(() => {
    const { variant, color } = toValue(props)
    return {
      [['elevated', 'flat'].includes(variant) ? 'background' : 'text']: color,
    }
  })

  return { colorClasses, colorStyles, variantClasses }
}
