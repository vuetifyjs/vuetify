// Styles
import './VCalendarDaily.sass'

// Types
import { VNode } from 'vue'

// Directives
import Resize from '../../directives/resize'

// Components
import VBtn from '../VBtn'

// Mixins
import CalendarWithIntervals from './mixins/calendar-with-intervals'

// Util
import { convertToUnit, getSlot } from '../../util/helpers'
import { CalendarTimestamp } from 'vuetify/types'

/* @vue/component */
export default CalendarWithIntervals.extend({
  name: 'v-calendar-daily',

  directives: { Resize },

  data: () => ({
    scrollPush: 0,
  }),

  computed: {
    classes (): object {
      return {
        'v-calendar-daily': true,
        ...this.themeClasses,
      }
    },
  },

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
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__head',
        style: {
          marginRight: this.scrollPush + 'px',
        },
      }, [
        this.genHeadIntervals(),
        ...this.genHeadDays(),
      ])
    },
    genHeadIntervals (): VNode {
      const width: string | undefined = convertToUnit(this.intervalWidth)

      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__intervals-head',
        style: {
          width,
        },
      }, getSlot(this, 'interval-header'))
    },
    genHeadDays (): VNode[] {
      return this.days.map(this.genHeadDay)
    },
    genHeadDay (day: CalendarTimestamp, index: number): VNode {
      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-daily_head-day',
        class: this.getRelativeClasses(day),
        on: this.getDefaultMouseEventHandlers(':day', nativeEvent => {
          return { nativeEvent, ...this.getSlotScope(day) }
        }),
      }, [
        this.genHeadWeekday(day),
        this.genHeadDayLabel(day),
        ...this.genDayHeader(day, index),
      ])
    },
    genDayHeader (day: CalendarTimestamp, index: number): VNode[] {
      return getSlot(this, 'day-header', () => ({
        week: this.days, ...day, index,
      })) || []
    },
    genHeadWeekday (day: CalendarTimestamp): VNode {
      const color = day.present ? this.color : undefined

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-calendar-daily_head-weekday',
      }), this.weekdayFormatter(day, this.shortWeekdays))
    },
    genHeadDayLabel (day: CalendarTimestamp): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily_head-day-label',
      }, getSlot(this, 'day-label-header', day) || [this.genHeadDayButton(day)])
    },
    genHeadDayButton (day: CalendarTimestamp): VNode {
      const color = day.present ? this.color : 'transparent'

      return this.$createElement(VBtn, {
        props: {
          color,
          fab: true,
          depressed: true,
        },
        on: this.getMouseEventHandlers({
          'click:date': { event: 'click', stop: true },
          'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false },
        }, nativeEvent => {
          return { nativeEvent, ...day }
        }),
      }, this.dayFormatter(day, false))
    },
    genBody (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__body',
      }, [
        this.genScrollArea(),
      ])
    },
    genScrollArea (): VNode {
      return this.$createElement('div', {
        ref: 'scrollArea',
        staticClass: 'v-calendar-daily__scroll-area',
      }, [
        this.genPane(),
      ])
    },
    genPane (): VNode {
      return this.$createElement('div', {
        ref: 'pane',
        staticClass: 'v-calendar-daily__pane',
        style: {
          height: convertToUnit(this.bodyHeight),
        },
      }, [
        this.genDayContainer(),
      ])
    },
    genDayContainer (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__day-container',
      }, [
        this.genBodyIntervals(),
        ...this.genDays(),
      ])
    },
    genDays (): VNode[] {
      return this.days.map(this.genDay)
    },
    genDay (day: CalendarTimestamp, index: number): VNode {
      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-daily__day',
        class: this.getRelativeClasses(day),
        on: this.getDefaultMouseEventHandlers(':time', nativeEvent => {
          return { nativeEvent, ...this.getSlotScope(this.getTimestampAtEvent(nativeEvent, day)) }
        }),
      }, [
        ...this.genDayIntervals(index),
        ...this.genDayBody(day),
      ])
    },
    genDayBody (day: CalendarTimestamp): VNode[] {
      return getSlot(this, 'day-body', () => this.getSlotScope(day)) || []
    },
    genDayIntervals (index: number): VNode[] {
      return this.intervals[index].map(this.genDayInterval)
    },
    genDayInterval (interval: CalendarTimestamp): VNode {
      const height: string | undefined = convertToUnit(this.intervalHeight)
      const styler = this.intervalStyle || this.intervalStyleDefault

      const data = {
        key: interval.time,
        staticClass: 'v-calendar-daily__day-interval',
        style: {
          height,
          ...styler(interval),
        },

      }

      const children = getSlot(this, 'interval', () => this.getSlotScope(interval))

      return this.$createElement('div', data, children)
    },
    genBodyIntervals (): VNode {
      const width: string | undefined = convertToUnit(this.intervalWidth)
      const data = {
        staticClass: 'v-calendar-daily__intervals-body',
        style: {
          width,
        },
        on: this.getDefaultMouseEventHandlers(':interval', nativeEvent => {
          return { nativeEvent, ...this.getTimestampAtEvent(nativeEvent, this.parsedStart) }
        }),
      }

      return this.$createElement('div', data, this.genIntervalLabels())
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

      return this.$createElement('div', {
        key: interval.time,
        staticClass: 'v-calendar-daily__interval',
        style: {
          height,
        },
      }, [
        this.$createElement('div', {
          staticClass: 'v-calendar-daily__interval-text',
        }, label),
      ])
    },
  },

  render (h): VNode {
    return h('div', {
      class: this.classes,
      on: {
        dragstart: (e: MouseEvent) => {
          e.preventDefault()
        },
      },
      directives: [{
        modifiers: { quiet: true },
        name: 'resize',
        value: this.onResize,
      }],
    }, [
      !this.hideHeader ? this.genHead() : '',
      this.genBody(),
    ])
  },
})
