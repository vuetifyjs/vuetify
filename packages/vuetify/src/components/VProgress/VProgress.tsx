// Styles
import './VProgress.sass'

// Components
import { makeVProgressCircularProps, VProgressCircular } from '@/components/VProgressCircular/VProgressCircular'
import { makeVProgressLinearProps, VProgressLinear } from '@/components/VProgressLinear/VProgressLinear'

// Utilities
import { computed, toRef } from 'vue'
import { clamp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

type VProgressSlots = {
  default: { value: number, buffer?: number }
  header: { value: number }
  label: { value: number }
  value: { value: number }
  footer: { value: number }
}

export const makeVProgressProps = propsFactory({
  type: {
    type: String as PropType<'linear' | 'circular'>,
    default: 'linear',
  },
  label: String,
  footer: String,

  ...makeVProgressLinearProps(),
  ...makeVProgressCircularProps(),
  indeterminate: Boolean,
}, 'VProgress')

export const VProgress = genericComponent<VProgressSlots>()({
  name: 'VProgress',

  props: makeVProgressProps(),

  setup (props, { slots }) {
    const isLinear = toRef(() => props.type === 'linear')
    const normalizedValue = computed(() => clamp(parseFloat(props.modelValue), 0, 100))

    useRender(() => {
      const hasLabel = !!(props.label || slots.label)
      const hasValue = !!slots.value
      const hasHeader = !!(hasLabel || hasValue || slots.header)
      const hasFooter = !!(props.footer || slots.footer)

      const scopeProps = { value: normalizedValue.value }

      const header = hasHeader && (
        <div class="v-progress__header">
          { slots.header
            ? slots.header(scopeProps)
            : (
              <>
                { hasLabel && (
                  <span class="v-progress__label">
                    { slots.label?.(scopeProps) ?? props.label }
                  </span>
                )}

                { hasValue && (
                  <span class="v-progress__value">
                    { slots.value!(scopeProps) }
                  </span>
                )}
              </>
            )
          }
        </div>
      )

      const footer = hasFooter && (
        <div class="v-progress__footer">
          { slots.footer?.(scopeProps) ?? props.footer }
        </div>
      )

      if (isLinear.value) {
        const linearProps = VProgressLinear.filterProps(props)
        return (
          <div class={['v-progress', props.class]} style={ props.style }>
            { header }
            <VProgressLinear { ...linearProps } />
            { footer }
          </div>
        )
      }

      const circularProps = VProgressCircular.filterProps(props)
      return (
        <div class={['v-progress', props.class]} style={ props.style }>
          { header }
          <VProgressCircular { ...circularProps } />
          { footer }
        </div>
      )
    })

    return {}
  },
})

export type VProgress = InstanceType<typeof VProgress>
