// Styles
import './VDatePickerMonth.sass'

// Components
import { VBadge } from '@/components/VBadge'
import { VBtn } from '@/components/VBtn'

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { useDate } from '@/composables/date/date'
import { useLocale } from '@/composables/locale'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, ref, shallowRef, toRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, renderSlot, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

export type DatePickerEventColorValue = boolean | string | string[]

export type DatePickerEventColors = DatePickerEventColorValue |
Record<string, DatePickerEventColorValue> | ((date: string) => DatePickerEventColorValue)

export type DatePickerEvents = string[] |
((date: string) => DatePickerEventColorValue) | Record<string, DatePickerEventColorValue>

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
  readonly: Boolean,
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

export const VDatePickerMonth = genericComponent<new <TModel>(
  props: {
    modelValue?: TModel
    'onUpdate:modelValue'?: (value: TModel) => void
  },
  slots: VDatePickerMonthSlots
) => GenericProps<typeof props, typeof slots>>()({
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
    const adapter = useDate()

    const rangeStart = shallowRef()
    const rangeStop = shallowRef()
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
      let eventColors: (boolean | string)[] = []

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
      return !eventColors.length
        ? ['surface-variant']
        : eventColors
          .filter(Boolean)
          .map((color: string | boolean) => typeof color === 'string' ? color : 'surface-variant')
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
                  readonly: props.readonly,
                  icon: true,
                  ripple: false,
                  variant: item.isSelected ? 'flat' : item.isToday ? 'outlined' : 'text',
                  'aria-label': getDateAriaLabel(item),
                  'aria-current': item.isToday ? 'date' : undefined,
                  onClick: () => onClick(item.date),
                },
                item,
                i,
              } as const

              const isSelected = props.multiple === 'range' && model.value.length === 2
                ? adapter.isWithinRange(item.date, model.value as [Date, Date])
                : model.value.some(selectedDate => adapter.isSameDay(selectedDate, item.date))

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
                    renderSlot(slots, 'day', slotProps, () => (
                      <VBtn { ...slotProps.props }>
                        { item.localized }
                        { genEvents(item.isoDate) }
                      </VBtn>
                    ))
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
