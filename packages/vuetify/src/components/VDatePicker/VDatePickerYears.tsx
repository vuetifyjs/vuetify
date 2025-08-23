// Styles
import './VDatePickerYears.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import vIntersect from '@/directives/intersect'

// Utilities
import { computed, watchEffect } from 'vue'
import { convertToUnit, createRange, genericComponent, propsFactory, templateRef, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

// Types
export type VDatePickerYearsSlots = {
  year: {
    year: {
      text: string
      value: number
    }
    i: number
    props: {
      active: boolean
      color?: string
      rounded: boolean
      text: string
      variant: 'flat' | 'text'
      onClick: () => void
    }
  }
}

export const makeVDatePickerYearsProps = propsFactory({
  color: String,
  height: [String, Number],
  min: null as any as PropType<unknown>,
  max: null as any as PropType<unknown>,
  modelValue: Number,
  allowedYears: [Array, Function] as PropType<number[] | ((date: number) => boolean)>,
}, 'VDatePickerYears')

export const VDatePickerYears = genericComponent<VDatePickerYearsSlots>()({
  name: 'VDatePickerYears',

  props: makeVDatePickerYearsProps(),

  directives: { vIntersect },

  emits: {
    'update:modelValue': (year: number) => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const model = useProxiedModel(props, 'modelValue')
    const years = computed(() => {
      const year = adapter.getYear(adapter.date())

      let min = year - 100
      let max = year + 52

      if (props.min) {
        min = adapter.getYear(adapter.date(props.min))
      }

      if (props.max) {
        max = adapter.getYear(adapter.date(props.max))
      }

      let date = adapter.startOfYear(adapter.date())

      date = adapter.setYear(date, min)

      return createRange(max - min + 1, min).map(i => {
        const text = adapter.format(date, 'year')
        date = adapter.setYear(date, adapter.getYear(date) + 1)

        return {
          text,
          value: i,
          isDisabled: !isYearAllowed(i),
        }
      })
    })

    watchEffect(() => {
      model.value = model.value ?? adapter.getYear(adapter.date())
    })

    const yearRef = templateRef()

    function focusSelectedYear () {
      yearRef.el?.focus()
    }

    function isYearAllowed (year: number) {
      if (Array.isArray(props.allowedYears) && props.allowedYears.length) {
        return props.allowedYears.includes(year)
      }

      if (typeof props.allowedYears === 'function') {
        return props.allowedYears(year)
      }

      return true
    }

    useRender(() => (
      <div
        class="v-date-picker-years"
        v-intersect={[{
          handler: focusSelectedYear,
        }, null, ['once']]}
        style={{
          height: convertToUnit(props.height),
        }}
      >
        <div class="v-date-picker-years__content">
          { years.value.map((year, i) => {
            const btnProps = {
              ref: model.value === year.value ? yearRef : undefined,
              active: model.value === year.value,
              color: model.value === year.value ? props.color : undefined,
              rounded: true,
              text: year.text,
              disabled: year.isDisabled,
              variant: model.value === year.value ? 'flat' : 'text',
              onClick: () => {
                if (model.value === year.value) {
                  emit('update:modelValue', model.value)
                  return
                }
                model.value = year.value
              },
            } as const

            return slots.year?.({
              year,
              i,
              props: btnProps,
            }) ?? (
              <VBtn
                key="month"
                { ...btnProps }
              />
            )
          })}
        </div>
      </div>
    ))

    return {}
  },
})

export type VDatePickerYears = InstanceType<typeof VDatePickerYears>
