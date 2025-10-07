// Composables
import { useBackgroundColor, useColor } from '@/composables/color'

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
  bgColor?: string
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
  bgColor: String,
}, 'variant')

export function useVariant (
  props: MaybeRefOrGetter<VariantProps>,
  name = getCurrentInstanceName(),
) {
  const {variant, color, bgColor} = toValue(props)

  const variantClasses = toRef(() => {
    return `${name}--variant-${variant}`
  })

  const { colorClasses, colorStyles } = useColor(() => {
    return {
      [['elevated'].includes(variant) ? 'background' : 'text']: color,
    }
  })

  const {backgroundColorClasses, backgroundColorStyles} = useBackgroundColor(bgColor)

  return { colorClasses, colorStyles, backgroundColorClasses, backgroundColorStyles, variantClasses }
}
