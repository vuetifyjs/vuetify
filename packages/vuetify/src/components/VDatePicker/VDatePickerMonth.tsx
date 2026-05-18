// Styles
import './VDatePickerMonth.sass'

// Components
import { VBadge } from '@/components/VBadge'
import { VBtn } from '@/components/VBtn'

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { useBackgroundColor } from '@/composables/color'
import { useDate } from '@/composables/date/date'
import { useGridSelection } from '@/composables/gridSelection'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRangePicker } from '@/composables/rangePicker'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, nextTick, shallowRef, toRef, useId, watch } from 'vue'
import { chunkArray, genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { CalendarWeekdays } from '@/composables/calendar'
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
  noAutoNavigation: Boolean,
  previewValue: null as any as PropType<unknown>,
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
    'update:previewValue': (_value: unknown) => true,
    'boundary-navigate': (_payload: { direction: 'up' | 'down' | 'left' | 'right', targetIsoDate: string }) => true,
  },

  setup (props, { emit, slots }) {
    const uid = useId()
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

    const previewValue = useProxiedModel(props, 'previewValue')

    const range = useRangePicker({
      multiple: computed(() => {
        if (props.multiple === 'range') return 'range'
        return !!props.multiple
      }),
      model,
      compare: compareDays,
      normalizeEnd: (value: unknown) => adapter.endOfDay(value),
      previewValue,
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

    function isSelectedDay (item: (typeof daysInMonth.value)[number]): boolean {
      return range.isSelected(item.date)
    }

    function isDayDisabled (item: (typeof daysInMonth.value)[number]): boolean {
      return item.isDisabled || item.isHidden || (atMax.value && !isSelectedDay(item))
    }

    function getDateAriaLabel (item: any) {
      const fullDate = adapter.format(item.date, 'fullDateWithWeekday')
      const localeKey = item.isToday ? 'currentDate' : 'selectDate'
      return t(`$vuetify.datePicker.ariaLabel.${localeKey}`, fullDate)
    }

    function onClick (value: unknown) {
      range.select(adapter.startOfDay(value))
    }

    function initialFocusDate (current: string | undefined): string | undefined {
      const isVisible = (d: (typeof daysInMonth.value)[number]) => !d.isAdjacent && !d.isDisabled

      // Preserve existing highlight if it's still pointing to a visible day in the current grid
      if (current != null) {
        const cur = daysInMonth.value.find(d => d.isoDate === current)
        if (cur && !cur.isAdjacent) return current
      }

      const selected = daysInMonth.value.find(d =>
        isVisible(d) && model.value.some(m => adapter.isSameDay(m, d.date))
      )
      return (selected ?? daysInMonth.value.find(isVisible))?.isoDate
    }

    const { containerProps, containerEl, selectItem, focusItem, clear } = useGridSelection<string>({
      items: () => daysInMonth.value.map(d => ({
        value: d.isoDate,
        isDisabled: isDayDisabled(d),
      })),
      columns: () => props.weekdays.length,
      initialValue: initialFocusDate,
      itemAttribute: 'data-v-date',
      onSelect: onDaySelect,
      onNavigation: onNavigationBoundary,
      onEscape,
    })

    function onDaySelect (isoDate: string) {
      const item = daysInMonth.value.find(d => d.isoDate === isoDate)
      if (!item || isDayDisabled(item)) return

      onClick(item.date)

      if (item.isAdjacent) {
        emit('update:month', adapter.getMonth(item.date))
        emit('update:year', adapter.getYear(item.date))
        nextTick(() => focusItem(isoDate))
      }
    }

    function onNavigationBoundary (direction: 'up' | 'down' | 'left' | 'right', e: KeyboardEvent, curId: string | undefined): boolean {
      if (curId == null) return false

      const cols = props.weekdays.length
      const rtl = getComputedStyle(e.currentTarget as HTMLElement).direction === 'rtl'

      // stride = array-index delta; calendarDays = actual date offset for boundary crossing
      let stride: number
      let calendarDays: number

      if (direction === 'left') {
        stride = rtl ? 1 : -1
        calendarDays = stride
      } else if (direction === 'right') {
        stride = rtl ? -1 : 1
        calendarDays = stride
      } else if (direction === 'up') {
        stride = -cols
        calendarDays = -7
      } else {
        stride = cols
        calendarDays = 7
      }

      const all = daysInMonth.value
      const curIndex = all.findIndex(d => d.isoDate === curId)
      if (curIndex < 0) return false

      const targetItem = all[curIndex + stride]

      // isHidden = isAdjacent && !showAdjacentMonths — no button in DOM for this day
      if (targetItem && !targetItem.isHidden) return false

      e.preventDefault()

      let targetIsoDate: string
      if (targetItem) {
        targetIsoDate = targetItem.isoDate
      } else {
        const step = calendarDays < 0 ? -1 : 1
        let candidate = adapter.addDays(adapter.date(curId), calendarDays)
        while (!props.weekdays.includes(adapter.toJsDate(candidate).getDay() as CalendarWeekdays)) {
          candidate = adapter.addDays(candidate, step)
        }
        targetIsoDate = adapter.toISO(candidate)
      }

      if (props.noAutoNavigation) {
        emit('boundary-navigate', { direction, targetIsoDate })

        return true
      }

      const targetDate = adapter.date(targetIsoDate)
      emit('update:month', adapter.getMonth(targetDate))
      emit('update:year', adapter.getYear(targetDate))
      nextTick(() => focusItem(targetIsoDate))
      return true
    }

    function onEscape () {
      const rawTarget = model.value[0] ?? adapter.date()
      const targetIso = adapter.toISO(adapter.date(rawTarget))
      const inCurrentMonth = daysInMonth.value.find(d => d.isoDate === targetIso && !d.isAdjacent)

      if (inCurrentMonth) {
        focusItem(targetIso)
        return
      }

      const targetDate = adapter.date(rawTarget)
      emit('update:month', adapter.getMonth(targetDate))
      emit('update:year', adapter.getYear(targetDate))
      nextTick(() => focusItem(targetIso))
    }

    function onDayClick (item: (typeof daysInMonth.value)[number]) {
      if (item.isAdjacent) {
        onDaySelect(item.isoDate)
      } else {
        selectItem(item.isoDate)
      }
    }

    function focusGrid () {
      containerEl.value?.focus()
    }

    watch(daysInMonth, (val, oldVal) => {
      if (!oldVal || val[0].isoDate === oldVal[0].isoDate) return // only clear when the month actually changes

      isReverse.value = adapter.isBefore(val[0].date, oldVal[0].date)
      clear()
    })

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
            key={ daysInMonth.value[0].date?.toString() }
            class="v-date-picker-month__days"
            role="grid"
            onMouseleave={ range.clearPreview }
            { ...containerProps.value }
          >
            { !props.hideWeekdays && (
              <div key="weekday-labels" class="v-date-picker-month__days-row">
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
              <div class="v-date-picker-month__days-row" role="row">
                { row.map((item, colIndex) => {
                  const i = rowIndex * props.weekdays.length + colIndex
                  const isSelected = isSelectedDay(item)
                  const disabled = isDayDisabled(item)
                  const rangeStart = range.isRangeStart(item.date)
                  const rangeEnd = range.isRangeEnd(item.date)
                  const rangeMiddle = range.isRangeMiddle(item.date)
                  const previewStart = range.isPreviewStart(item.date)
                  const previewEnd = range.isPreviewEnd(item.date)
                  const previewMiddle = range.isPreviewMiddle(item.date)

                  const slotProps = {
                    props: {
                      class: 'v-date-picker-month__day-btn',
                      color: ((isSelected && !rangeMiddle) || item.isToday) ? props.color : undefined,
                      disabled,
                      readonly: props.readonly,
                      icon: true,
                      ripple: false,
                      tabindex: -1,
                      variant: (isSelected && !rangeMiddle) ? 'flat' : item.isToday ? 'outlined' : 'text',
                      'aria-label': getDateAriaLabel(item),
                      'aria-current': item.isToday ? 'date' : undefined,
                      id: `${uid}-day-${item.isoDate}`,
                      'data-v-date': !disabled ? item.isoDate : undefined,
                      onMousedown: (e: MouseEvent) => e.preventDefault(), // preserve virtual focus
                      onClick: () => onDayClick(item),
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
                        },
                      ]}
                      role="gridcell"
                    >
                      { (hasRangeBg || hasPreviewBg) && (
                        <div
                          key="range-bg"
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

    return { focusGrid }
  },
})

export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>
