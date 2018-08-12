// Styles
import '../../stylus/components/_calendar-daily.styl'

// Types
import { VNode } from 'vue'

// Mixins
import CalendarWithIntervals from './mixins/calendar-with-intervals'

// Util
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
      }, [

      ])
    },

    genHeadDays (): VNode[] {
      return this.days.map(d => this.genHeadDay(d))
    },

    genHeadDay (day: VTimestamp): VNode {
      let slot = this.$scopedSlots.dayHeader

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-daily_head-day',
        class: this.getRelativeClasses(day),
        on: this.getDefaultMouseEventHandlers(':day', (e: MouseEvent) => {
          return day
        })
      }, [
        this.genHeadWeekday(day),
        this.genHeadDayLabel(day),
        slot ? slot(day) : ''
      ])
    },

    genHeadWeekday (day: VTimestamp): VNode {
      let color = day.present ? this.computedColor : null

      return this.$createElement('div', {
        staticClass: 'v-calendar-daily_head-weekday',
        class: this.addTextColorClassChecks({}, color)
      }, this.weekdayFormatter(day, this.shortWeekdays))
    },

    genHeadDayLabel (day: VTimestamp): VNode {
      let color = day.present ? this.computedColor : null

      return this.$createElement('div', {
        staticClass: 'v-calendar-daily_head-day-label',
        class: this.addTextColorClassChecks({}, color),
        on: this.getMouseEventHandlers({
          'click:date': { event: 'click', stop: true },
          'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false }
        }, (e: MouseEvent) => {
          return day
        })
      }, this.dayFormatter(day, false))
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
          height: this.bodyHeight + 'px'
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
      return this.days.map((d: VTimestamp, i: number) => this.genDay(d, i))
    },

    genDay (day: VTimestamp, index: number): VNode {
      let slot = this.$scopedSlots.dayBody

      return this.$createElement('div', {
        key: day.date,
        staticClass: 'v-calendar-daily__day',
        class: this.getRelativeClasses(day),
        on: this.getDefaultMouseEventHandlers(':time', (e: MouseEvent) => {
          return this.getTimestampAtEvent(day, e)
        })
      }, [
        ...this.genDayIntervals(index),
        slot ? slot(day) : ''
      ])
    },

    genDayIntervals (index: number): VNode[] {
      return this.intervals[index].map(i => this.genDayInterval(i))
    },

    genDayInterval (interval: VTimestamp): VNode {
      let height: string = this.intervalHeight + 'px'
      let styler = this.intervalStyle || this.intervalStyleDefault
      let slot = this.$scopedSlots.interval

      let data = {
        key: interval.time,
        staticClass: 'v-calendar-daily__day-interval',
        style: {
          height,
          ...styler(interval)
        }
      }

      let children = slot ? slot(interval) : undefined

      return this.$createElement('div', data, children)
    },

    genBodyIntervals (): VNode {
      let data = {
        staticClass: 'v-calendar-daily__intervals-body',
        on: this.getDefaultMouseEventHandlers(':interval', (e: MouseEvent) => {
          return this.getTimestampAtEvent(this.parsedStart, e)
        })
      }

      return this.$createElement('div', data, this.genIntervalLabels())
    },

    genIntervalLabels (): VNode[] {
      return this.intervals[0].map(i => this.genIntervalLabel(i))
    },

    genIntervalLabel (interval: VTimestamp): VNode {
      let height: string = this.intervalHeight + 'px'
      let short: boolean = this.shortIntervals
      let shower = this.showIntervalLabel || this.showIntervalLabelDefault
      let show = shower(interval)
      let label = show ? this.intervalFormatter(interval, short) : undefined

      return this.$createElement('div', {
        key: interval.time,
        staticClass: 'v-calendar-daily__interval',
        style: {
          height
        }
      }, [
        this.$createElement('div', {
          staticClass: 'v-calendar-daily__interval-text'
        },
        label
        )
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
      this.hideHeader ? '' : this.genHead(),
      this.genBody()
    ])
  }
})
