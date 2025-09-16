// Styles
import './VCalendarCategory.sass'
import './VCalendarDaily.sass'
import './VCalendarWeekly.sass'

// Components
import { VCalendarCategory } from './VCalendarCategory'
import { VCalendarDaily } from './VCalendarDaily'
import { VCalendarWeekly } from './VCalendarWeekly'

// Composables
import { makeCalendarBaseProps } from './composables/calendarBase'
import { makeCalendarWithEventsProps, useCalendarWithEvents } from './composables/calendarWithEvents'
import { forwardRefs } from '@/composables/forwardRefs'

// Utilities
import { computed, onMounted, onUpdated, ref, watch } from 'vue'
import { getParsedCategories } from './util/parser'
import {
  copyTimestamp,
  DAY_MIN,
  DAYS_IN_MONTH_MAX,
  DAYS_IN_WEEK,
  getEndOfMonth,
  getStartOfMonth,
  nextDay,
  parseTimestamp,
  prevDay,
  relativeDays,
  timestampToDate,
  updateFormatted,
  updateRelative,
  updateWeekday,
  validateTimestamp,
} from './util/timestamp'
import { genericComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type {
  CalendarCategory, CalendarCategoryTextFunction,
  CalendarDayBodySlotScope,
  CalendarDaySlotScope, CalendarEvent, CalendarEventParsed,
  CalendarTimestamp,
} from './types'
import type { EventProp, GenericProps, JSXComponent } from '@/util'

// Types
interface VCalendarRenderProps {
  start: CalendarTimestamp
  end: CalendarTimestamp
  component: JSXComponent & { filterProps: <T>(props: T) => Partial<T> }
  maxDays: number
  weekdays: number[]
  categories: CalendarCategory[]
}

interface EventSlotScope {
  event: CalendarEvent
  outside: boolean
  singline: boolean
  overlapsNoon: boolean
  formatTime: (withTime: CalendarTimestamp, ampm: boolean) => string
  timeSummary: () => string
  eventSummary: () => JSX.Element
  eventParsed: CalendarEventParsed
  day: CalendarDaySlotScope
  start: boolean
  end: boolean
  timed: boolean
}

interface DaySlotScope extends CalendarTimestamp {
  outside: boolean
  index: number
  week: CalendarTimestamp[]
}

interface DayHeaderSlotScope extends CalendarTimestamp {
  index: number
  week: CalendarTimestamp[]
}

interface CalendarDayCategorySlotScope extends CalendarDayBodySlotScope {
  category: CalendarCategory
}

export const VCalendar = genericComponent<new (
  props: {
    [key: `on${Capitalize<string>}:date`]: EventProp<[Event, CalendarTimestamp]>
    [key: `on${Capitalize<string>}:dayCategory`]: EventProp<[Event, CalendarDayCategorySlotScope]>
    [key: `on${Capitalize<string>}:day`]: EventProp<[Event, CalendarDayBodySlotScope]>
    [key: `on${Capitalize<string>}:event`]: EventProp<[Event, EventSlotScope]>
    [key: `on${Capitalize<string>}:interval`]: EventProp<[Event, CalendarTimestamp]>
    [key: `on${Capitalize<string>}:more`]: EventProp<[Event, CalendarDaySlotScope]>
    [key: `on${Capitalize<string>}:timeCategory`]: EventProp<[Event, CalendarDayCategorySlotScope]>
    [key: `on${Capitalize<string>}:time`]: EventProp<[Event, CalendarDayBodySlotScope]>
  },
  slots: {
    'category': CalendarDayCategorySlotScope
    'day': DaySlotScope
    'day-body': CalendarDayBodySlotScope
    'day-header': DayHeaderSlotScope
    'day-label': CalendarTimestamp
    'day-label-header': CalendarTimestamp
    'day-month': CalendarTimestamp
    'event': EventSlotScope
    'interval': CalendarDayCategorySlotScope
    'interval-header': never
  },
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VCalendar',

  props: {
    modelValue: {
      type: [String, Number, Date] as PropType<string | number | Date>,
      validate: validateTimestamp,
    },
    categoryDays: {
      type: [Number, String],
      default: 1,
      validate: (x: any) => isFinite(parseInt(x)) && parseInt(x) > 0,
    },
    categories: {
      type: [Array, String] as PropType<CalendarCategory[] | string>,
      default: '',
    },
    categoryText: {
      type: [String, Function] as PropType<string | CalendarCategoryTextFunction>,
    },
    maxDays: {
      type: Number,
      default: 7,
    },
    categoryHideDynamic: {
      type: Boolean,
    },
    categoryShowAll: {
      type: Boolean,
    },
    categoryForInvalid: {
      type: String,
      default: '',
    },

    ...makeCalendarBaseProps(),
    ...makeCalendarWithEventsProps(),
  },

  setup (props, { slots, attrs, emit }) {
    const root = ref<VCalendarWeekly | VCalendarDaily | VCalendarCategory>()
    const base = useCalendarWithEvents(props, slots, attrs)

    const lastStart = ref<CalendarTimestamp | null>(null)
    const lastEnd = ref<CalendarTimestamp | null>(null)

    const parsedValue = computed((): CalendarTimestamp => {
      return (validateTimestamp(props.modelValue)
        ? parseTimestamp(props.modelValue, true)
        : (base.parsedStart.value || base.times.today))
    })

    const parsedCategoryDays = computed((): number => {
      return parseInt(String(props.categoryDays)) || 1
    })

    const parsedCategories = computed((): CalendarCategory[] => {
      return getParsedCategories(props.categories, props.categoryText)
    })

    const renderProps = computed((): VCalendarRenderProps => {
      const around = parsedValue.value
      let component: any = null
      let maxDays = props.maxDays
      let weekdays = base.parsedWeekdays.value
      let categories = parsedCategories.value
      let start = around
      let end = around

      switch (props.type) {
        case 'month':
          component = VCalendarWeekly
          start = getStartOfMonth(around)
          end = getEndOfMonth(around)
          break
        case 'week':
          component = VCalendarDaily
          start = base.getStartOfWeek(around)
          end = base.getEndOfWeek(around)
          maxDays = 7
          break
        case 'day':
          component = VCalendarDaily
          maxDays = 1
          weekdays = [start.weekday]
          break
        case '4day':
          component = VCalendarDaily
          end = relativeDays(copyTimestamp(end), nextDay, 3)
          updateFormatted(end)
          maxDays = 4
          weekdays = [
            start.weekday,
            (start.weekday + 1) % 7,
            (start.weekday + 2) % 7,
            (start.weekday + 3) % 7,
          ]
          break
        case 'custom-weekly':
          component = VCalendarWeekly
          start = base.parsedStart.value || around
          end = base.parsedEnd.value
          break
        case 'custom-daily':
          component = VCalendarDaily
          start = base.parsedStart.value || around
          end = base.parsedEnd.value
          break
        case 'category':
          const days = parsedCategoryDays.value

          component = VCalendarCategory
          end = relativeDays(copyTimestamp(end), nextDay, days)
          updateFormatted(end)
          maxDays = days
          weekdays = []

          for (let i = 0; i < days; i++) {
            weekdays.push((start.weekday + i) % 7)
          }

          categories = getCategoryList(categories)
          break
        default:
          const type = props.type satisfies never
          throw new Error(`${type} is not a valid Calendar type`)
      }

      return { component, start, end, maxDays, weekdays, categories }
    })

    const eventWeekdays = computed((): number[] => {
      return renderProps.value.weekdays
    })

    const categoryMode = computed((): boolean => {
      return props.type === 'category'
    })

    const monthLongFormatter = computed(() => {
      return base.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    })

    const monthShortFormatter = computed(() => {
      return base.getFormatter({
        timeZone: 'UTC', month: 'short',
      })
    })

    const title = computed((): string => {
      const { start, end } = renderProps.value
      const spanYears = start.year !== end.year
      const spanMonths = spanYears || start.month !== end.month

      if (spanYears) {
        return monthShortFormatter.value(start, true) + ' ' + start.year + ' - ' + monthShortFormatter.value(end, true) + ' ' + end.year
      }

      if (spanMonths) {
        return monthShortFormatter.value(start, true) + ' - ' + monthShortFormatter.value(end, true) + ' ' + end.year
      } else {
        return monthLongFormatter.value(start, false) + ' ' + start.year
      }
    })

    function checkChange (): void {
      const { start, end } = renderProps.value
      if (!lastStart.value || !lastEnd.value ||
        start.date !== lastStart.value.date ||
        end.date !== lastEnd.value.date) {
        lastStart.value = start
        lastEnd.value = end
        emit('change', { start, end })
      }
    }

    function move (amount = 1): void {
      const moved = copyTimestamp(parsedValue.value)
      const forward = amount > 0
      const mover = forward ? nextDay : prevDay
      const limit = forward ? DAYS_IN_MONTH_MAX : DAY_MIN
      let times = forward ? amount : -amount

      while (--times >= 0) {
        switch (props.type) {
          case 'month':
            moved.day = limit
            mover(moved)
            break
          case 'week':
            relativeDays(moved, mover, DAYS_IN_WEEK)
            break
          case 'day':
            relativeDays(moved, mover, 1)
            break
          case '4day':
            relativeDays(moved, mover, 4)
            break
          case 'category':
            relativeDays(moved, mover, parsedCategoryDays.value)
            break
        }
      }

      updateWeekday(moved)
      updateFormatted(moved)
      updateRelative(moved, base.times.now)

      if (props.modelValue instanceof Date) {
        emit('update:modelValue', timestampToDate(moved))
      } else if (typeof props.modelValue === 'number') {
        emit('update:modelValue', timestampToDate(moved).getTime())
      } else {
        emit('update:modelValue', moved.date)
      }

      emit('moved', moved)
    }

    function next (amount = 1): void {
      move(amount)
    }

    function prev (amount = 1): void {
      move(-amount)
    }

    function getCategoryList (categories: CalendarCategory[]): CalendarCategory[] {
      if (!base.noEvents.value) {
        const categoryMap: any = categories.reduce((map: any, category, index) => {
          if (typeof category === 'object' && category.categoryName) map[category.categoryName] = { index, count: 0 }
          else if (typeof category === 'string') map[category] = { index, count: 0 }
          return map
        }, {})

        if (!props.categoryHideDynamic || !props.categoryShowAll) {
          let categoryLength = categories.length

          base.parsedEvents.value.forEach(ev => {
            let category = ev.category

            if (typeof category !== 'string') {
              category = props.categoryForInvalid
            }

            if (!category) {
              return
            }

            if (category in categoryMap) {
              categoryMap[category].count++
            } else if (!props.categoryHideDynamic) {
              categoryMap[category] = {
                index: categoryLength++,
                count: 1,
              }
            }
          })
        }

        if (!props.categoryShowAll) {
          for (const category in categoryMap) {
            if (categoryMap[category].count === 0) {
              delete categoryMap[category]
            }
          }
        }

        categories = categories.filter((category: CalendarCategory) => {
          if (typeof category === 'object' && category.categoryName) {
            return categoryMap.hasOwnProperty(category.categoryName)
          } else if (typeof category === 'string') {
            return categoryMap.hasOwnProperty(category)
          }
          return false
        })
      }
      return categories
    }

    watch(renderProps, checkChange)

    onMounted(() => {
      base.updateEventVisibility()
      checkChange()
    })

    onUpdated(() => {
      window.requestAnimationFrame(base.updateEventVisibility)
    })

    useRender(() => {
      const { start, end, maxDays, component: Component, weekdays, categories } = renderProps.value
      return (
        <Component
          ref={ root }
          class={['v-calendar', { 'v-calendar-events': !base.noEvents.value }]}
          v-resize_quiet={ base.updateEventVisibility }
          role="grid"
          { ...Component.filterProps(props) }
          start={ start.date }
          end={ end.date }
          maxDays={ maxDays }
          weekdays={ weekdays }
          categories={ categories }
          onClick:date={ (e: MouseEvent, day: CalendarTimestamp) => {
            if (attrs['onUpdate:modelValue']) emit('update:modelValue', day.date)
            if (attrs['onClick:date']) emit('click:date', e, day)
          }}
          v-slots={ base.getScopedSlots() }
        />
      )
    })

    return forwardRefs({
      ...base,
      lastStart,
      lastEnd,
      parsedValue,
      parsedCategoryDays,
      renderProps,
      eventWeekdays,
      categoryMode,
      title,
      monthLongFormatter,
      monthShortFormatter,
      parsedCategories,
      checkChange,
      move,
      next,
      prev,
      getCategoryList,
    }, root)
  },
})

export type VCalendar = InstanceType<typeof VCalendar>
