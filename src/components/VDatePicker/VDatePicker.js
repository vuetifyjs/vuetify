import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import VBtn from '../VBtn'
import VCard from '../VCard'
import VIcon from '../VIcon'
import VPicker from '../VPicker'
import VDatePickerTitle from './VDatePickerTitle'
import VDatePickerHeader from './VDatePickerHeader'
import VDatePickerDateTable from './VDatePickerDateTable'
import VDatePickerMonthTable from './VDatePickerMonthTable'
import VDatePickerYears from './VDatePickerYears'

import { pad, createNativeLocaleFormatter } from './util'
import isValueAllowed from '../../util/isValueAllowed'

export default {
  name: 'v-date-picker',

  components: {
    VBtn,
    VCard,
    VIcon,
    VPicker,
    VDatePickerTitle,
    VDatePickerHeader,
    VDatePickerDateTable,
    VDatePickerMonthTable,
    VDatePickerYears
  },

  mixins: [Colorable, Themeable],

  data () {
    const now = new Date()
    return {
      defaultColor: 'accent',
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
      default: () => null
    },
    autosave: Boolean,
    // Function formatting the day in date picker table
    dayFormat: {
      type: Function,
      default: null
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    // Function formatting the tableDate in the day/month table header
    headerDateFormat: {
      type: Function,
      default: null
    },
    landscape: Boolean,
    locale: {
      type: String,
      default: 'en-us'
    },
    // Function formatting month in the months table
    monthFormat: {
      type: Function,
      default: null
    },
    noTitle: Boolean,
    scrollable: Boolean,
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
      default: null
    },
    yearIcon: String
  },

  computed: {
    firstAllowedDate () {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()

      if (this.allowedDates) {
        for (let date = 1; date <= 31; date++) {
          const dateString = `${year}-${month + 1}-${date}`
          if (isNaN(new Date(dateString).getDate())) break

          const sanitizedDateString = this.sanitizeDateString(dateString, 'date')
          if (isValueAllowed(sanitizedDateString, this.allowedDates)) {
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
          const dateString = `${year}-${pad(month + 1)}`
          if (isValueAllowed(dateString, this.allowedDates)) {
            return dateString
          }
        }
      }

      return `${year}-${pad(now.getMonth() + 1)}`
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
    formatters () {
      return {
        year: this.yearFormat || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
        titleDate: this.titleDateFormat || this.defaultTitleDateFormatter
      }
    },
    defaultTitleDateFormatter () {
      const titleFormats = {
        year: { year: 'numeric', timeZone: 'UTC' },
        month: { month: 'long', timeZone: 'UTC' },
        date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }
      }

      const titleDateFormatter = createNativeLocaleFormatter(this.locale, titleFormats[this.type], {
        start: 0,
        length: { date: 10, month: 7, year: 4 }[this.type]
      })

      const landscapeFormatter = date => titleDateFormatter(date)
        .replace(/([^\d\s])([\d])/g, (match, nonDigit, digit) => `${nonDigit} ${digit}`)
        .replace(', ', ',<br>')

      return this.landscape ? landscapeFormatter : titleDateFormatter
    }
  },

  watch: {
    tableDate (val, prev) {
      // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
      // compare for example '2000-9' and '2000-10'
      const sanitizeType = this.type === 'month' ? 'year' : 'month'
      this.isReversing = this.sanitizeDateString(val, sanitizeType) < this.sanitizeDateString(prev, sanitizeType)
    },
    value (val) {
      val && this.setTableDate()
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
    setTableDate () {
      this.tableDate = this.type === 'month' ? `${this.year}` : `${this.year}-${pad(this.month + 1)}`
    },
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
    yearClick (value) {
      if (this.type === 'month') {
        const date = `${value}-${pad(this.month + 1)}`
        if (isValueAllowed(date, this.allowedDates)) this.inputDate = date
        this.tableDate = `${value}`
      } else {
        const date = `${value}-${pad(this.tableMonth + 1)}-${pad(this.day)}`
        if (isValueAllowed(date, this.allowedDates)) this.inputDate = date
        this.tableDate = `${value}-${pad(this.tableMonth + 1)}`
      }
      this.activePicker = 'MONTH'
    },
    monthClick (value) {
      // Updates inputDate setting 'YYYY-MM' or 'YYYY-MM-DD' format, depending on the picker type
      if (this.type === 'date') {
        const date = `${value}-${pad(this.day)}`
        if (isValueAllowed(date, this.allowedDates)) this.inputDate = date
        this.tableDate = value
        this.activePicker = 'DATE'
      } else {
        this.inputDate = value
        this.$nextTick(() => (this.autosave && this.save()))
      }
    },
    dateClick (value) {
      this.inputDate = value
      this.$nextTick(() => (this.autosave && this.save()))
    },
    genTitle () {
      return this.$createElement('v-date-picker-title', {
        props: {
          date: this.formatters.titleDate(this.inputDate),
          year: this.formatters.year(`${this.year}`),
          yearIcon: this.yearIcon,
          value: this.activePicker === 'YEAR'
        },
        slot: 'title',
        on: {
          input: value => this.activePicker = value ? 'YEAR' : this.type.toUpperCase()
        }
      })
    },
    genActions () {
      return this.$scopedSlots.default ? this.$createElement('div', {
        staticClass: 'card__actions',
        slot: 'actions'
      }, [this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      })]) : null
    },
    genTableHeader () {
      return this.$createElement('v-date-picker-header', {
        props: {
          color: this.color,
          format: this.headerDateFormat,
          locale: this.locale,
          value: this.activePicker === 'DATE' ? this.tableDate : `${this.tableYear}`
        },
        on: {
          toggle: () => this.activePicker = (this.activePicker === 'DATE' ? 'MONTH' : 'YEAR'),
          input: value => this.tableDate = value
        }
      })
    },
    genDateTable () {
      return this.$createElement('v-date-picker-date-table', {
        props: {
          allowedDates: this.allowedDates,
          color: this.color,
          firstDayOfWeek: this.firstDayOfWeek,
          format: this.dayFormat,
          locale: this.locale,
          tableDate: this.tableDate,
          scrollable: this.scrollable,
          value: this.value
        },
        ref: 'table',
        on: {
          input: this.dateClick,
          tableDate: value => this.tableDate = value
        }
      })
    },
    genMonthTable () {
      return this.$createElement('v-date-picker-month-table', {
        props: {
          allowedDates: this.type === 'MONTH' ? this.allowedDates : null,
          color: this.color,
          format: this.monthFormat,
          locale: this.locale,
          scrollable: this.scrollable,
          value: (!this.value || this.type === 'MONTH') ? this.value : this.value.substr(0, 7),
          tableDate: `${this.tableYear}`
        },
        ref: 'table',
        on: {
          input: this.monthClick,
          tableDate: value => this.tableDate = value
        }
      })
    },
    genYears () {
      return this.$createElement('v-date-picker-years', {
        props: {
          color: this.color,
          format: this.yearFormat,
          locale: this.locale,
          value: `${this.tableYear}`
        },
        on: {
          input: this.yearClick
        }
      })
    },
    genBody () {
      return this.activePicker === 'YEAR' ? [this.genYears()] : [
        this.genTableHeader(),
        this.activePicker === 'DATE' ? this.genDateTable() : this.genMonthTable()
      ]
    },
    // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
    // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
    sanitizeDateString (dateString, type) {
      const [year, month, date] = dateString.split('-')
      return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
    }
  },

  created () {
    this.setTableDate()
  },

  mounted () {
    const date = new Date()
    this.currentDay = date.getDate()
    this.currentMonth = date.getMonth()
    this.currentYear = date.getFullYear()
  },

  render (h) {
    return h('v-picker', {
      staticClass: 'picker--date',
      props: {
        landscape: this.landscape,
        dark: this.dark,
        light: this.light,
        color: this.headerColor
      }
    }, [
      this.noTitle ? null : this.genTitle(),
      h('div', { key: this.activePicker }, this.genBody()),
      this.genActions()
    ])
  }
}
