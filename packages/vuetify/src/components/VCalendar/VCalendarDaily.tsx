import { useLocale } from "@/composables/locale"
import { makeThemeProps, provideTheme } from "@/composables/theme"
import { makeVariantProps } from "@/composables/variant"
import { convertToUnit } from "@/util"
import { computed, ComputedRef, defineComponent, nextTick, onMounted, ref } from "vue"
import { VBtn } from "../VBtn"
import { makeBaseProps, makeEventsProps, makeIntervalProps, makeTimesProps, makeWeeksProps } from "./composables/props"
import { useBaseCalendar } from './composables/base'
import { useTimes } from "./composables/times"

import './VCalendarDaily.sass'
import { CalendarDayBodySlotScope, CalendarFormatter, CalendarTimestamp, copyTimestamp, createDayList, createIntervalList, createNativeLocaleFormatter, MINUTES_IN_DAY, parseTime, parseTimestamp, updateMinutes, VTime } from "@/composables/calendar/timestamp"

export const VCalendarDaily = defineComponent({
  name: 'VCalendarDaily',

  props: {
    ...makeBaseProps(),
    ...makeEventsProps(),
    ...makeIntervalProps(),
    ...makeThemeProps(),
    ...makeTimesProps(),
    ...makeVariantProps(),
    ...makeWeeksProps(),
  },
  
  setup(props, { slots }) {
    console.log(slots)
    const { themeClasses } = provideTheme(props)
    const { current } = useLocale()
    
    const {
      times,
    } = useTimes(props)

    const maxDays = 7
    const currentLocale = current.value

    const {
      dayFormatter,
      days: doDays,
      getEndOfWeek,
      getRelativeClasses,
      getStartOfWeek,
      parsedEnd,
      parsedStart,
      weekdayFormatter,
    } = useBaseCalendar(props, current.value, null, times, null)

      let scrollPush = 0

      const classes: ComputedRef<object> = computed(() => ({'v-calendar-daily': true, ...themeClasses}))

      const getScrollPush = (): number => {
        const scrollArea = ref(null) as unknown as HTMLElement
        const pane = ref(null) as unknown as HTMLElement

        return scrollArea && pane ? (scrollArea.offsetWidth - pane.offsetWidth) : 0
      }

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
    
      const firstMinute: ComputedRef<number> = computed(() => {
        const time = parsedFirstTime.value
    
        return time !== false && time >= 0 && time <= MINUTES_IN_DAY
          ? time
          : parsedFirstInterval.value * parsedIntervalMinutes.value
      })
    
      const bodyHeight: ComputedRef<number> = computed(() => {
        return parsedIntervalCount.value * parsedIntervalHeight.value
      })
    
      const days: ComputedRef<CalendarTimestamp[]> = computed(() => {
        const days = createDayList(
          parseTimestamp(props.start),
          parseTimestamp(props.end),
          times.today,
          [],
          maxDays
        )
        console.log(days)
        return days
      })
    
      const intervals: ComputedRef<CalendarTimestamp[][]> = computed(() => {
        const days: ComputedRef<CalendarTimestamp[]> = doDays
        const first: number = firstMinute.value
        const minutes: number = parsedIntervalMinutes.value
        const count: number = parsedIntervalCount.value
        const now: CalendarTimestamp = times.now
    
        return days.value.map(d => createIntervalList(d, first, minutes, count, now))
      })
    
      const intervalFormatter: ComputedRef<CalendarFormatter> = computed(() => {
        if (props.intervalFormat) {
          return props.intervalFormat as CalendarFormatter
        }
    
        const longOptions = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }
        const shortOptions = { timeZone: 'UTC', hour: 'numeric', minute: '2-digit' }
        const shortHourOptions = { timeZone: 'UTC', hour: 'numeric' }
    
        return createNativeLocaleFormatter(
          currentLocale,
          (tms, short) => short ? (tms.minute === 0 ? shortHourOptions : shortOptions) : longOptions
        )
      })
      //Methods
      const showIntervalLabelDefault = (interval: CalendarTimestamp): boolean => {
        const first: CalendarTimestamp = intervals.value[ 0 ][ 0 ]
        const isFirst: boolean = first.hour === interval.hour && first.minute === interval.minute
        return !isFirst
      }
    
      const intervalStyleDefault = (_interval: CalendarTimestamp): object | undefined => {
        return undefined
      }
    
      const getTimestampAtEvent = (e: MouseEvent | TouchEvent, day: CalendarTimestamp): CalendarTimestamp => {
        const timestamp: CalendarTimestamp = copyTimestamp(day)
        const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const baseMinutes: number = firstMinute.value
        const touchEvent: TouchEvent = e as TouchEvent
        const mouseEvent: MouseEvent = e as MouseEvent
        const touches: TouchList = touchEvent.changedTouches || touchEvent.touches
        const clientY: number = touches && touches[ 0 ] ? touches[ 0 ].clientY : mouseEvent.clientY
        const addIntervals: number = (clientY - bounds.top) / parsedIntervalHeight.value
        const addMinutes: number = Math.floor(addIntervals * parsedIntervalMinutes.value)
        const minutes: number = baseMinutes + addMinutes
    
        return updateMinutes(timestamp, minutes, times.now)
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
    
      const getSlotScope = (timestamp: CalendarTimestamp): CalendarDayBodySlotScope => {
        const scope = copyTimestamp(timestamp) as any
        scope.timeToY = timeToY
        scope.timeDelta = timeDelta
        scope.minutesToPixels = minutesToPixels
        scope.week = days
        return scope
      }
    
      const scrollToTime = (time: VTime): boolean => {
        const y = timeToY(time)
        const scrollArea = ref(null) as unknown as HTMLElement
    
        if (y === false || !scrollArea) {
          return false
        }
    
        scrollArea.scrollTop = y
    
        return true
      }

      const onResize = (): void => {
        scrollPush = getScrollPush()
      }

      const init = (): void => {
        nextTick(onResize)
      }

      onMounted(() => {
        init()
      })

      return(() => {
        return (
          <div
            class={classes.value}
            // TODO: On dragstart
            // TODO: directives
          >
            { !props.hideHeader ? 
             <div class="v-calendar-daily__head" style={`margin-right: ${scrollPush}`}>
               <div class="v-calendar-daily__intervals-head" style={`width: ${convertToUnit(props.intervalWidth)}`}>
                 <slot name="interval-header"></slot>
                </div>
                { days.value.map((day, index) => {
                  return <div
                    class={['v-calendar-daily__head-day', getRelativeClasses(day)]}
                    key={day.date}
                    // TODO: on
                  >
                    <div class="v-calendar-daily__head-weekday" style={`color: ${day.present ? props.color : 'transparent'}`}>
                      { weekdayFormatter.value(day, props.shortWeekdays) }
                    </div>
                    <div class="v-calendar-daily__head-day-label">
                      <slot name="day-label-header" day={day}>
                        <VBtn
                          color={day.present ? props.color : 'transparent'}
                          icon={true}
                          flat={true}
                          // TODO: On
                        >
                          { dayFormatter.value(day, false) }
                        </VBtn>
                      </slot>
                    </div>
                    <div>
                      <slot name="day-header" { ...{ week: days.value, ...day, index } }></slot>
                    </div>
                  </div>
                })}
             </div>
             : ''}
            <div class="v-calendar-daily__body">
              <div ref="scollArea" class="v-calendar-daily__scroll-area">
                <div ref="pane" class="v-calendar-daily__pane" style={`height: ${bodyHeight.value}`}>
                  <div class="v-calendar-daily__day-container">
                    <div
                      class="v-calendar-daily__intervals-body"
                      style={`width: ${convertToUnit(props.intervalWidth)}`}
                      // TODO: On
                    >
                      { !intervals.value.length ? '' : intervals.value[0].map(interval => {
                        return <div
                            class="v-calendar-daily__interval"
                            key = { interval.time }
                            style = {`height: ${ convertToUnit(props.intervalHeight) }`}
                          >
                          <div class="v-calendar-daily__interval-text">
                            { (props.showIntervalLabel || showIntervalLabelDefault)(interval) ? intervalFormatter.value(interval, props.shortIntervals) : ''}
                          </div>
                        </div>
                      })}
                      { days.value.map((day, index) => {
                        return <div
                                key={day.date}
                                class={['v-calendar-daily__day', getRelativeClasses(day)]}
                                // TODO: On
                        >
                          { intervals.value[index].map(interval => {
                            return <div
                                    key={interval.time}
                                    class={'v-calendar-daily__day-interval'}
                                    style={
                                      `height: ${convertToUnit(props.intervalHeight)}`
                                      // TODO: Interval Styles
                                    }
                            >
                              { slots.interval?.(interval) }
                            </div>
                          })}
                          { slots['day-body']?.(day)}
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
})
