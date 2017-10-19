require('../../stylus/components/_pickers.styl')
require('../../stylus/components/_date-picker.styl')

import { createRange } from '../../util/helpers'

import DateYears from './mixins/date-years'
import DateTitle from './mixins/date-title'
import DateHeader from './mixins/date-header'
import DateTable from './mixins/date-table'
import MonthTable from './mixins/month-table'
import Picker from '../../mixins/picker'
import VBtn from '../VBtn'
import VCard from '../VCard'
import VIcon from '../VIcon'

import Touch from '../../directives/touch'

const pad = n => (n * 1 < 10) ? `0${n * 1}` : `${n}`

/**
 * Creates the formatting function that uses Date::toLocaleDateString or returns date
 * in ISO format if toLocaleDateString is not supported by the browser
 * Formatting function takes a date string in ISO format and locale as a parameters
 *
 * @param {Object} format Passed as a second argument of Date::toLocaleDateString
 * @param {String} fallbackType Can be 'year', 'month', 'date', 'monthOnly', 'dateOnly',
 *   returns respectively date in 'YYYY', 'YYYY-MM', 'YYYY-MM-DD', 'MM', 'DD' format
 */
const createNativeLocaleFormatter = (format, fallbackType) => (dateString, locale) => {
  const [year, month, date] = dateString.trim().split(' ')[0].split('-')

  if (Date.prototype.toLocaleDateString) {
    const dateObject = new Date(`${year}-${pad(month || 1)}-${pad(date || 1)}T00:00:00+00:00`)
    return dateObject.toLocaleDateString(locale, Object.assign(format, {
      timeZone: 'UTC'
    }))
  } else {
    const isoString = `${year * 1}-${pad(month || 1)}-${pad(date || 1)}`
    const formats = {
      date: { start: 0, length: 10 },
      month: { start: 0, length: 7 },
      year: { start: 0, length: 4 },
      monthOnly: { start: 5, length: 2 },
      dateOnly: { start: 8, length: 2 }
    }
    return isoString.substr(formats[fallbackType].start, formats[fallbackType].length)
  }
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
    const now = new Date()
    return {
      activePicker: this.type.toUpperCase(),
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      isReversing: false,
      originalDate: this.value,
      // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
      tableDate: this.type === 'month'
        ? `${now.getFullYear()}`
        : `${now.getFullYear()}-${now.getMonth() + 1}`
    }
  },

  props: {
    allowedDates: {
      type: [Array, Object, Function],
      default: () => (null)
    },
    // Function formatting the day in date picker table
    dayFormat: {
      type: Function,
      default: createNativeLocaleFormatter({ day: 'numeric' }, 'dateOnly')
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    // Function formatting the tableDate in the day/month table header
    headerDateFormat: {
      type: Function,
      default: createNativeLocaleFormatter({ month: 'long', year: 'numeric' }, 'month')
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    // Function formatting month in the months table
    monthFormat: {
      type: Function,
      default: createNativeLocaleFormatter({ month: 'short' }, 'monthOnly')
    },
    // Function formatting currently selected date in the picker title
    titleDateFormat: {
      type: Function,
      default: null
    },
    type: {
      type: String,
      default: 'date',
      validator: type => ['date', 'month'/*, 'year'*/].includes(type)
    },
    value: String,
    // Function formatting the year in table header and pickup title
    yearFormat: {
      type: Function,
      default: createNativeLocaleFormatter({ year: 'numeric' }, 'year')
    },
    yearIcon: String
  },

  computed: {
    weekDays () {
      const first = parseInt(this.firstDayOfWeek, 10)
      if (!Date.prototype.toLocaleDateString) {
        return createRange(7).map(i => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7])
      }

      // Operates on UTC time zone to get the names of the week days
      const date = new Date('2000-01-07T00:00:00+00:00')
      const day = date.getUTCDate() - date.getUTCDay() + first
      const format = { weekday: 'narrow', timeZone: 'UTC' }
      return createRange(7).map(i => new Date(`2000-01-${pad(day + i)}T00:00:00+00:00`).toLocaleDateString(this.locale, format))
    },
    firstAllowedDate () {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()

      if (this.allowedDates) {
        for (let date = now.getDate(); date <= 31; date++) {
          const dateString = `${year}-${month + 1}-${date}`
          if (isNaN(new Date(dateString).getDate())) break

          const sanitizedDateString = this.sanitizeDateString(dateString, 'date')
          if (this.isAllowed(sanitizedDateString)) {
            return sanitizedDateString
          }
        }
      }

      return this.sanitizeDateString(`${year}-${month + 1}-${now.getDate()}`, 'date')
    },
    firstAllowedMonth () {
      const now = new Date()
      const year = now.getFullYear()

      if (this.allowedDates) {
        for (let month = now.getMonth(); month < 12; month++) {
          const dateString = `${year}-${month + 1}`
          const sanitizedDateString = this.sanitizeDateString(dateString, 'month')
          if (this.isAllowed(sanitizedDateString)) {
            return sanitizedDateString
          }
        }
      }

      return this.sanitizeDateString(`${year}-${now.getMonth() + 1}`, 'month')
    },
    // inputDate MUST be a string in ISO 8601 format (including leading zero for month/day)
    // YYYY-MM for month picker
    // YYYY-MM-DD for date picker
    inputDate: {
      get () {
        if (this.value) {
          return this.sanitizeDateString(this.value, this.type)
        }

        return this.type === 'month' ? this.firstAllowedMonth : this.firstAllowedDate
      },
      set (value) {
        const date = value == null ? this.originalDate : this.sanitizeDateString(value, this.type)
        this.$emit('input', date)
      }
    },
    day () {
      return this.inputDate.split('-')[2] * 1
    },
    month () {
      return this.inputDate.split('-')[1] - 1
    },
    year () {
      return this.inputDate.split('-')[0] * 1
    },
    tableMonth () {
      return this.tableDate.split('-')[1] - 1
    },
    tableYear () {
      return this.tableDate.split('-')[0] * 1
    },
    computedTransition () {
      return this.isReversing ? 'tab-reverse-transition' : 'tab-transition'
    },
    titleText () {
      // Current date in ISO 8601 format (with leading zero)
      const date = this.type === 'month'
        ? `${this.year}-${pad(this.month + 1)}`
        : `${this.year}-${pad(this.month + 1)}-${pad(this.day)}`

      if (this.titleDateFormat) {
        return this.titleDateFormat(date, this.locale)
      }

      const defaultTitleDateFormat = this.type === 'year' ? {
        year: 'numeric'
      } : (this.type === 'month' ? {
        month: 'long'
      } : {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })

      let titleText = createNativeLocaleFormatter(defaultTitleDateFormat, this.type)(date, this.locale)
      if (this.landscape) {
        if (titleText.indexOf(',') > -1) titleText = titleText.replace(', ', ',<br>')
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
      // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
      // compare for example '2000-9' and '2000-10'
      const sanitizeType = this.type === 'month' ? 'year' : 'month'
      this.isReversing = this.sanitizeDateString(val, sanitizeType) < this.sanitizeDateString(prev, sanitizeType)
    },
    value (val) {
      if (val) {
        this.tableDate = this.type === 'month' ? `${this.year}` : `${this.year}-${this.month + 1}`
      }
    },
    type (val) {
      if (val === 'month' && this.activePicker === 'DATE') {
        this.activePicker = 'MONTH'
      } else if (val === 'year') {
        this.activePicker = 'YEAR'
      }
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
    isAllowed (date) {
      if (!this.allowedDates) return true

      // date parameter must be in ISO 8601 format with leading zero
      // If allowedDates is an array its values must be in ISO 8601 format with leading zero
      // If allowedDates is on object its min/max properties must be in ISO 8601 with leading zero
      if (Array.isArray(this.allowedDates)) {
        return this.allowedDates.indexOf(date) > -1
      } else if (this.allowedDates instanceof Function) {
        return this.allowedDates(date)
      } else if (this.allowedDates instanceof Object) {
        const min = this.allowedDates.min
        const max = this.allowedDates.max
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
        ], value => this.updateTableMonth(this.tableMonth + value)))
      } else if (this.activePicker === 'MONTH') {
        pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]))
        pickerBodyChildren.push(this.genTable([
          this.monthGenTBody()
        ], value => this.tableDate = `${this.tableYear + value}`))
      } else if (this.activePicker === 'YEAR') {
        pickerBodyChildren.push(this.genYears())
      }

      return pickerBodyChildren
    },
    // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
    // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
    sanitizeDateString (dateString, type) {
      const [year, month, date] = dateString.split('-')
      return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
    },
    // For month = 12 it sets the tableDate to January next year
    // For month = -1 it sets the tableDate to December previous year
    // Otherwise it just changes the table month
    updateTableMonth (month /* -1..12 */) {
      if (month === 12) {
        this.tableDate = `${this.tableYear + 1}-01`
      } else if (month === -1) {
        this.tableDate = `${this.tableYear - 1}-12`
      } else {
        this.tableDate = `${this.tableYear}-${month + 1}`
      }
    }
  },

  created () {
    this.tableDate = this.type === 'month' ? `${this.year}` : `${this.year}-${this.month + 1}`
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
