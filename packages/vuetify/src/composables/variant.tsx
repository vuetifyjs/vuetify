// Composables
import { useColor, useColorFast } from '@/composables/color'

// Utilities
import { computed, toValue, unref } from 'vue'
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
import type { MaybeRef, MaybeRefOrGetter, PropType } from 'vue'

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
  props: MaybeRef<VariantProps>,
  name = getCurrentInstanceName(),
) {
  const variantClasses = computed(() => {
    const { variant } = unref(props)
    return `${name}--variant-${variant}`
  })

  const { colorClasses, colorStyles } = useColor(computed(() => {
    const { variant, color } = unref(props)
    return {
      [['elevated', 'flat'].includes(variant) ? 'background' : 'text']: color,
    }
  }))

  return { colorClasses, colorStyles, variantClasses }
}

export function useVariantFast (
  props: MaybeRefOrGetter<VariantProps>,
  name = getCurrentInstanceName(),
) {
  const variantClasses = () => {
    const { variant } = toValue(props)
    return `${name}--variant-${variant}`
  }

  const { colorClasses, colorStyles } = useColorFast(() => {
    const { variant, color } = toValue(props)
    return {
      [['elevated', 'flat'].includes(variant) ? 'background' : 'text']: color,
    }
  })

  return { colorClasses, colorStyles, variantClasses }
}
