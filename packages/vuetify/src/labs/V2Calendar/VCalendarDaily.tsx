// Styles
import './VCalendarDaily.sass'

// Components
import { VIconBtn } from '@/labs/VIconBtn'

// Directives
import vResize from '@/directives/resize'

// Utilities
import { convertToUnit, defineComponent, getPrefixedEventHandlers } from '@/util'

// Mixins
import CalendarWithIntervals from './mixins/calendar-with-intervals'

// Types
import type { VNode } from 'vue'
import type { CalendarTimestamp } from './types'

export default defineComponent({
  name: 'VCalendarDaily',

  directives: { vResize },

  extends: CalendarWithIntervals,

  data: () => ({
    scrollPush: 0,
  }),

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.$nextTick(this.onResize)
    },
    onResize () {
      this.scrollPush = this.getScrollPush()
    },
    getScrollPush (): number {
      const area = this.$refs.scrollArea as HTMLElement
      const pane = this.$refs.pane as HTMLElement

      return area && pane ? (area.offsetWidth - pane.offsetWidth) : 0
    },
    genHead (): VNode {
      return (
        <div
          class="v-calendar-daily__head"
          style={{ marginRight: this.scrollPush + 'px' }}
        >
          { this.genHeadIntervals() }
          { this.genHeadDays() }
        </div>
      )
    },
    genHeadIntervals (): VNode {
      const width: string | undefined = convertToUnit(this.intervalWidth)
      return (
        <div
          class="v-calendar-daily__intervals-head"
          style={{ width }}
        >
          { this.$slots['interval-header']?.() }
        </div>
      )
    },
    genHeadDays (): VNode[] {
      return this.days.map(this.genHeadDay)
    },
    genHeadDay (day: CalendarTimestamp, index: number): VNode {
      const events = getPrefixedEventHandlers(this.$attrs, ':day', nativeEvent => ({
        nativeEvent, ...this.getSlotScope(day),
      }))
      return (
        <div
          key={ day.date }
          class={['v-calendar-daily_head-day', this.getRelativeClasses(day)]}
          { ...events }
        >
          { this.genHeadWeekday(day) }
          { this.genHeadDayLabel(day) }
          { this.genDayHeader(day, index) }
        </div>
      )
    },
    genDayHeader (day: CalendarTimestamp, index: number): VNode[] {
      return this.$slots['day-header']?.({
        week: this.days, ...day, index,
      }) ?? []
    },
    genHeadWeekday (day: CalendarTimestamp): VNode {
      const color = day.present ? this.color : undefined
      return (
        <div
          { ...this.setTextColor(color, {
            class: 'v-calendar-daily_head-weekday',
          })}
        >
          { this.weekdayFormatter(day, this.shortWeekdays) }
        </div>
      )
    },
    genHeadDayLabel (day: CalendarTimestamp): VNode {
      return (
        <div class="v-calendar-daily_head-day-label">
          { this.$slots['day-label-header']?.(day) ?? this.genHeadDayButton(day) }
        </div>
      )
    },
    genHeadDayButton (day: CalendarTimestamp): VNode {
      const color = day.present ? this.color : 'transparent'
      const events = getPrefixedEventHandlers(this.$attrs, ':date', nativeEvent => ({
        nativeEvent, ...day,
      }))
      return (
        <VIconBtn
          color={ color }
          { ...events }
        >
          { this.dayFormatter(day, false) }
        </VIconBtn>
      )
    },
    genBody (): VNode {
      return (
        <div class="v-calendar-daily__body">
          { this.genScrollArea() }
        </div>
      )
    },
    genScrollArea (): VNode {
      return (
        <div ref="scrollArea" class="v-calendar-daily__scroll-area">
          { this.genPane() }
        </div>
      )
    },
    genPane (): VNode {
      return (
        <div
          ref="pane"
          class="v-calendar-daily__pane"
          style={{ height: convertToUnit(this.bodyHeight) }}
        >
          { this.genDayContainer() }
        </div>
      )
    },
    genDayContainer (): VNode {
      return (
        <div class="v-calendar-daily__day-container">
          { this.genBodyIntervals() }
          { this.genDays() }
        </div>
      )
    },
    genDays (): VNode[] {
      return this.days.map((day, index) => {
        const events = getPrefixedEventHandlers(this.$attrs, ':time', nativeEvent => ({
          nativeEvent, ...this.getSlotScope(this.getTimestampAtEvent(nativeEvent, day)),
        }))
        return (
          <div
            key={ day.date }
            class={['v-calendar-daily__day', this.getRelativeClasses(day)]}
            { ...events }
          >
            { this.genDayIntervals(index) }
            { this.genDayBody(day) }
          </div>
        )
      })
    },
    genDayBody (day: CalendarTimestamp): VNode[] {
      return this.$slots['day-body']?.(this.getSlotScope(day)) ?? []
    },
    genDayIntervals (index: number): VNode[] {
      return this.intervals[index].map(this.genDayInterval)
    },
    genDayInterval (interval: CalendarTimestamp): VNode {
      const height: string | undefined = convertToUnit(this.intervalHeight)
      const styler = this.intervalStyle || this.intervalStyleDefault
      return (
        <div
          class="v-calendar-daily__day-interval"
          key={ interval.time }
          style={[{ height }, styler(interval)]}
        >
          { this.$slots.interval?.(this.getSlotScope(interval)) }
        </div>
      )
    },
    genBodyIntervals (): VNode {
      const width: string | undefined = convertToUnit(this.intervalWidth)
      const events = getPrefixedEventHandlers(this.$attrs, ':interval', nativeEvent => ({
        nativeEvent, ...this.getTimestampAtEvent(nativeEvent, this.parsedStart),
      }))
      return (
        <div
          class="v-calendar-daily__intervals-body"
          style={{ width }}
          { ...events }
        >
          { this.genIntervalLabels() }
        </div>
      )
    },
    genIntervalLabels (): VNode[] | null {
      if (!this.intervals.length) return null
      return this.intervals[0].map(this.genIntervalLabel)
    },
    genIntervalLabel (interval: CalendarTimestamp): VNode {
      const height: string | undefined = convertToUnit(this.intervalHeight)
      const short: boolean = this.shortIntervals
      const shower = this.showIntervalLabel || this.showIntervalLabelDefault
      const show = shower(interval)
      const label = show ? this.intervalFormatter(interval, short) : undefined
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
    },
  },

  render () {
    return (
      <div
        class={['v-calendar-daily', this.$vuetify.theme.themeClasses]}
        onDragstart={ (e: MouseEvent) => e.preventDefault() }
        v-resize_quiet={ this.onResize }
      >
        { !this.hideHeader ? this.genHead() : undefined }
        { this.genBody() }
      </div>
    )
  },
})
