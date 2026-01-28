// Styles
import './VDatePickerMonths.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, watchEffect } from 'vue'
import { convertToUnit, createRange, genericComponent, propsFactory, renderSlot, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VDatePickerMonthsSlots = {
  month: {
    month: {
      text: string
      value: number
    }
    i: number
    props: {
      onClick: () => void
    }
  }
}

export const makeVDatePickerMonthsProps = propsFactory({
  color: String,
  height: [String, Number],
  min: null as any as PropType<unknown>,
  max: null as any as PropType<unknown>,
  modelValue: Number,
  year: Number,
  allowedMonths: [Array, Function] as PropType<number[] | ((date: number) => boolean)>,
}, 'VDatePickerMonths')

export const VDatePickerMonths = genericComponent<VDatePickerMonthsSlots>()({
  name: 'VDatePickerMonths',

  props: makeVDatePickerMonthsProps(),

  emits: {
    'update:modelValue': (date: any) => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const model = useProxiedModel(props, 'modelValue')

    const months = computed(() => {
      let date = adapter.startOfYear(adapter.date())
      if (props.year) {
        date = adapter.setYear(date, props.year)
      }
      return createRange(12).map(i => {
        const text = adapter.format(date, 'monthShort')
        const label = adapter.format(date, 'month')
        const isDisabled =
          !!(
            !isMonthAllowed(i) ||
            (props.min && adapter.isAfter(adapter.startOfMonth(adapter.date(props.min)), date)) ||
            (props.max && adapter.isAfter(date, adapter.startOfMonth(adapter.date(props.max))))
          )
        date = adapter.getNextMonth(date)

        return {
          isDisabled,
          text,
          label,
          value: i,
        }
      })
    })

    watchEffect(() => {
      model.value = model.value ?? adapter.getMonth(adapter.date())
    })

    function isMonthAllowed (month: number) {
      if (Array.isArray(props.allowedMonths) && props.allowedMonths.length) {
        return props.allowedMonths.includes(month)
      }

      if (typeof props.allowedMonths === 'function') {
        return props.allowedMonths(month)
      }

      return true
    }

    useRender(() => (
      <div
        class="v-date-picker-months"
        style={{
          height: convertToUnit(props.height),
        }}
      >
        <div class="v-date-picker-months__content">
          { months.value.map((month, i) => {
            const btnProps = {
              active: model.value === i,
              ariaLabel: month.label,
              color: model.value === i ? props.color : undefined,
              disabled: month.isDisabled,
              rounded: true,
              text: month.text,
              variant: model.value === month.value ? 'flat' : 'text',
              onClick: () => onClick(i),
            } as const

            function onClick (i: number) {
              if (model.value === i) {
                emit('update:modelValue', model.value)
                return
              }
              model.value = i
            }

            return renderSlot(slots, 'month', {
              month,
              i,
              props: btnProps,
            }, () => (
              <VBtn
                key="month"
                { ...btnProps }
              />
            ))
          })}
        </div>
      </div>
    ))

    return {}
  },
})

export type VDatePickerMonths = InstanceType<typeof VDatePickerMonths>
