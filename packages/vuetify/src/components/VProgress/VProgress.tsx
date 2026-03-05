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
  label: { value: number }
}

export const makeVProgressProps = propsFactory({
  type: {
    type: String as PropType<'linear' | 'circular'>,
    default: 'linear',
  },
  label: String,
  labelPosition: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },

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
      const scopeProps = { value: normalizedValue.value }

      const label = hasLabel && (
        <div class="v-progress__label">
          { slots.label?.(scopeProps) ?? props.label }
        </div>
      )

      if (isLinear.value) {
        const linearProps = VProgressLinear.filterProps(props)
        return (
          <div class={['v-progress', props.class]} style={ props.style }>
            { props.labelPosition === 'top' && label }
            <VProgressLinear { ...linearProps } />
            { props.labelPosition === 'bottom' && label }
          </div>
        )
      }

      const circularProps = VProgressCircular.filterProps(props)
      return (
        <div class={['v-progress', props.class]} style={ props.style }>
          { props.labelPosition === 'top' && label }
          <VProgressCircular { ...circularProps } />
          { props.labelPosition === 'bottom' && label }
        </div>
      )
    })

    return {}
  },
})

export type VProgress = InstanceType<typeof VProgress>
