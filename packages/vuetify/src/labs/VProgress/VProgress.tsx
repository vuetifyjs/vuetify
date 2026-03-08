// Styles
import './VProgress.sass'

// Components
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular'
import { makeVProgressLinearProps, VProgressLinear } from '@/components/VProgressLinear/VProgressLinear'

// Composables
import { makeComponentProps } from '@/composables/component'

// Utilities
import { computed, toRef } from 'vue'
import { clamp, genericComponent, omit, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type ValueFormat = string | ((value: number) => string)

type VProgressSlots = {
  label: { value: number, formattedValue: string }
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
  valueFormat: {
    type: [String, Function] as PropType<ValueFormat>,
    default: '[value]%',
  },
  indeterminate: Boolean,
  rounded: Boolean,

  ...pick(makeVProgressLinearProps(), [
    // relevant props shared between linear and circular
    'modelValue',
    'color',
    'bgColor',
    'theme',
  ]),
  ...makeComponentProps(),
}, 'VProgress')

function formatValue (format: ValueFormat, value: number): string {
  if (typeof format === 'function') return format(value)
  return format.replaceAll('[value]', String(Math.round(value)))
}

export const VProgress = genericComponent<VProgressSlots>()({
  name: 'VProgress',

  props: makeVProgressProps(),

  setup (props, { slots }) {
    const isLinear = toRef(() => props.type === 'linear')
    const normalizedValue = computed(() => clamp(parseFloat(props.modelValue), 0, 100))
    const formattedValue = toRef(() => formatValue(props.valueFormat, normalizedValue.value))

    useRender(() => {
      const hasLabel = !!(props.label || slots.label)
      const scopeProps = { value: normalizedValue.value, formattedValue: formattedValue.value }

      const progressProps = {
        role: 'progressbar' as const,
        'aria-label': props.label,
        'aria-valuenow': props.indeterminate ? undefined : normalizedValue.value,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuetext': props.indeterminate ? undefined : formattedValue.value,
      }

      function progressComponent () {
        if (isLinear.value) {
          const linearProps = VProgressLinear.filterProps(props)
          return <VProgressLinear { ...linearProps } aria-hidden="true" />
        }

        const circularProps = VProgressCircular.filterProps(omit(props, ['indeterminate']))
        return <VProgressCircular { ...circularProps } aria-hidden="true" indeterminate={ props.indeterminate } />
      }

      return (
        <div
          class={[
            'v-progress',
            props.class,
          ]}
          style={ props.style }
          { ...progressProps }
        >
          { hasLabel && (
            <div
              key="label"
              class={[
                'v-progress__label',
                `v-progress__label--location-${props.labelPosition}`,
              ]}
              aria-hidden="true"
            >
              { slots.label?.(scopeProps) ?? props.label }
            </div>
          )}
          { progressComponent() }
        </div>
      )
    })

    return {}
  },
})

export type VProgress = InstanceType<typeof VProgress>
