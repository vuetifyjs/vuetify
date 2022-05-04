import { useLocale } from "@/composables/locale"
import { makeThemeProps, provideTheme } from "@/composables/theme"
import { makeVariantProps } from "@/composables/variant"
import { convertToUnit } from "@/util"
import { computed, ComputedRef, defineComponent, nextTick, onMounted, ref } from "vue"
import { VBtn } from "../VBtn"
import { makeBaseProps, makeIntervalProps, makeTimesProps, makeWeeksProps } from "./composables/props"
import { useBaseCalendar } from './composables/base'
import { useTimes } from "./composables/times"
import { useWithIntervals } from "./composables/withIntervals"

import './VCalendarDaily.sass'

export const VCalendarDaily = defineComponent({
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
    } = useTimes(props)

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

    const {
      bodyHeight,
      days,
      intervals,
      intervalFormatter,
      showIntervalLabelDefault
    } = useWithIntervals(
      props,
      current.value,
      doDays.value,
      7,
      times )

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
                              <slot name="interval" {...interval}></slot>
                            </div>
                          })}
                          <slot name="day-body" {...day}></slot>
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
