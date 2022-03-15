import { useLocale } from "@/composables/locale"
import { makeThemeProps, provideTheme } from "@/composables/theme"
import { makeVariantProps } from "@/composables/variant"
import { convertToUnit, genericComponent, MakeSlots } from "@/util"
import { computed, ComputedRef, nextTick, onMounted, ref } from "vue"
import { VBtn } from "../VBtn"
import { makeBaseProps, makeWeeksProps, makeIntervalProps } from "./composables/props"
import { useBaseCalendar } from './composables/base'
import { makeTimesProps, useTimes } from "./composables/times"
import { useWithIntervals } from "./composables/withIntervals"

export const VCalendarDaily = genericComponent<new <T>() => {
  $props: {}
  $slots: MakeSlots<{}>
}>()({
  name: 'VCalendarDaily',

  props: {
    ...makeTimesProps(),
    ...makeBaseProps(),
    ...makeWeeksProps(),
    ...makeIntervalProps(),
    ...makeThemeProps(),
    ...makeVariantProps(),
  },
  
  setup(props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { current } = useLocale()
    
    const {
      times,
      parsedNow,
      setPresent,
      getNow,
      updateDay,
      updateTime,
      updateTimes,
    } = useTimes(props.now)

    const {
      parsedWeekdays,
      weekdaySkips,
      weekdaySkipsReverse,
      parsedStart,
      parsedEnd,
      days: doDays,
      dayFormatter,
      weekdayFormatter,
      getRelativeClasses,
      getStartOfWeek,
      getEndOfWeek,
      getFormatter
    } = useBaseCalendar(current.value, null, props.end, props.start, times, null, [0,1,2,3,4,5,6])

    const {
      parsedFirstInterval,
      parsedIntervalMinutes,
      parsedIntervalCount,
      parsedIntervalHeight,
      parsedFirstTime,
      firstMinute,
      bodyHeight,
      days,
      intervals,
      intervalFormatter,
      showIntervalLabelDefault,
      intervalStyleDefault,
      getTimestampAtEvent,
      getSlotScope,
      scrollToTime,
      minutesToPixels,
      timeToY,
      timeDelta,
    } = useWithIntervals(
      current.value,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      props.start,
      props.end,
      times,
      [0,1,2,3,4,5,6] )

      let scrollPush = 0

      const classes: ComputedRef<object> = computed(() => ({'v-calendar-daily': true, ...themeClasses}))

      const getScrollPush = (): number => {
        const scrollArea = ref(null) as unknown as HTMLElement
        const pane = ref(null) as unknown as HTMLElement

        return scrollArea && pane ? (scrollArea.offsetWidth - pane.offsetWidth) : 0
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
                      <slot name="day-header" v-bind={{week: days.value, ...day, index}}></slot>
                    </div>
                  </div>
                })}
             </div>
             : ''}
            <div class="v-calendar-daily__body">
              <div ref="scollArea" class="v-calendar-daily__scroll-area">
                <div ref="pane" class="v-calendar-daily__pane" style={`height: ${bodyHeight}`}>
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
                                          <slot name="interval" v-bind={{...interval}}></slot>
                                        </div>
                                })}
                                <slot name="day-body" v-bind={{...day}}></slot>
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
