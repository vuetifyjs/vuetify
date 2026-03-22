// Styles
import './VDatePickerMonth.sass'

// Components
import { VBadge } from '@/components/VBadge'
import { VBtn } from '@/components/VBtn'

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { useBackgroundColor } from '@/composables/color'
import { useDate } from '@/composables/date/date'
import { useLocale } from '@/composables/locale'
import { useRangePicker } from '@/composables/rangePicker'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, ref, shallowRef, toRef, watch } from 'vue'
import { chunkArray, genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

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

    const isReverse = shallowRef(false)

    const transition = toRef(() => {
      return !isReverse.value ? props.transition : props.reverseTransition
    })

    function compareDays (a: unknown, b: unknown): number {
      if (adapter.isSameDay(a, b)) return 0
      return adapter.isBefore(a, b) ? -1 : 1
    }

    const range = useRangePicker({
      multiple: computed(() => {
        if (props.multiple === 'range') return 'range'
        return !!props.multiple
      }),
      model,
      compare: compareDays,
      normalizeEnd: (value: unknown) => adapter.endOfDay(value),
    })

    const selectionColor = toRef(() => props.color || 'surface-variant')
    const { backgroundColorClasses: rangeColorClasses, backgroundColorStyles: rangeColorStyles } = useBackgroundColor(selectionColor)

    const atMax = computed(() => {
      const max = ['number', 'string'].includes(typeof props.multiple) ? Number(props.multiple) : Infinity

      return model.value.length >= max
    })

    const dayRows = computed(() => {
      return chunkArray(daysInMonth.value, props.weekdays.length)
    })

    watch(daysInMonth, (val, oldVal) => {
      if (!oldVal) return

      isReverse.value = adapter.isBefore(val[0].date, oldVal[0].date)
    })

    function getDateAriaLabel (item: any) {
      const fullDate = adapter.format(item.date, 'fullDateWithWeekday')
      const localeKey = item.isToday ? 'currentDate' : 'selectDate'
      return t(`$vuetify.datePicker.ariaLabel.${localeKey}`, fullDate)
    }

    function onClick (value: unknown) {
      range.select(adapter.startOfDay(value))
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
            onMouseleave={ range.clearPreview }
          >
            { !props.hideWeekdays && (
              <div class="v-date-picker-month__days-row">
                { weekdayLabels.value.map(weekDay => (
                  <div
                    class={[
                      'v-date-picker-month__day',
                      'v-date-picker-month__weekday',
                    ]}
                  >{ weekDay }</div>
                ))}
              </div>
            )}

            { dayRows.value.map((row, rowIndex) => (
              <div class="v-date-picker-month__days-row">
                { row.map((item, colIndex) => {
                  const i = rowIndex * props.weekdays.length + colIndex
                  const isSelected = range.isSelected(item.date)
                  const rangeStart = range.isRangeStart(item.date)
                  const rangeEnd = range.isRangeEnd(item.date)
                  const rangeMiddle = range.isRangeMiddle(item.date)
                  const previewStart = range.isPreviewStart(item.date)
                  const previewEnd = range.isPreviewEnd(item.date)
                  const previewMiddle = range.isPreviewMiddle(item.date)
                  const previewed = range.isPreviewedRange(item.date)

                  if (atMax.value && !isSelected) {
                    item.isDisabled = true
                  }

                  const slotProps = {
                    props: {
                      class: 'v-date-picker-month__day-btn',
                      color: ((isSelected && !rangeMiddle) || item.isToday) ? props.color : undefined,
                      disabled: item.isDisabled,
                      readonly: props.readonly,
                      icon: true,
                      ripple: false,
                      variant: (isSelected && !rangeMiddle) ? 'flat' : item.isToday ? 'outlined' : 'text',
                      'aria-label': getDateAriaLabel(item),
                      'aria-current': item.isToday ? 'date' : undefined,
                      onClick: () => onClick(item.date),
                      onMouseenter: () => range.setPreview(item.date),
                      onFocus: () => range.setPreview(item.date),
                      onBlur: range.clearPreview,
                    },
                    item,
                    i,
                  } as const

                  const hasRangeBg = rangeStart || rangeEnd || rangeMiddle
                  const hasPreviewBg = previewStart || previewEnd || previewMiddle

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
                          'v-date-picker-month__day--range-start': rangeStart,
                          'v-date-picker-month__day--range-end': rangeEnd,
                          'v-date-picker-month__day--range-middle': rangeMiddle,
                          'v-date-picker-month__day--preview-start': previewStart,
                          'v-date-picker-month__day--preview-end': previewEnd,
                          'v-date-picker-month__day--preview-middle': previewMiddle,
                          'v-date-picker-month__day--previewed': previewed,
                        },
                      ]}
                      data-v-date={ !item.isDisabled ? item.isoDate : undefined }
                    >
                      { (hasRangeBg || hasPreviewBg) && (
                        <div
                          class={[
                            'v-date-picker-month__range-bg',
                            hasRangeBg ? 'v-date-picker-month__range-bg--range' : 'v-date-picker-month__range-bg--preview',
                            rangeColorClasses.value,
                          ]}
                          style={ rangeColorStyles.value }
                        />
                      )}
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
            ))}
          </div>
        </MaybeTransition>
      </div>
    ))
  },
})

export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>
