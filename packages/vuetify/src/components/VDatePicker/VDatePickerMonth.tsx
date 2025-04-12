// Styles
import './VDatePickerMonth.sass'

// Components
import { VBadge } from '@/components/VBadge'
import { VBtn } from '@/components/VBtn'

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { useDate } from '@/composables/date/date'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

export type DatePickerEventColorValue = string | string[]

export type DatePickerEventColors = DatePickerEventColorValue |
Record<string, DatePickerEventColorValue> | ((date: string) => DatePickerEventColorValue)

export type DatePickerEvents = string[] |
((date: string) => boolean | DatePickerEventColorValue) | Record<string, DatePickerEventColorValue>

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
  events: {
    type: [Array, Function, Object] as PropType<DatePickerEvents | null>,
    default: () => null,
  },
  eventColor: {
    type: [Array, Function, Object, String] as PropType<DatePickerEventColors>,
    default: () => null,
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

    const { daysInMonth, model, weekNumbers } = useCalendar(props)
    const adapter = useDate()

    const rangeStart = shallowRef()
    const rangeStop = shallowRef()
    const isReverse = shallowRef(false)

    const transition = computed(() => {
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

      isReverse.value = adapter.isBefore(val[0].date, oldVal[0].date)
    })

    function onRangeClick (value: unknown) {
      const _value = adapter.startOfDay(value)

      if (model.value.length === 0) {
        rangeStart.value = undefined
      } else if (model.value.length === 1) {
        rangeStart.value = model.value[0]
        rangeStop.value = undefined
      }
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
    function getEventColors (date: string): string[] {
      const { events, eventColor } = props
      let eventData: boolean | DatePickerEventColorValue
      let eventColors: string[] = []

      if (Array.isArray(events)) {
        eventData = events.includes(date)
      } else if (events instanceof Function) {
        eventData = events(date) || false
      } else if (events) {
        eventData = events[date] || false
      } else {
        eventData = false
      }

      if (!eventData) {
        return []
      } else if (eventData !== true) {
        eventColors = wrapInArray(eventData)
      } else if (typeof eventColor === 'string') {
        eventColors = [eventColor]
      } else if (typeof eventColor === 'function') {
        eventColors = wrapInArray(eventColor(date))
      } else if (Array.isArray(eventColor)) {
        eventColors = eventColor
      } else if (typeof eventColor === 'object' && eventColor !== null) {
        eventColors = wrapInArray(eventColor[date])
      }

      // Fallback to default color if no color is found
      if (!eventColors.length) {
        eventColors = ['surface-variant']
      }

      return eventColors.filter(Boolean)
    }

    function genEvents (date: string): JSX.Element | null {
      const eventColors = getEventColors(date)

      if (!eventColors.length) return null

      return (
        <div class="v-date-picker-month__events">
          { eventColors.map((color: string) => <VBadge dot color={ color } />) }
        </div>
      )
    }
    useRender(() => (
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

        <MaybeTransition name={ transition.value }>
          <div
            ref={ daysRef }
            key={ daysInMonth.value[0].date?.toString() }
            class="v-date-picker-month__days"
          >
            { !props.hideWeekdays && adapter.getWeekdays(props.firstDayOfWeek).map(weekDay => (
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
                  variant: item.isSelected ? 'flat' : item.isToday ? 'outlined' : 'text',
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
                    slots.day?.(slotProps) ?? (
                      <VBtn { ...slotProps.props }>
                        { item.localized }
                        { genEvents(item.isoDate) }
                      </VBtn>
                    )
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
