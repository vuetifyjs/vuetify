// Styles
import './VDatePickerMonth.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import * as dateUtil from '@/composables/date/temporal'
import { useLocale } from '@/composables/locale'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, ref, shallowRef, toRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

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
  transition: {
    type: String,
    default: 'picker-transition',
  },
  reverseTransition: {
    type: String,
    default: 'picker-reverse-transition',
  },

  ...omit(makeCalendarProps(), ['displayValue']),
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
    const { t } = useLocale()

    const { daysInMonth, model, weekNumbers, weekdayLabels } = useCalendar(props)

    const rangeStart = shallowRef<Temporal.PlainDate | null>()
    const rangeStop = shallowRef<Temporal.PlainDate | null>()
    const isReverse = shallowRef(false)

    const transition = toRef(() => {
      return !isReverse.value ? props.transition : props.reverseTransition
    })

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

    watch(daysInMonth, (val, oldVal) => {
      if (!oldVal) return

      isReverse.value = dateUtil.isBefore(val[0].date, oldVal[0].date)
    })

    function onRangeClick (value: Temporal.PlainDate) {
      if (model.value.length === 0) {
        rangeStart.value = undefined
      } else if (model.value.length === 1) {
        rangeStart.value = model.value[0]
        rangeStop.value = undefined
      }

      if (!rangeStart.value) {
        rangeStart.value = value
        model.value = [rangeStart.value]
      } else if (!rangeStop.value) {
        if (dateUtil.isSameDay(value, rangeStart.value)) {
          rangeStart.value = undefined
          model.value = []
          return
        } else if (dateUtil.isBefore(value, rangeStart.value)) {
          rangeStop.value = rangeStart.value
          rangeStart.value = value
        } else {
          rangeStop.value = value
        }

        model.value = [rangeStart.value, rangeStop.value]
      } else {
        rangeStart.value = value
        rangeStop.value = undefined
        model.value = [rangeStart.value]
      }
    }

    function getDateAriaLabel (item: any) {
      const fullDate = adapter.format(item.date, 'fullDateWithWeekday')
      const localeKey = item.isToday ? 'currentDate' : 'selectDate'
      return t(`$vuetify.datePicker.ariaLabel.${localeKey}`, fullDate)
    }

    function onMultipleClick (value: Temporal.PlainDate) {
      const index = model.value.findIndex(selection => dateUtil.isSameDay(selection!, value))

      if (index === -1) {
        model.value = [...model.value, value]
      } else {
        const value = [...model.value]
        value.splice(index, 1)
        model.value = value
      }
    }

    function onClick (value: Temporal.PlainDate) {
      if (props.multiple === 'range') {
        onRangeClick(value)
      } else if (props.multiple) {
        onMultipleClick(value)
      } else {
        model.value = [value]
      }
    }

    useRender(() => (
      <div
        class="v-date-picker-month"
        style={{ '--v-date-picker-days-in-week': props.weekdays.length }}
      >
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

        <MaybeTransition name={ transition.value }>
          <div
            ref={ daysRef }
            key={ daysInMonth.value[0].date?.toString() }
            class="v-date-picker-month__days"
          >
            { !props.hideWeekdays && weekdayLabels.value.map(weekDay => (
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
                  class: 'v-date-picker-month__day-btn',
                  color: item.isSelected || item.isToday ? props.color : undefined,
                  disabled: item.isDisabled,
                  icon: true,
                  ripple: false,
                  text: item.localized,
                  variant: item.isSelected ? 'flat' : item.isToday ? 'outlined' : 'text',
                  'aria-label': getDateAriaLabel(item),
                  'aria-current': item.isToday ? 'date' : undefined,
                  onClick: () => onClick(item.date),
                },
                item,
                i,
              } as const

              const isSelected = props.multiple === 'range' && model.value.length === 2
                ? dateUtil.isWithinRange(item.date, model.value as [Temporal.PlainDate, Temporal.PlainDate])
                : model.value.some(selectedDate => dateUtil.isSameDay(selectedDate!, item.date))

              if (atMax.value && !isSelected) {
                item.isDisabled = true
              }

              return (
                <div
                  class={[
                    'v-date-picker-month__day',
                    {
                      'v-date-picker-month__day--adjacent': item.isAdjacent,
                      'v-date-picker-month__day--hide-adjacent': item.isHidden,
                      'v-date-picker-month__day--selected': isSelected,
                      'v-date-picker-month__day--week-end': item.isWeekEnd,
                      'v-date-picker-month__day--week-start': item.isWeekStart,
                    },
                  ]}
                  data-v-date={ !item.isDisabled ? item.isoDate : undefined }
                >
                  { (props.showAdjacentMonths || !item.isAdjacent) && (
                    slots.day?.(slotProps) ?? (<VBtn { ...slotProps.props } />)
                  )}
                </div>
              )
            })}
          </div>
        </MaybeTransition>
      </div>
    ))
  },
})

export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>
