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

export type ValueFormat = string | ((ctx: { value: number, max: number, percent: number }) => string)

type VProgressSlotsProps = {
  max: number
  percent: number
  value: number
  formattedValue: string
}

type VProgressSlots = {
  default: VProgressSlotsProps
  label: VProgressSlotsProps
  value: VProgressSlotsProps
}

export const makeVProgressProps = propsFactory({
  type: {
    type: String as PropType<'linear' | 'circular'>,
    default: 'linear',
  },
  label: String,
  detailsPosition: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },
  valueFormat: {
    type: [String, Function] as PropType<ValueFormat>,
    default: '[percent]%',
  },
  max: {
    type: [Number, String],
    default: 100,
  },
  absolute: Boolean,
  hideLabel: Boolean,
  hideValue: Boolean,
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

function formatValue (format: ValueFormat, value: number, max: number, percent: number): string {
  if (typeof format === 'function') return format({ value, max, percent })
  return format
    .replaceAll('[value]', String(value))
    .replaceAll('[max]', String(max))
    .replaceAll('[percent]', String(Math.round(percent)))
}

export const VProgress = genericComponent<VProgressSlots>()({
  name: 'VProgress',

  props: makeVProgressProps(),

  setup (props, { slots }) {
    const isLinear = toRef(() => props.type === 'linear')
    const max = toRef(() => parseFloat(props.max as string) || 100)
    const normalizedValue = computed(() => clamp(parseFloat(props.modelValue), 0, max.value))
    const percent = computed(() => normalizedValue.value / max.value * 100)
    const formattedValue = toRef(() => formatValue(props.valueFormat, normalizedValue.value, max.value, percent.value))

    useRender(() => {
      const hasDetails = !!(props.label || slots.label) && !(props.hideLabel && props.hideValue)
      const scopeProps = {
        max: max.value,
        percent: percent.value,
        value: normalizedValue.value,
        formattedValue: formattedValue.value,
      }

      const progressProps = {
        role: 'progressbar' as const,
        'aria-label': props.label,
        'aria-valuenow': props.indeterminate ? undefined : normalizedValue.value,
        'aria-valuemin': 0,
        'aria-valuemax': max.value,
        'aria-valuetext': props.indeterminate ? undefined : formattedValue.value,
      }

      function progressComponent () {
        if (isLinear.value) {
          const linearProps = VProgressLinear.filterProps(props)
          return (
            <VProgressLinear
              { ...linearProps }
              modelValue={ props.modelValue }
              aria-hidden="true"
            />
          )
        }

        const circularProps = VProgressCircular.filterProps(omit(props, ['indeterminate']))
        return (
          <VProgressCircular
            { ...circularProps }
            modelValue={ percent.value }
            aria-hidden="true"
            indeterminate={ props.indeterminate }
          />
        )
      }

      return (
        <div
          class={[
            'v-progress',
            {
              'v-progress--absolute': props.absolute,
            },
            props.class,
          ]}
          style={ props.style }
          { ...progressProps }
        >
          { hasDetails && (
            <div
              key="details"
              class={[
                'v-progress__details',
                `v-progress__details--location-${props.detailsPosition}`,
              ]}
              aria-hidden="true"
            >
              { !props.hideLabel && (
                <div key="label" class="v-progress__label">
                  { slots.label?.(scopeProps) ?? props.label }
                </div>
              )}
              { !props.hideValue && (
                <div key="value" class="v-progress__value">
                  { slots.value?.(scopeProps) ?? formattedValue.value }
                </div>
              )}
            </div>
          )}
          { slots.default?.(scopeProps) ?? progressComponent() }
          { props.absolute && hasDetails && (
            <div
              key="spacer"
              class="v-progress__spacer"
              style={{ order: props.detailsPosition === 'bottom' ? -1 : 2 }}
            />
          )}
        </div>
      )
    })

    return {}
  },
})

export type VProgress = InstanceType<typeof VProgress>
