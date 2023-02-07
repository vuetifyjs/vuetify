// Styles
import './VCalendarCategory.sass'

// Types
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { defineComponent } from '@/util'

// Util
import { convertToUnit } from '../../util/helpers'
import type {
  CalendarCategory,
  CalendarDayBodySlotScope,
  CalendarTimestamp,
  VTime,
} from '@/composables/calendar/timestamp'
import {
  copyTimestamp,
  createDayList,
  MINUTES_IN_DAY,
  parseTime,
  parseTimestamp,
} from '@/composables/calendar/timestamp'
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
import { useTimes } from './composables/times'
import { getParsedCategories } from './composables/parser'
import { useLocale } from '@/composables/locale'
import { makeVariantProps } from '@/composables/variant'
import { VCalendarDaily } from './VCalendarDaily'

export const VCalendarCategory = defineComponent({
  name: 'VCalendarCategory',

  props: {
    ...makeBaseProps(),
    ...makeCalendarProps(),
    ...makeCategoryProps(),
    ...makeEventsProps(),
    ...makeIntervalProps(),
    ...makeTimesProps(),
    ...makeVariantProps(),
    ...makeWeeksProps(),
  },

  setup (props, { slots }) {
    const { current } = useLocale()

    const {
      times,
    } = useTimes(props)

    const {
      getRelativeClasses,
    } = useBaseCalendar(props, current.value, null, times, null)

    const parsedCategories: ComputedRef<CalendarCategory[]> = computed(() => getParsedCategories(props.categories, props.categoryText))

    const getCategoryScope = (scope: any, category: CalendarCategory) => {
      const cat = typeof category === 'object' && category &&
          category.categoryName === props.categoryForInvalid ? null : category
      return {
        ...scope,
        category: cat,
      }
    }

    const intervalStyleDefault = (_interval: CalendarTimestamp): object | undefined => {
      return undefined
    }

    const timeDelta = (time: VTime): number | false => {
      const minutes = parseTime(time)

      if (minutes === false) {
        return false
      }

      const min: number = firstMinute.value
      const gap: number = parsedIntervalCount.value * parsedIntervalMinutes.value

      return (minutes - min) / gap
    }

    const timeToY = (time: VTime, clamp = true): number | false => {
      let y = timeDelta(time)

      if (y !== false) {
        y *= bodyHeight.value

        if (clamp) {
          if (y < 0) {
            y = 0
          }
          if (y > bodyHeight.value) {
            y = bodyHeight.value
          }
        }
      }

      return y
    }

    const minutesToPixels = (minutes: number): number => {
      return minutes / parsedIntervalMinutes.value * parsedIntervalHeight.value
    }

    const firstMinute: ComputedRef<number> = computed(() => {
      const time = parsedFirstTime.value

      return time !== false && time >= 0 && time <= MINUTES_IN_DAY
        ? time
        : parsedFirstInterval.value * parsedIntervalMinutes.value
    })

    const bodyHeight: ComputedRef<number> = computed(() => {
      return parsedIntervalCount.value * parsedIntervalHeight.value
    })

    // Intervals
    // Computeds
    const parsedFirstInterval: ComputedRef<number> = computed(() => {
      return parseInt(props.firstInterval)
    })

    const parsedIntervalMinutes: ComputedRef<number> = computed(() => {
      return parseInt(props.intervalMinutes)
    })

    const parsedIntervalCount: ComputedRef<number> = computed(() => {
      return parseInt(props.intervalCount)
    })

    const parsedIntervalHeight: ComputedRef<number> = computed(() => {
      return parseFloat(props.intervalHeight)
    })

    const parsedFirstTime: ComputedRef<number | false> = computed(() => {
      return parseTime(props.firstTime)
    })

    const maxDays = 7
    const dailyDays: ComputedRef<CalendarTimestamp[]> = computed(() => {
      return createDayList(
        parseTimestamp(props.start),
        parseTimestamp(props.end),
        times.today,
        [],
        maxDays
      )
    })

    const days = computed((): any[] => {
      const days: any = []
      dailyDays.value.forEach((d, j) => {
        const day = new Array(parsedCategories.value.length || 1)
        day.fill(d)
        days.push(day)
      })
      return days
    })
    console.log(days.value)

    const getSlotScope = (timestamp: CalendarTimestamp): CalendarDayBodySlotScope => {
      const scope = copyTimestamp(timestamp) as any
      scope.timeToY = timeToY
      scope.timeDelta = timeDelta
      scope.minutesToPixels = minutesToPixels
      scope.week = days
      return scope
    }

    return () =>
      (
        <VCalendarDaily { ...props }>
          {
            {
              'day-category-header': () =>
                (
                  <div class="v-calendar-category__columns">
                    { parsedCategories.value.map(category => {
                      return (
                        <div class="v-calendar-category__column-header">
                          { slots.category?.(category) || (
                            <div class="v-calendar-category__category">
                              { typeof category === 'object'
                                ? props.categoryName
                                : category === null
                                  ? props.categoryForInvalid
                                  : typeof category === 'object'
                                    ? category.categoryName
                                    : category
                              }
                            </div>
                          )}
                          { slots['day-header']?.(category) }
                        </div>
                      )
                    }) }
                  </div>
                ),
              'category-columns': ({ intervals }) =>
                days.value.forEach((day, index) =>
                  (
                    <div
                      key={day.date}
                      class={['v-calendar-daily__day', getRelativeClasses(day)]}
                    >
                      { intervals[index].map(interval =>
                        (
                          <div
                            key={interval.time}
                            class="v-calendar-daily__day-interval"
                            style={{
                              height: convertToUnit(props.intervalHeight),
                              ...(props.intervalStyle || intervalStyleDefault),
                            }}
                          >
                            { slots.interval?.(getCategoryScope(getSlotScope(interval), day.category))}
                          </div>
                        )
                      )}
                      <div class="v-calendar-category__columns">
                        <div class="v-calendar-category__column" >
                          { slots['day-body']?.(getCategoryScope(getSlotScope(day), day.category))}
                        </div>
                      </div>
                    </div>
                  )
                ),
            }
          }
        </VCalendarDaily>
      )
  },
})

export type VCalendarCategory = InstanceType<typeof VCalendarCategory>
