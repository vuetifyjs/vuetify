// Styles
import './VCalendarCategory.sass'

// Types
import { VNode } from 'vue'

// Mixins
import VCalendarDaily from './VCalendarDaily'

// Util
import { convertToUnit, getSlot } from '../../util/helpers'
import { CalendarCategory, CalendarTimestamp } from 'types'
import props from './util/props'
import { getParsedCategories } from './util/parser'

/* @vue/component */
export default VCalendarDaily.extend({
  name: 'v-calendar-category',

  props: props.category,

  computed: {
    classes (): object {
      return {
        'v-calendar-daily': true,
        'v-calendar-category': true,
        ...this.themeClasses,
      }
    },
    parsedCategories (): CalendarCategory[] {
      return getParsedCategories(this.categories, this.categoryText)
    },
  },
  methods: {
    genDayHeader (day: CalendarTimestamp, index: number): VNode[] {
      const data = {
        staticClass: 'v-calendar-category__columns',
      }
      const scope = {
        week: this.days, ...day, index,
      }

      const children = this.parsedCategories.map(category => {
        return this.genDayHeaderCategory(day, this.getCategoryScope(scope, category))
      })

      return [this.$createElement('div', data, children)]
    },
    getCategoryScope (scope: any, category: CalendarCategory) {
      const cat = typeof category === 'object' && category &&
          category.categoryName === this.categoryForInvalid ? null : category
      return {
        ...scope,
        category: cat,
      }
    },
    genDayHeaderCategory (day: CalendarTimestamp, scope: any): VNode {
      return this.$createElement('div', {
        staticClass: 'v-calendar-category__column-header',
        on: this.getDefaultMouseEventHandlers(':day-category', e => {
          return this.getCategoryScope(this.getSlotScope(day), scope.category)
        }),
      }, [
        getSlot(this, 'category', scope) || this.genDayHeaderCategoryTitle(scope.category && scope.category.categoryName),
        getSlot(this, 'day-header', scope),
      ])
    },
    genDayHeaderCategoryTitle (categoryName: string | null) {
      return this.$createElement('div', {
        staticClass: 'v-calendar-category__category',
      }, categoryName === null ? this.categoryForInvalid : categoryName)
    },
    genDays (): VNode[] {
      const days: VNode[] = []
      this.days.forEach(d => {
        const day = new Array(this.parsedCategories.length || 1)
        day.fill(d)
        days.push(...day.map((v, i) => this.genDay(v, 0, i)))
      })
      return days
    },
    genDay (day: CalendarTimestamp, index: number, categoryIndex: number): VNode {
      const category = this.parsedCategories[categoryIndex]
      return this.$createElement('div', {
        key: day.date + '-' + categoryIndex,
        staticClass: 'v-calendar-daily__day',
        class: this.getRelativeClasses(day),
        on: this.getDefaultMouseEventHandlers(':time', e => {
          return this.getSlotScope(this.getTimestampAtEvent(e, day))
        }),
      }, [
        ...this.genDayIntervals(index, category),
        ...this.genDayBody(day, category),
      ])
    },
    genDayIntervals (index: number, category: CalendarCategory): VNode[] {
      return this.intervals[index].map(v => this.genDayInterval(v, category))
    },
    genDayInterval (interval: CalendarTimestamp, category: CalendarCategory): VNode {
      const height: string | undefined = convertToUnit(this.intervalHeight)
      const styler = this.intervalStyle || this.intervalStyleDefault

      const data = {
        key: interval.time,
        staticClass: 'v-calendar-daily__day-interval',
        style: {
          height,
          ...styler({ ...interval, category }),
        },
      }

      const children = getSlot(this, 'interval', () =>
        this.getCategoryScope(this.getSlotScope(interval), category)
      )

      return this.$createElement('div', data, children)
    },
    genDayBody (day: CalendarTimestamp, category: CalendarCategory): VNode[] {
      const data = {
        staticClass: 'v-calendar-category__columns',
      }

      const children = [this.genDayBodyCategory(day, category)]

      return [this.$createElement('div', data, children)]
    },
    genDayBodyCategory (day: CalendarTimestamp, category: CalendarCategory): VNode {
      const data = {
        staticClass: 'v-calendar-category__column',
        on: this.getDefaultMouseEventHandlers(':time-category', e => {
          return this.getCategoryScope(this.getSlotScope(this.getTimestampAtEvent(e, day)), category)
        }),
      }

      const children = getSlot(this, 'day-body', () => this.getCategoryScope(this.getSlotScope(day), category))

      return this.$createElement('div', data, children)
    },
  },
})
