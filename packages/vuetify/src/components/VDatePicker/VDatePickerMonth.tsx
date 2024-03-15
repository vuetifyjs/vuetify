// Styles
import './VDatePickerMonth.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { useDate } from '@/composables/date/date'

// Utilities
import { computed, ref, shallowRef } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export type VDatePickerMonthSlots = {
  day: {
    props: {
      onClick: () => void
    }
    item: any
    i: number
  }
}

export const makeVDatePickerMonthProps = propsFactory({
  color: String,
  hideWeekdays: Boolean,
  multiple: [Boolean, Number, String] as PropType<boolean | 'range' | number | (string & {})>,
  showWeek: Boolean,

  ...makeCalendarProps(),
}, 'VDatePickerMonth')

export const VDatePickerMonth = genericComponent<VDatePickerMonthSlots>()({
  name: 'VDatePickerMonth',

  props: makeVDatePickerMonthProps(),

  emits: {
    'update:modelValue': (date: unknown) => true,
    'update:month': (date: number) => true,
    'update:year': (date: number) => true,
  },

  setup (props, { emit, slots }) {
    const daysRef = ref()

    const { daysInMonth, model, weekNumbers } = useCalendar(props)
    const adapter = useDate()

    const rangeStart = shallowRef()
    const rangeStop = shallowRef()

    if (props.multiple === 'range' && model.value.length > 0) {
      rangeStart.value = model.value[0]
      if (model.value.length > 1) {
        rangeStop.value = model.value[model.value.length - 1]
      }
    }

    const atMax = computed(() => {
      const max = ['number', 'string'].includes(typeof props.multiple) ? Number(props.multiple) : Infinity

      return model.value.length >= max
    })

    function onRangeClick (value: unknown) {
      const _value = adapter.startOfDay(value)

      if (!rangeStart.value) {
        rangeStart.value = _value
        model.value = [rangeStart.value]
      } else if (!rangeStop.value) {
        if (adapter.isSameDay(_value, rangeStart.value)) {
          rangeStart.value = undefined
          model.value = []
          return
        } else if (adapter.isBefore(_value, rangeStart.value)) {
          rangeStop.value = adapter.endOfDay(rangeStart.value)
          rangeStart.value = _value
        } else {
          rangeStop.value = adapter.endOfDay(_value)
        }

        const diff = adapter.getDiff(rangeStop.value, rangeStart.value, 'days')
        const datesInRange = [rangeStart.value]

        for (let i = 1; i < diff; i++) {
          const nextDate = adapter.addDays(rangeStart.value, i)
          datesInRange.push(nextDate)
        }

        datesInRange.push(rangeStop.value)

        model.value = datesInRange
      } else {
        rangeStart.value = value
        rangeStop.value = undefined
        model.value = [rangeStart.value]
      }
    }

    function onMultipleClick (value: unknown) {
      const index = model.value.findIndex(selection => adapter.isSameDay(selection, value))

      if (index === -1) {
        model.value = [...model.value, value]
      } else {
        const value = [...model.value]
        value.splice(index, 1)
        model.value = value
      }
    }

    function onClick (value: unknown) {
      if (props.multiple === 'range') {
        onRangeClick(value)
      } else if (props.multiple) {
        onMultipleClick(value)
      } else {
        model.value = [value]
      }
    }

    return () => (
      <div class="v-date-picker-month">
        { props.showWeek && (
          <div key="weeks" class="v-date-picker-month__weeks">
            { !props.hideWeekdays && (
              <div key="hide-week-days" class="v-date-picker-month__day">&nbsp;</div>
            )}
            { weekNumbers.value.map(week => (
              <div
                class={[
                  'v-date-picker-month__day',
                  'v-date-picker-month__day--adjacent',
                ]}
              >{ week }</div>
            ))}
          </div>
        )}

        <div
          ref={ daysRef }
          class="v-date-picker-month__days"
        >
          { !props.hideWeekdays && adapter.getWeekdays().map(weekDay => (
            <div
              class={[
                'v-date-picker-month__day',
                'v-date-picker-month__weekday',
              ]}
            >{ weekDay }</div>
          ))}

          { daysInMonth.value.map((item, i) => {
            const slotProps = {
              props: {
                onClick: () => onClick(item.date),
              },
              item,
              i,
            } as const

            if (atMax.value && !item.isSelected) {
              item.isDisabled = true
            }

            return (
              <div
                class={[
                  'v-date-picker-month__day',
                  {
                    'v-date-picker-month__day--adjacent': item.isAdjacent,
                    'v-date-picker-month__day--hide-adjacent': item.isHidden,
                    'v-date-picker-month__day--selected': item.isSelected,
                    'v-date-picker-month__day--week-end': item.isWeekEnd,
                    'v-date-picker-month__day--week-start': item.isWeekStart,
                  },
                ]}
                data-v-date={ !item.isDisabled ? item.isoDate : undefined }
              >

                { (props.showAdjacentMonths || !item.isAdjacent) && (
                  <VDefaultsProvider
                    defaults={{
                      VBtn: {
                        class: 'v-date-picker-month__day-btn',
                        color: (item.isSelected || item.isToday) && !item.isDisabled
                          ? props.color
                          : undefined,
                        disabled: item.isDisabled,
                        icon: true,
                        ripple: false,
                        text: item.localized,
                        variant: item.isDisabled
                          ? item.isToday ? 'outlined' : 'text'
                          : item.isToday && !item.isSelected ? 'outlined' : 'flat',
                        onClick: () => onClick(item.date),
                      },
                    }}
                  >
                    { slots.day?.(slotProps) ?? (
                      <VBtn { ...slotProps.props } />
                    )}
                  </VDefaultsProvider>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
})

export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>
