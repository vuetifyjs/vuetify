require('../../stylus/components/_pickers.styl')
require('../../stylus/components/_date-picker.styl')

import { createRange } from '../../util/helpers'

import Picker from '../../mixins/picker'
import DateYears from './mixins/date-years'
import DateTitle from './mixins/date-title'
import DateHeader from './mixins/date-header'
import DateTable from './mixins/date-table'
import MonthTable from './mixins/month-table'
import VBtn from '../VBtn'
import VCard from '../VCard'
import VIcon from '../VIcon'

import Touch from '../../directives/touch'

const createDefaultDateFormat = type => date => {
  const pad = n => n < 10 ? `0${n}` : `${n}`
  const isoString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  return isoString.substr(0, { date: 10, month: 7, year: 4 }[type])
}

export default {
  name: 'v-date-picker',

  components: {
    VBtn,
    VCard,
    VIcon
  },

  mixins: [Picker, DateYears, DateTitle, DateHeader, DateTable, MonthTable],

  directives: { Touch },

  data () {
    return {
      tableDate: new Date(),
      originalDate: this.value,
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      isReversing: false,
      narrowDays: [],
      activePicker: this.type.toUpperCase()
    }
  },

  props: {
    locale: {
      type: String,
      default: 'en-us'
    },
    type: {
      type: String,
      default: 'date',
      validator: type => ['date', 'month'/*, 'year'*/].includes(type)
    },
    dateFormat: {
      type: Function,
      default: null
    },
    titleDateFormat: {
      type: [Object, Function],
      default: null
    },
    headerDateFormat: {
      type: [Object, Function],
      default: () => ({ month: 'long', year: 'numeric' })
    },
    monthFormat: {
      type: [Object, Function],
      default: () => ({ month: 'short' })
    },
    formattedValue: {
      required: false
    },
    allowedDates: {
      type: [Array, Object, Function],
      default: () => (null)
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    yearIcon: String
  },

  computed: {
    timeZone () {
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        new Date('2000-01-15').toLocaleDateString('en', {
          day: 'numeric',
          timeZone
        })
        return timeZone
      } catch (e) {
        return 'UTC'
      }
    },
    supportsLocaleFormat () {
      return ('toLocaleDateString' in Date.prototype) &&
        new Date('2000-01-15').toLocaleDateString('en', {
          day: 'numeric',
          timeZone: 'UTC'
        }) === '15'
    },
    firstAllowedDate () {
      const date = new Date()

      if (this.type === 'month') {
        date.setDate(1)
        date.setHours(1)

        if (this.allowedDates) {
          const valid = new Date(date)
          for (let month = 0; month < 12; month++) {
            valid.setMonth(month)
            if (this.isAllowed(valid)) {
              return valid
            }
          }
        }
      } else if (this.type === 'date') {
        date.setHours(1)
        const month = date.getMonth()

        if (this.allowedDates) {
          const valid = new Date(date)
          for (let i = 0; i < 31; i++) {
            if (date.getMonth() === month && this.isAllowed(valid)) return valid
            valid.setDate(i)
          }
        }
      }

      return date
    },
    inputDate: {
      get () {
        const date = this.makeDate(this.value)
        return date == null ? this.firstAllowedDate : date
      },
      set (value) {
        const date = this.makeDate(value)
        const pickerDateFormat = createDefaultDateFormat(this.type)
        this.$emit('input', date == null ? this.originalDate : pickerDateFormat(date))
        this.$emit('update:formattedValue', (this.dateFormat || pickerDateFormat)(date == null ? (this.makeDate(this.originalDate) || this.firstAllowedDate) : date))
      }
    },
    day () {
      return this.inputDate.getDate()
    },
    month () {
      return this.inputDate.getMonth()
    },
    year () {
      return this.inputDate.getFullYear()
    },
    tableMonth () {
      return this.tableDate.getMonth()
    },
    tableYear () {
      return this.tableDate.getFullYear()
    },
    computedTransition () {
      return this.isReversing ? 'tab-reverse-transition' : 'tab-transition'
    },
    titleText () {
      const date = this.normalizeDate(this.year, this.month, this.day)

      const defaultTitleDateFormat = this.type === 'year' ? {
        year: 'numeric'
      } : (this.type === 'month' ? {
        month: 'long'
      } : {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })

      let titleText
      if (typeof this.titleDateFormat === 'function') {
        titleText = this.titleDateFormat(date)
      } else if (this.supportsLocaleFormat) {
        titleText = date.toLocaleDateString(this.locale, Object.assign(this.titleDateFormat || defaultTitleDateFormat, {
          timeZone: this.timeZone
        }))
      } else if ('toLocaleDateString' in Date.prototype) {
        titleText = createDefaultDateFormat(this.type)(date)
      }

      if (this.landscape) {
        if (titleText.indexOf(',') > -1) titleText = titleText.replace(',', ',<br>')
        else if (titleText.indexOf(' ') > -1) titleText = titleText.replace(' ', '<br>')
      }

      return titleText
    }
  },

  watch: {
    activePicker (val, prev) {
      if (val !== 'YEAR') return

      // That's a quirk, setting timeout stopped working after fixing #1649
      // It worked but for timeouts significantly longer than the transition duration
      const interval = setInterval(() => {
        if (this.$refs.years) {
          this.$refs.years.scrollTop = this.$refs.years.scrollHeight / 2 - 125
          clearInterval(interval)
        }
      }, 100)
    },
    tableDate (val, prev) {
      this.isReversing = val < prev
    },
    value (val) {
      if (val) this.tableDate = this.inputDate
    },
    type (val) {
      if (val === 'month' && this.activePicker === 'DATE') {
        this.activePicker = 'MONTH'
      } else if (val === 'year') {
        this.activePicker = 'YEAR'
      }
    },
    firstDayOfWeek () {
      this.getWeekDays()
    }
  },

  methods: {
    save () {
      if (this.originalDate) {
        this.originalDate = this.value
      } else {
        this.originalDate = this.inputDate
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
    },
    cancel () {
      this.inputDate = this.originalDate
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
    },
    getWeekDays () {
      const first = parseInt(this.firstDayOfWeek, 10)
      if (this.supportsLocaleFormat) {
        const date = this.normalizeDate(2000, 1, 7)
        const day = date.getDate() - date.getDay() + first
        const format = { weekday: 'narrow' }
        this.narrowDays = createRange(7).map(i => this.normalizeDate(2000, 1, day + i).toLocaleDateString(this.locale, format))
      } else {
        this.narrowDays = createRange(7).map(i => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7])
      }
    },
    isAllowed (date) {
      if (!this.allowedDates) return true

      if (Array.isArray(this.allowedDates)) {
        const format = createDefaultDateFormat(this.activePicker === 'MONTH' ? 'month' : 'date')
        date = format(this.makeDate(date))
        return !!this.allowedDates.find(allowedDate => {
          allowedDate = this.makeDate(allowedDate)
          return allowedDate && format(allowedDate) === date
        })
      } else if (this.allowedDates instanceof Function) {
        return this.allowedDates(date)
      } else if (this.allowedDates instanceof Object) {
        const format = createDefaultDateFormat(this.activePicker === 'MONTH' ? 'month' : 'date')
        const min = format(this.makeDate(this.allowedDates.min))
        const max = format(this.makeDate(this.allowedDates.max))
        date = format(date)
        return (!min || min <= date) && (!max || max >= date)
      }

      return true
    },
    genTableTouch (touchCallback) {
      return {
        name: 'touch',
        value: {
          left: e => (e.offsetX < -15) && touchCallback(1),
          right: e => (e.offsetX > 15) && touchCallback(-1)
        }
      }
    },
    genTable (tableChildren, touchCallback) {
      const wheel = this.activePicker === 'MONTH' ? this.monthWheelScroll : this.dateWheelScroll
      const options = {
        staticClass: 'picker--date__table',
        'class': {
          'picker--month__table': this.activePicker === 'MONTH'
        },
        on: this.scrollable ? { wheel } : undefined,
        directives: [this.genTableTouch(touchCallback)]
      }

      const table = this.$createElement('table', {
        key: this.activePicker === 'MONTH' ? this.tableYear : this.tableMonth
      }, tableChildren)

      return this.$createElement('div', options, [
        this.$createElement('transition', {
          props: { name: this.computedTransition }
        }, [table])
      ])
    },
    genPickerBody (h) {
      const pickerBodyChildren = []
      if (this.activePicker === 'DATE') {
        pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]))
        pickerBodyChildren.push(this.genTable([
          this.dateGenTHead(),
          this.dateGenTBody()
        ], value => this.tableDate = this.normalizeDate(this.tableYear, this.tableMonth + value)))
      } else if (this.activePicker === 'MONTH') {
        pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]))
        pickerBodyChildren.push(this.genTable([
          this.monthGenTBody()
        ], value => this.tableDate = this.normalizeDate(this.tableYear + value)))
      } else if (this.activePicker === 'YEAR') {
        pickerBodyChildren.push(this.genYears())
      }

      return pickerBodyChildren
    },
    makeDate (val) {
      if (val == null) return val
      if (val instanceof Date) return val
      if (!isNaN(val)) return new Date(val)
      const [year, month, date] = val.trim().split(' ')[0].split('-')
      return this.normalizeDate(year, month ? (month - 1) : 0, date ? (date * 1) : 1)
    },
    normalizeDate (year, month = 0, date = 1) {
      return new Date(year, month, date, 1 /* Workaround for #1409 */)
    }
  },

  created () {
    this.getWeekDays()
    this.tableDate = this.inputDate
  },

  mounted () {
    const date = new Date()
    this.currentDay = date.getDate()
    this.currentMonth = date.getMonth()
    this.currentYear = date.getFullYear()
  },

  render (h) {
    const children = []

    !this.noTitle && children.push(this.genTitle(this.titleText))

    children.push(h('transition', {
      props: {
        origin: 'center center',
        mode: 'out-in',
        name: 'scale-transition'
      }
    }, [h('div', {
      staticClass: 'picker__body',
      key: this.activePicker
    }, this.genPickerBody(h))]))

    this.$scopedSlots.default && children.push(this.genSlot())

    return h('v-card', {
      staticClass: 'picker picker--date',
      'class': {
        'picker--landscape': this.landscape,
        ...this.themeClasses
      }
    }, children)
  }

}
