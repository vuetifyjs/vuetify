
// import './VCalendar.sass'
import './withEvents.sass'
import { useLocale } from '@/composables/locale'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { 
  makeBaseProps,
  makeCalendarProps,
  makeCategoryProps,
  makeEventsProps,
  makeIntervalProps,
  makeTimesProps,
  makeWeeksProps,
} from './composables/props'
import { useBaseCalendar } from './composables/base'
import { useWithEvents } from './composables/withEvents'

import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
// import { computed, toRef } from 'vue'
import { genericComponent, MakeSlots } from '@/util'

// Types1
import { Component, computed, onMounted, onUpdated, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { useTimes } from './composables/times'
import { CalendarCategory, CalendarFormatter, CalendarTimestamp, copyTimestamp, getEndOfMonth, getStartOfMonth, nextDay, parseTimestamp, relativeDays, updateFormatted, validateTimestamp } from '@/composables/calendar/timestamp'
import { getParsedCategories } from './composables/parser'
import { VCalendarWeekly } from './VCalendarWeekly'
import { VCalendarMonthly } from './VCalendarMonthly'
import { VCalendarDaily } from './VCalendarDaily'

// Types
interface VCalendarRenderProps {
  start: CalendarTimestamp
  end: CalendarTimestamp
  component: string | Component
  maxDays: number
  weekdays: number[]
  categories: CalendarCategory[]
}

export const VCalendar = genericComponent<new <T>() => {
  $props: {
  },
  $slots: MakeSlots<{}>
}>()({
  name: 'VCalendar',
  emits: ['change'],
  props: {
    ...makeBaseProps(),
    ...makeCalendarProps(),
    ...makeCategoryProps(),
    ...makeEventsProps(),
    ...makeIntervalProps(),
    ...makeThemeProps(),
    ...makeTimesProps(),
    ...makeWeeksProps(),
    modelValue: null
  },

  setup(props, { attrs, slots, emit }) {
    const { current } = useLocale()
    const { themeClasses } = provideTheme(props)
    const {
      times,
      parsedNow,
      setPresent,
      updateTimes,
    } = useTimes(props)

    const {
      parsedWeekdays,
      parsedStart,
      parsedEnd,
      getStartOfWeek,
      getEndOfWeek,
      getFormatter
    } = useBaseCalendar(props, current.value, null, times, null)

    const {
      noEvents,
      parsedEvents,
      parsedEventOverlapThreshold,
      eventTimedFunction,
      eventCategoryFunction,
      eventTextColorFunction,
      eventNameFunction,
      eventModeFunction,
      eventWeekdays: doEventWeekdays,
      categoryMode: doCategoryMode,
      eventColorFunction,
      parseEvent,
      formatTime,
      updateEventVisibility,
      getEventsMap,
      genEvent,
      genDayEvent,
      genTimedEvent,
      genName,
      genPlaceholder,
      genMore,
      getVisibleEvents,
      isEventForCategory,
      getEventsForDay,
      getEventsForDayAll,
      getEventsForDayTimed,
      getScopedSlots,
    } = useWithEvents(props, slots)

    
    const model = useProxiedModel(props, 'modelValue')
    
    const lastStart = ref({})
    const lastEnd = ref({})
    
    // computeds
    const parsedValue: ComputedRef<CalendarTimestamp> = computed(() => {
      return (validateTimestamp(model.value)
        ? parseTimestamp(model.value, true)
        : (parsedStart.value || times.today))
    })

    const parsedCategories: ComputedRef<CalendarCategory[]> = computed(() => {
      return getParsedCategories(props.categories, props.categoryText)
    })

    const parsedCategoryDays: ComputedRef<number> = computed(() => {
      return parseInt(props.categoryDays) || 1
    })
    
    
    const renderProps: ComputedRef<VCalendarRenderProps> = computed(() => {
      const around = parsedValue.value
      let component: any = null
      let maxDays = props.maxDays
      let weekdays = parsedWeekdays.value
      let categories = parsedCategories.value
      let start = around
      let end = around
      switch (props.type) {
        case 'month':
          component = VCalendarMonthly
          start = getStartOfMonth(around)
          end = getEndOfMonth(around)
          console.log(start, end)
          break
        case 'week':
          component = VCalendarDaily
          start = getStartOfWeek(around)
          end = getEndOfWeek(around)
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
          start = parsedStart.value || around
          end = parsedEnd.value
          break
        case 'custom-daily':
          component = VCalendarDaily
          start = parsedStart.value || around
          end = parsedEnd.value
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
          throw new Error(props.type + ' is not a valid Calendar type')
      }

      return { component, start, end, maxDays, weekdays, categories }
    })

    const categoryMode: ComputedRef<boolean> = computed(() => {
      return props.type === 'category'
    })

    const eventWeekdays: ComputedRef<number[]> = computed(() => {
      return renderProps.value.weekdays
    })

    const getCategoryList = (categories: CalendarCategory[]): CalendarCategory[] => {
      if (!noEvents.value) {
        const categoryMap: any = categories.reduce((map: any, category, index) => {
          if (typeof category === 'object' && category.categoryName) map[category.categoryName] = { index, count: 0 }
          else if (typeof category === 'string') map[category] = { index, count: 0 }
          return map
        }, {})

        if (!props.categoryHideDynamic || !props.categoryShowAll) {
          let categoryLength = categories.length

          parsedEvents.value.forEach(ev => {
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
    
    // TODO: Remove: Not used?
    const title: ComputedRef<string> = computed(() => {
      const { start, end } = renderProps.value
      const spanYears = start.year !== end.year
      const spanMonths = spanYears || start.month !== end.month

      if (spanYears) {
        return `${monthShortFormatter.value(start, true)} ${start.year} - ${monthShortFormatter.value(end, true)} ${end.year}`
      }

      if (spanMonths) {
        return `${monthShortFormatter.value(start, true)} - ${monthShortFormatter.value(end, true)} ${end.year}`
      } else {
        return `${monthLongFormatter.value(start, false)} ${start.year}`
      }
    })

    const monthLongFormatter: ComputedRef<CalendarFormatter> = computed(() => {
      return getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    })

    const monthShortFormatter: ComputedRef<CalendarFormatter> = computed(() => {
      return getFormatter({
        timeZone: 'UTC', month: 'short',
      })
    })

    // Methods
    onMounted (() => {
      updateTimes()
      setPresent()
      updateEventVisibility()
      getScopedSlots()
    })

    onUpdated (() => {
      window.requestAnimationFrame(updateEventVisibility)
    })

    const checkChange = () => {
      const { start, end } = renderProps.value
      console.log('checkChange', lastStart.value, lastEnd.value, start, end)
      if (!lastStart.value || !lastEnd.value ||
        start.date !== lastStart.value.date ||
        end.date !== lastEnd.value.date) {
        lastStart.value = start
        lastEnd.value = end
        emit('change', { start, end })
      }
    }

    watch(renderProps, checkChange)

    watch(parsedNow, () => {
      updateTimes()
    })

    return () => (
      <div
        class={[
          themeClasses.value
        ]}
      >
        <renderProps.value.component { ...{...renderProps.value, start: renderProps.value.start.date, end: renderProps.value.end.date} }
        >

        </renderProps.value.component>
      </div>
    )

  }

})

export type VCalendar = InstanceType<typeof VCalendar>