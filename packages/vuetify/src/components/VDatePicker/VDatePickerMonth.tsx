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
import { useVirtualFocus } from '@/composables/virtualFocus'

// Utilities
import { computed, nextTick, ref, shallowRef, toRef, useId, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

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
    const daysRef = ref<HTMLElement>()
    const uid = useId()
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

    const virtualFocus = useVirtualFocus(
      () => daysInMonth.value.map(item => ({
        id: item.isoDate,
        disabled: item.isDisabled,
        el: () => daysRef.value?.querySelector<HTMLElement>(`[data-v-date="${item.isoDate}"] button`),
      })),
      {
        control: daysRef,
        columns: () => props.weekdays.length,
      }
    )

    watch(daysInMonth, (val, oldVal) => {
      if (!oldVal || val[0].isoDate === oldVal[0].isoDate) return

      isReverse.value = adapter.isBefore(val[0].date, oldVal[0].date)
      virtualFocus.clear()
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

    function focusAfterTransition (isoDate: string) {
      nextTick(() => {
        virtualFocus.highlight(isoDate)
        if (virtualFocus.highlightedId.value == null) virtualFocus.first()
        virtualFocus.focusHighlighted()
      })
    }

    function focusGrid () {
      daysRef.value?.focus()
    }

    function onContainerKeydown (e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        // Target: first selected date, or today as fallback
        const rawTarget = model.value[0] ?? adapter.date()
        const targetIso = adapter.toISO(adapter.date(rawTarget))
        const inCurrentMonth = daysInMonth.value.find(d => d.isoDate === targetIso && !d.isAdjacent)

        if (inCurrentMonth) {
          virtualFocus.highlight(targetIso)
          if (virtualFocus.highlightedId.value == null) virtualFocus.first()
          virtualFocus.focusHighlighted()
        } else {
          // Target is in a different month — navigate there
          const targetDate = adapter.date(rawTarget)
          emit('update:month', adapter.getMonth(targetDate))
          emit('update:year', adapter.getYear(targetDate))
          focusAfterTransition(targetIso)
        }
        return
      }
      if ((e.key === 'Enter' || e.key === ' ') && virtualFocus.highlightedId.value != null) {
        e.preventDefault()
        const item = daysInMonth.value.find(d => d.isoDate === virtualFocus.highlightedId.value)
        if (item && !item.isDisabled) {
          const isoDate = item.isoDate
          onClick(item.date)
          if (item.isAdjacent) {
            focusAfterTransition(isoDate)
          }
        }
        return
      }

      // Intercept arrow keys to handle month-boundary crossing
      const curId = virtualFocus.highlightedId.value as string | undefined
      if (curId != null) {
        const cols = props.weekdays.length
        const rtl = getComputedStyle(e.currentTarget as HTMLElement).direction === 'rtl'

        // stride = array-index delta; calendarDays = actual date offset for boundary crossing
        let stride: number
        let calendarDays = 0

        if (e.key === 'ArrowLeft') {
          stride = rtl ? 1 : -1
          calendarDays = rtl ? 1 : -1
        } else if (e.key === 'ArrowRight') {
          stride = rtl ? -1 : 1
          calendarDays = rtl ? -1 : 1
        } else if (e.key === 'ArrowUp') {
          stride = -cols
          calendarDays = -7
        } else if (e.key === 'ArrowDown') {
          stride = cols
          calendarDays = 7
        } else {
          stride = 0
        }

        if (stride !== 0) {
          const all = daysInMonth.value
          const curIndex = all.findIndex(d => d.isoDate === curId)

          if (curIndex >= 0) {
            const targetItem = all[curIndex + stride]

            // isHidden = isAdjacent && !showAdjacentMonths — no button in DOM for this day
            if (!targetItem || targetItem.isHidden) {
              e.preventDefault()
              const targetIsoDate = targetItem
                ? targetItem.isoDate
                : adapter.toISO(adapter.addDays(adapter.date(curId), calendarDays))
              const targetDate = adapter.date(targetIsoDate)
              emit('update:month', adapter.getMonth(targetDate))
              emit('update:year', adapter.getYear(targetDate))
              focusAfterTransition(targetIsoDate)
              return
            }
          }
        }
      }

      virtualFocus.onKeydown(e)
      virtualFocus.focusHighlighted()
    }

    function onFocusin (e: FocusEvent) {
      const grid = daysRef.value
      if (!grid || grid.contains(e.relatedTarget as Node)) return

      grid.setAttribute('tabindex', '-1')

      const isVisible = (d: (typeof daysInMonth.value)[0]) => !d.isAdjacent && !d.isDisabled

      if (virtualFocus.highlightedId.value != null) {
        const cur = daysInMonth.value.find(d => d.isoDate === virtualFocus.highlightedId.value)
        if (cur && !cur.isAdjacent) {
          virtualFocus.highlight(cur.isoDate)
          virtualFocus.focusHighlighted()
          return
        }
      }

      const selected = daysInMonth.value.find(d =>
        isVisible(d) && model.value.some(m => adapter.isSameDay(m, d.date))
      )
      const target = selected ?? daysInMonth.value.find(isVisible)
      if (target) {
        virtualFocus.highlight(target.isoDate)
        virtualFocus.focusHighlighted()
      }
    }

    function onFocusout (e: FocusEvent) {
      if (!daysRef.value?.contains(e.relatedTarget as Node)) {
        daysRef.value?.setAttribute('tabindex', '0')
        virtualFocus.clear()
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
            tabindex="0"
            role="grid"
            onKeydown={ onContainerKeydown }
            onFocusin={ onFocusin }
            onFocusout={ onFocusout }
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
                  tabindex: -1,
                  variant: item.isSelected ? 'flat' : item.isToday ? 'outlined' : 'text',
                  'aria-label': getDateAriaLabel(item),
                  'aria-current': item.isToday ? 'date' : undefined,
                  id: `${uid}-day-${item.isoDate}`,
                  onMousedown: (e: MouseEvent) => e.preventDefault(),
                  onClick: () => {
                    const isoDate = item.isoDate
                    onClick(item.date)
                    if (item.isAdjacent) {
                      focusAfterTransition(isoDate)
                    } else {
                      virtualFocus.highlight(isoDate)
                      virtualFocus.focusHighlighted()
                    }
                  },
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
                  role="gridcell"
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

    return { focusGrid }
  },
})

export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>
