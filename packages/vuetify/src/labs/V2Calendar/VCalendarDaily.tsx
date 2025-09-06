// Styles
import './VCalendarDaily.sass'

// Components
import { VIconBtn } from '@/labs/VIconBtn'

// Composables
import { makeCalendarBaseProps } from './composables/calendarBase'
import { makeCalendarWithIntervalsProps, useCalendarWithIntervals } from './composables/calendarWithIntervals'

// Directives
import vResize from '@/directives/resize'

// Utilities
import { nextTick, onMounted, ref } from 'vue'
import { convertToUnit, defineComponent, getPrefixedEventHandlers, useRender } from '@/util'

// Types
import type { CalendarTimestamp } from './types'

export const VCalendarDaily = defineComponent({
  name: 'VCalendarDaily',

  directives: { vResize },

  props: {
    color: String,
    shortWeekdays: {
      type: Boolean,
      default: true,
    },
    shortIntervals: {
      type: Boolean,
      default: true,
    },
    hideHeader: Boolean,

    ...makeCalendarBaseProps(),
    ...makeCalendarWithIntervalsProps(),
  },

  setup (props, { slots, attrs }) {
    const scrollPush = ref(0)
    const scrollArea = ref<HTMLElement>()
    const pane = ref<HTMLElement>()

    const base = useCalendarWithIntervals(props)

    function init () {
      nextTick(onResize)
    }

    function onResize () {
      scrollPush.value = getScrollPush()
    }

    function getScrollPush (): number {
      return scrollArea.value && pane.value
        ? (scrollArea.value.offsetWidth - pane.value.offsetWidth)
        : 0
    }

    function genHead () {
      return (
        <div
          class="v-calendar-daily__head"
          style={{ marginRight: scrollPush.value + 'px' }}
        >
          { genHeadIntervals() }
          { genHeadDays() }
        </div>
      )
    }

    function genHeadIntervals () {
      const width: string | undefined = convertToUnit(props.intervalWidth)
      return (
        <div
          class="v-calendar-daily__intervals-head"
          style={{ width }}
        >
          { slots['interval-header']?.() }
        </div>
      )
    }

    function genHeadDays () {
      return base.days.value.map(genHeadDay)
    }

    function genHeadDay (day: CalendarTimestamp, index: number) {
      const events = getPrefixedEventHandlers(attrs, ':day', nativeEvent => ({
        nativeEvent, ...base.getSlotScope(day),
      }))
      return (
        <div
          key={ day.date }
          class={['v-calendar-daily_head-day', base.getRelativeClasses(day)]}
          { ...events }
        >
          { genHeadWeekday(day) }
          { genHeadDayLabel(day) }
          { genDayHeader(day, index) }
        </div>
      )
    }

    function genDayHeader (day: CalendarTimestamp, index: number) {
      return slots['day-header']?.({
        week: base.days.value,
        ...day,
        index,
      }) ?? []
    }

    function genHeadWeekday (day: CalendarTimestamp) {
      const color = day.present ? props.color : undefined
      return (
        <div
          { ...base.getColorProps({ text: color }) }
          class="v-calendar-daily_head-weekday"
        >
          { base.weekdayFormatter.value(day, props.shortWeekdays) }
        </div>
      )
    }

    function genHeadDayLabel (day: CalendarTimestamp) {
      return (
        <div class="v-calendar-daily_head-day-label">
          { slots['day-label-header']?.(day) ?? genHeadDayButton(day) }
        </div>
      )
    }

    function genHeadDayButton (day: CalendarTimestamp) {
      const color = day.present ? props.color : 'transparent'
      const events = getPrefixedEventHandlers(attrs, ':date', nativeEvent => ({
        nativeEvent, ...day,
      }))
      return (
        <VIconBtn
          color={ color }
          { ...events }
        >
          { base.dayFormatter.value(day, false) }
        </VIconBtn>
      )
    }

    function genBody () {
      return (
        <div class="v-calendar-daily__body">
          { genScrollArea() }
        </div>
      )
    }

    function genScrollArea () {
      return (
        <div ref={ scrollArea } class="v-calendar-daily__scroll-area">
          { genPane() }
        </div>
      )
    }

    function genPane () {
      return (
        <div
          ref={ pane }
          class="v-calendar-daily__pane"
          style={{ height: convertToUnit(base.bodyHeight.value) }}
        >
          { genDayContainer() }
        </div>
      )
    }

    function genDayContainer () {
      return (
        <div class="v-calendar-daily__day-container">
          { genBodyIntervals() }
          { slots.days?.() ?? genDays() }
        </div>
      )
    }

    function genDays () {
      return base.days.value.map((day, index) => {
        const events = getPrefixedEventHandlers(attrs, ':time', nativeEvent => ({
          nativeEvent,
          ...base.getSlotScope(base.getTimestampAtEvent(nativeEvent, day)),
        }))
        return (
          <div
            key={ day.date }
            class={['v-calendar-daily__day', base.getRelativeClasses(day)]}
            { ...events }
          >
            { genDayIntervals(index) }
            { genDayBody(day) }
          </div>
        )
      })
    }

    function genDayBody (day: CalendarTimestamp) {
      return slots['day-body']?.(base.getSlotScope(day)) ?? []
    }

    function genDayIntervals (index: number) {
      return base.intervals.value[index].map(genDayInterval)
    }

    function genDayInterval (interval: CalendarTimestamp) {
      const height: string | undefined = convertToUnit(props.intervalHeight)
      const styler = props.intervalStyle || base.intervalStyleDefault
      return (
        <div
          class="v-calendar-daily__day-interval"
          key={ interval.time }
          style={[{ height }, styler(interval)]}
        >
          { slots.interval?.(base.getSlotScope(interval)) }
        </div>
      )
    }

    function genBodyIntervals () {
      const width: string | undefined = convertToUnit(props.intervalWidth)
      const events = getPrefixedEventHandlers(attrs, ':interval', nativeEvent => ({
        nativeEvent, ...base.getTimestampAtEvent(nativeEvent, base.parsedStart.value),
      }))
      return (
        <div
          class="v-calendar-daily__intervals-body"
          style={{ width }}
          { ...events }
        >
          { genIntervalLabels() }
        </div>
      )
    }

    function genIntervalLabels () {
      if (!base.intervals.value.length) return null
      return base.intervals.value[0].map(genIntervalLabel)
    }

    function genIntervalLabel (interval: CalendarTimestamp) {
      const height: string | undefined = convertToUnit(props.intervalHeight)
      const short = props.shortIntervals
      const shower = props.showIntervalLabel || base.showIntervalLabelDefault
      const show = shower(interval)
      const label = show ? base.intervalFormatter.value(interval, short) : undefined
      return (
        <div
          key={ interval.time }
          class="v-calendar-daily__interval"
          style={{ height }}
        >
          <div class="v-calendar-daily__interval-text">
            { label }
          </div>
        </div>
      )
    }

    onMounted(init)

    useRender(() => (
      <div
        class={['v-calendar-daily', attrs.class]}
        onDragstart={ (e: MouseEvent) => e.preventDefault() }
        v-resize_quiet={ onResize }
      >
        { !props.hideHeader ? genHead() : undefined }
        { genBody() }
      </div>
    ))

    return {
      ...base,
      scrollPush,
      scrollArea,
      pane,
      init,
      onResize,
      getScrollPush,
    }
  },
})

export type VCalendarDaily = InstanceType<typeof VCalendarDaily>
