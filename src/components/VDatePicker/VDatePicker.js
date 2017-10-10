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

const createNativeLocaleFormatter = (format, fallbackType) => (dateString, locale) => {
  const [year, month, date] = dateString.trim().split(' ')[0].split('-')
  const dateObject = new Date(`${year}-${month || 1}-${date || 1} GMT+0`)

  if (dateObject.toLocaleDateString) {
    return dateObject.toLocaleDateString(locale, Object.assign(format, {
      timeZone: 'UTC'
    }))
  } else {
    const pad = n => n < 10 ? `0${n}` : `${n}`
    const isoString = `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`
    return isoString.substr(0, { date: 10, month: 7, year: 4 }[fallbackType])
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
    return {
      activePicker: this.type.toUpperCase(),
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      isReversing: false,
      originalDate: this.value,
      tableDate: this.sanitizeDateString(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, this.type === 'month' ? 'year' : 'month'),
      yearFormat: createNativeLocaleFormatter({ year: 'numeric' }, 'year')
    }
  },

  props: {
    allowedDates: {
      type: [Array, Object, Function],
      default: () => (null)
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    headerDateFormat: {
      type: Function,
      default: createNativeLocaleFormatter({ month: 'long', year: 'numeric' }, 'month')
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    monthFormat: {
      type: Function,
      default: createNativeLocaleFormatter({ month: 'short' }, 'month')
    },
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
    weekDays () {
      const first = parseInt(this.firstDayOfWeek, 10)
      if (!Date.prototype.toLocaleDateString) {
        return createRange(7).map(i => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7])
      }

      const date = new Date('2000-01-07 GMT+0')
      const day = date.getUTCDate() - date.getUTCDay() + first
      const format = { weekday: 'narrow', timeZone: 'UTC' }
      return createRange(7).map(i => new Date(`2000-01-${day + i} GMT+0`).toLocaleDateString(this.locale, format))
    },
    firstAllowedDate () {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()

      if (this.allowedDates) {
        for (let date = 1; date <= 31; date++) {
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
        for (let month = 0; month < 12; month++) {
          const dateString = `${year}-${month + 1}`
          const sanitizedDateString = this.sanitizeDateString(dateString, 'month')
          if (this.isAllowed(sanitizedDateString)) {
            return sanitizedDateString
          }
        }
      }

      return this.sanitizeDateString(`${year}-${now.getMonth() + 1}`, 'month')
    },
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
      const pad = n => n < 10 ? `0${n}` : `${n}`
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
      if (val) {
        this.tableDate = this.sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month')
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
        ], value => {
          const newMonth = this.tableMonth + value
          if (newMonth === 12) {
            this.tableDate = this.sanitizeDateString(`${this.tableYear + 1}-01`, 'month')
          } else if (newMonth === -1) {
            this.tableDate = this.sanitizeDateString(`${this.tableYear - 1}-12`, 'month')
          } else {
            this.tableDate = this.sanitizeDateString(`${this.tableYear}-${newMonth + 1}`, 'month')
          }
        }))
      } else if (this.activePicker === 'MONTH') {
        pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]))
        pickerBodyChildren.push(this.genTable([
          this.monthGenTBody()
        ], value => this.tableDate = this.sanitizeDateString(`${this.tableYear + value}`, 'year')))
      } else if (this.activePicker === 'YEAR') {
        pickerBodyChildren.push(this.genYears())
      }

      return pickerBodyChildren
    },
    sanitizeDateString (dateString, type) {
      const [year, month, date] = dateString.split('-')
      const pad = n => (n * 1 < 10) ? `0${n * 1}` : `${n}`
      return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
    }
  },

  created () {
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
