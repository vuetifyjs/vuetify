// Styles
import '../../stylus/components/_calendar-daily.styl'

// Types
import { VNode, VNodeChildren } from 'vue'

// Mixins
import CalendarWithIntervals from './mixins/calendar-with-intervals'

// Util
import { convertToUnit } from '../../util/helpers'
import { VTimestamp } from './util/timestamp'

/* @vue/component */
export default CalendarWithIntervals.extend({
  name: 'v-calendar-daily',

  computed: {
    classes (): object {
      return {
        'v-calendar-daily': true,
        ...this.themeClasses
      }
    }
  },

  methods: {
    genHead (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__head'
      }, [
        this.genHeadIntervals(),
        ...this.genHeadDays()
      ])
    },
    genHeadIntervals (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__intervals-head'
      })
    },
    genHeadDays (): VNode[] {
      return this.days.map(this.genHeadDay)
    },
    genHeadDay (day: VTimestamp): VNode {
      const slot = this.$scopedSlots.dayHeader

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-daily_head-day',
        class: this.getRelativeClasses(day),
        on: this.getDefaultMouseEventHandlers(':day', e => {
          return day
        })
      }, [
        this.genHeadWeekday(day),
        this.genHeadDayLabel(day),
        slot ? slot(day) : ''
      ])
    },
    genHeadWeekday (day: VTimestamp): VNode {
      const color = day.present ? this.color : undefined

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-calendar-daily_head-weekday'
      }), this.weekdayFormatter(day, this.shortWeekdays))
    },
    genHeadDayLabel (day: VTimestamp): VNode {
      const color = day.present ? this.color : undefined

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-calendar-daily_head-day-label',
        on: this.getMouseEventHandlers({
          'click:date': { event: 'click', stop: true },
          'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false }
        }, e => {
          return day
        })
      }), this.dayFormatter(day, false))
    },
    genBody (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__body'
      }, [
        this.genScrollArea()
      ])
    },
    genScrollArea (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__scroll-area'
      }, [
        this.genPane()
      ])
    },
    genPane (): VNode {
      return this.$createElement('div', {
        ref: 'pane',
        staticClass: 'v-calendar-daily__pane',
        style: {
          height: convertToUnit(this.bodyHeight)
        }
      }, [
        this.genDayContainer()
      ])
    },
    genDayContainer (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-daily__day-container'
      }, [
        this.genBodyIntervals(),
        ...this.genDays()
      ])
    },
    genDays (): VNode[] {
      return this.days.map(this.genDay)
    },
    genDay (day: VTimestamp, index: number): VNode {
      const slot = this.$scopedSlots.dayBody

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-daily__day',
        class: this.getRelativeClasses(day),
        on: this.getDefaultMouseEventHandlers(':time', e => {
          return this.getTimestampAtEvent(e, day)
        })
      }, [
        ...this.genDayIntervals(index),
        slot ? slot(day) : ''
      ])
    },
    genDayIntervals (index: number): VNode[] {
      return this.intervals[index].map(this.genDayInterval)
    },
    genDayInterval (interval: VTimestamp): VNode {
      const height: string | undefined = convertToUnit(this.intervalHeight)
      const styler = this.intervalStyle || this.intervalStyleDefault
      const slot = this.$scopedSlots.interval

      const data = {
        key: interval.time,
        staticClass: 'v-calendar-daily__day-interval',
        style: {
          height,
          ...styler(interval)
        }
      }

      const children = slot ? slot(interval) as VNodeChildren : undefined

      return this.$createElement('div', data, children)
    },
    genBodyIntervals (): VNode {
      const data = {
        staticClass: 'v-calendar-daily__intervals-body',
        on: this.getDefaultMouseEventHandlers(':interval', e => {
          return this.getTimestampAtEvent(e, this.parsedStart)
        })
      }

      return this.$createElement('div', data, this.genIntervalLabels())
    },
    genIntervalLabels (): VNode[] {
      return this.intervals[0].map(this.genIntervalLabel)
    },
    genIntervalLabel (interval: VTimestamp): VNode {
      const height: string | undefined = convertToUnit(this.intervalHeight)
      const short: boolean = this.shortIntervals
      const shower = this.showIntervalLabel || this.showIntervalLabelDefault
      const show = shower(interval)
      const label = show ? this.intervalFormatter(interval, short) : undefined

      return this.$createElement('div', {
        key: interval.time,
        staticClass: 'v-calendar-daily__interval',
        style: {
          height
        }
      }, [
        this.$createElement('div', {
          staticClass: 'v-calendar-daily__interval-text'
        }, label)
      ])
    }
  },

  render (h): VNode {
    return h('div', {
      class: this.classes,
      nativeOn: {
        dragstart: (e: MouseEvent) => {
          e.preventDefault()
        }
      }
    }, [
      !this.hideHeader ? this.genHead() : '',
      this.genBody()
    ])
  }
})
