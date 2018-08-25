// Components
import VDatePickerTitle from './VDatePickerTitle'
import VDatePickerHeader from './VDatePickerHeader'
import VDatePickerDateTable from './VDatePickerDateTable'
import VDatePickerMonthTable from './VDatePickerMonthTable'
import VDatePickerYears from './VDatePickerYears'

// Mixins
import Picker from '../../mixins/picker'

// Utils
import { pad, createNativeLocaleFormatter } from './util'
import isDateAllowed from './util/isDateAllowed'
import { consoleWarn } from '../../util/console'

/* @vue/component */
export default {
  name: 'v-date-picker',

  mixins: [Picker],

  props: {
    allowedDates: Function,
    // Function formatting the day in date picker table
    dayFormat: {
      type: Function,
      default: null
    },
    events: {
      type: [Array, Object, Function],
      default: () => null
    },
    eventColor: {
      type: [String, Function, Object],
      default: 'warning'
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
    locale: {
      type: String,
      default: 'en-us'
    },
    max: String,
    min: String,
    // Function formatting month in the months table
    monthFormat: {
      type: Function,
      default: null
    },
    multiple: Boolean,
    nextIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    pickerDate: String,
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    reactive: Boolean,
    readonly: Boolean,
    scrollable: Boolean,
    showCurrent: {
      type: [Boolean, String],
      default: true
    },
    // Function formatting currently selected date in the picker title
    titleDateFormat: {
      type: Function,
      default: null
    },
    type: {
      type: String,
      default: 'date',
      validator: type => ['date', 'month'].includes(type) // TODO: year
    },
    value: [Array, String],
    // Function formatting the year in table header and pickup title
    yearFormat: {
      type: Function,
      default: null
    },
    yearIcon: String
  },

  data () {
    const now = new Date()
    return {
      activePicker: this.type.toUpperCase(),
      inputDay: null,
      inputMonth: null,
      inputYear: null,
      isReversing: false,
      now,
      // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
      tableDate: (() => {
        if (this.pickerDate) {
          return this.pickerDate
        }

        const date = (this.multiple ? this.value[this.value.length - 1] : this.value) ||
          `${now.getFullYear()}-${now.getMonth() + 1}`
        const type = this.type === 'date' ? 'month' : 'year'
        return this.sanitizeDateString(date, type)
      })()
    }
  },

  computed: {
    lastValue () {
      return this.multiple ? this.value[this.value.length - 1] : this.value
    },
    selectedMonths () {
      if (!this.value || !this.value.length || this.type === 'month') {
        return this.value
      } else if (this.multiple) {
        return this.value.map(val => val.substr(0, 7))
      } else {
        return this.value.substr(0, 7)
      }
    },
    current () {
      if (this.showCurrent === true) {
        return this.sanitizeDateString(`${this.now.getFullYear()}-${this.now.getMonth() + 1}-${this.now.getDate()}`, this.type)
      }

      return this.showCurrent || null
    },
    inputDate () {
      return this.type === 'date'
        ? `${this.inputYear}-${pad(this.inputMonth + 1)}-${pad(this.inputDay)}`
        : `${this.inputYear}-${pad(this.inputMonth + 1)}`
    },
    tableMonth () {
      return (this.pickerDate || this.tableDate).split('-')[1] - 1
    },
    tableYear () {
      return (this.pickerDate || this.tableDate).split('-')[0] * 1
    },
    minMonth () {
      return this.min ? this.sanitizeDateString(this.min, 'month') : null
    },
    maxMonth () {
      return this.max ? this.sanitizeDateString(this.max, 'month') : null
    },
    minYear () {
      return this.min ? this.sanitizeDateString(this.min, 'year') : null
    },
    maxYear () {
      return this.max ? this.sanitizeDateString(this.max, 'year') : null
    },
    formatters () {
      return {
        year: this.yearFormat || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
        titleDate: this.titleDateFormat || (this.multiple ? this.defaultTitleMultipleDateFormatter : this.defaultTitleDateFormatter)
      }
    },
    defaultTitleMultipleDateFormatter () {
      if (this.value.length < 2) {
        return dates => dates.length ? this.defaultTitleDateFormatter(dates[0]) : '0 selected'
      }

      return dates => `${dates.length} selected`
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
      this.$emit('update:pickerDate', val)
    },
    pickerDate (val) {
      if (val) {
        this.tableDate = val
      } else if (this.lastValue && this.type === 'date') {
        this.tableDate = this.sanitizeDateString(this.lastValue, 'month')
      } else if (this.lastValue && this.type === 'month') {
        this.tableDate = this.sanitizeDateString(this.lastValue, 'year')
      }
    },
    value (newValue, oldValue) {
      this.checkMultipleProp()
      this.setInputDate()

      if (!this.multiple && this.value && !this.pickerDate) {
        this.tableDate = this.sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month')
      } else if (this.multiple && this.value.length && !oldValue.length && !this.pickerDate) {
        this.tableDate = this.sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month')
      }
    },
    type (type) {
      this.activePicker = type.toUpperCase()

      if (this.value && this.value.length) {
        const output = (this.multiple ? this.value : [this.value])
          .map(val => this.sanitizeDateString(val, type))
          .filter(this.isDateAllowed)
        this.$emit('input', this.multiple ? output : output[0])
      }
    }
  },

  created () {
    this.checkMultipleProp()

    if (this.pickerDate !== this.tableDate) {
      this.$emit('update:pickerDate', this.tableDate)
    }
    this.setInputDate()
  },

  methods: {
    emitInput (newInput) {
      const output = this.multiple
        ? (
          this.value.indexOf(newInput) === -1
            ? this.value.concat([newInput])
            : this.value.filter(x => x !== newInput)
        )
        : newInput

      this.$emit('input', output)
      this.multiple || this.$emit('change', newInput)
    },
    checkMultipleProp () {
      if (this.value == null) return
      const valueType = this.value.constructor.name
      const expected = this.multiple ? 'Array' : 'String'
      if (valueType !== expected) {
        consoleWarn(`Value must be ${this.multiple ? 'an' : 'a'} ${expected}, got ${valueType}`, this)
      }
    },
    isDateAllowed (value) {
      return isDateAllowed(value, this.min, this.max, this.allowedDates)
    },
    yearClick (value) {
      this.inputYear = value
      if (this.type === 'month') {
        this.tableDate = `${value}`
      } else {
        this.tableDate = `${value}-${pad(this.tableMonth + 1)}`
      }
      this.activePicker = 'MONTH'
      this.reactive && !this.multiple && this.isDateAllowed(this.inputDate) && this.$emit('input', this.inputDate)
    },
    monthClick (value) {
      this.inputYear = parseInt(value.split('-')[0], 10)
      this.inputMonth = parseInt(value.split('-')[1], 10) - 1
      if (this.type === 'date') {
        this.tableDate = value
        this.activePicker = 'DATE'
        this.reactive && !this.multiple && this.isDateAllowed(this.inputDate) && this.$emit('input', this.inputDate)
      } else {
        this.emitInput(this.inputDate)
      }
    },
    dateClick (value) {
      this.inputYear = parseInt(value.split('-')[0], 10)
      this.inputMonth = parseInt(value.split('-')[1], 10) - 1
      this.inputDay = parseInt(value.split('-')[2], 10)
      this.emitInput(this.inputDate)
    },
    genPickerTitle () {
      return this.$createElement(VDatePickerTitle, {
        props: {
          date: this.value ? this.formatters.titleDate(this.value) : '',
          selectingYear: this.activePicker === 'YEAR',
          year: this.formatters.year(`${this.inputYear}`),
          yearIcon: this.yearIcon,
          value: this.multiple ? this.value[0] : this.value
        },
        slot: 'title',
        style: this.readonly ? {
          'pointer-events': 'none'
        } : undefined,
        on: {
          'update:selectingYear': value => this.activePicker = value ? 'YEAR' : this.type.toUpperCase()
        }
      })
    },
    genTableHeader () {
      return this.$createElement(VDatePickerHeader, {
        props: {
          nextIcon: this.nextIcon,
          color: this.color,
          dark: this.dark,
          disabled: this.readonly,
          format: this.headerDateFormat,
          light: this.light,
          locale: this.locale,
          min: this.activePicker === 'DATE' ? this.minMonth : this.minYear,
          max: this.activePicker === 'DATE' ? this.maxMonth : this.maxYear,
          prevIcon: this.prevIcon,
          value: this.activePicker === 'DATE' ? `${this.tableYear}-${pad(this.tableMonth + 1)}` : `${this.tableYear}`
        },
        on: {
          toggle: () => this.activePicker = (this.activePicker === 'DATE' ? 'MONTH' : 'YEAR'),
          input: value => this.tableDate = value
        }
      })
    },
    genDateTable () {
      return this.$createElement(VDatePickerDateTable, {
        props: {
          allowedDates: this.allowedDates,
          color: this.color,
          current: this.current,
          dark: this.dark,
          disabled: this.readonly,
          events: this.events,
          eventColor: this.eventColor,
          firstDayOfWeek: this.firstDayOfWeek,
          format: this.dayFormat,
          light: this.light,
          locale: this.locale,
          min: this.min,
          max: this.max,
          tableDate: `${this.tableYear}-${pad(this.tableMonth + 1)}`,
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
      return this.$createElement(VDatePickerMonthTable, {
        props: {
          allowedDates: this.type === 'month' ? this.allowedDates : null,
          color: this.color,
          current: this.current ? this.sanitizeDateString(this.current, 'month') : null,
          dark: this.dark,
          disabled: this.readonly,
          format: this.monthFormat,
          light: this.light,
          locale: this.locale,
          min: this.minMonth,
          max: this.maxMonth,
          scrollable: this.scrollable,
          value: this.selectedMonths,
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
      return this.$createElement(VDatePickerYears, {
        props: {
          color: this.color,
          format: this.yearFormat,
          locale: this.locale,
          min: this.minYear,
          max: this.maxYear,
          value: `${this.tableYear}`
        },
        on: {
          input: this.yearClick
        }
      })
    },
    genPickerBody () {
      const children = this.activePicker === 'YEAR' ? [
        this.genYears()
      ] : [
        this.genTableHeader(),
        this.activePicker === 'DATE' ? this.genDateTable() : this.genMonthTable()
      ]

      return this.$createElement('div', {
        key: this.activePicker,
        style: this.readonly ? {
          'pointer-events': 'none'
        } : undefined
      }, children)
    },
    // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
    // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
    sanitizeDateString (dateString, type) {
      const [year, month = 1, date = 1] = dateString.split('-')
      return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
    },
    setInputDate () {
      if (this.lastValue) {
        const array = this.lastValue.split('-')
        this.inputYear = parseInt(array[0], 10)
        this.inputMonth = parseInt(array[1], 10) - 1
        if (this.type === 'date') {
          this.inputDay = parseInt(array[2], 10)
        }
      } else {
        this.inputYear = this.inputYear || this.now.getFullYear()
        this.inputMonth = this.inputMonth == null ? this.inputMonth : this.now.getMonth()
        this.inputDay = this.inputDay || this.now.getDate()
      }
    }
  },

  render () {
    return this.genPicker('v-picker--date')
  }
}
