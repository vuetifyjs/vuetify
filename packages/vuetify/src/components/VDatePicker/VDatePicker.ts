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
import isDateAllowed, { AllowedDateFunction } from './util/isDateAllowed'
import { consoleWarn } from '../../util/console'
import { daysInMonth } from '../VCalendar/util/timestamp'
import mixins from '../../util/mixins'

// Types
import { PropValidator } from 'vue/types/options'
import { DatePickerFormatter } from './util/createNativeLocaleFormatter'
import { VNode } from 'vue'

export type DateEventColorValue = string | string[]
export type DateEvents = string[] | ((date: string) => boolean | DateEventColorValue) | Record<string, DateEventColorValue>
export type DateEventColors = DateEventColorValue | Record<string, DateEventColorValue> | ((date: string) => DateEventColorValue)
type DatePickerValue = string | string[] | undefined
type DatePickerType = 'date' | 'month'
type DatePickerMultipleFormatter = (date: string[]) => string
interface Formatters {
  year: DatePickerFormatter
  titleDate: DatePickerFormatter | DatePickerMultipleFormatter
}

// Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
// 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
function sanitizeDateString (dateString: string, type: 'date' | 'month' | 'year'): string {
  const [year, month = 1, date = 1] = dateString.split('-')
  return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
}

export default mixins(
  Picker
/* @vue/component */
).extend({
  name: 'v-date-picker',

  props: {
    allowedDates: Function as PropValidator<AllowedDateFunction | undefined>,
    // Function formatting the day in date picker table
    dayFormat: Function as PropValidator<AllowedDateFunction | undefined>,
    disabled: Boolean,
    events: {
      type: [Array, Function, Object],
      default: () => null
    } as any as PropValidator<DateEvents>,
    eventColor: {
      type: [Array, Function, Object, String],
      default: () => 'warning'
    } as any as PropValidator<DateEventColors>,
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    // Function formatting the tableDate in the day/month table header
    headerDateFormat: Function as PropValidator<DatePickerFormatter | undefined>,
    locale: {
      type: String,
      default: 'en-us'
    },
    max: String,
    min: String,
    // Function formatting month in the months table
    monthFormat: Function as PropValidator<DatePickerFormatter | undefined>,
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
    showWeek: Boolean,
    // Function formatting currently selected date in the picker title
    titleDateFormat: Function as PropValidator<DatePickerFormatter | DatePickerMultipleFormatter | undefined>,
    type: {
      type: String,
      default: 'date',
      validator: (type: any) => ['date', 'month'].includes(type) // TODO: year
    } as any as PropValidator<DatePickerType>,
    value: [Array, String] as PropValidator<DatePickerValue>,
    weekdayFormat: Function as PropValidator<DatePickerFormatter | undefined>,
    // Function formatting the year in table header and pickup title
    yearFormat: Function as PropValidator<DatePickerFormatter | undefined>,
    yearIcon: String
  },

  data () {
    const now = new Date()
    return {
      activePicker: this.type.toUpperCase(),
      inputDay: null as number | null,
      inputMonth: null as number | null,
      inputYear: null as number | null,
      isReversing: false,
      now,
      // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
      tableDate: (() => {
        if (this.pickerDate) {
          return this.pickerDate
        }

        const date = (this.multiple ? (this.value as string[])[(this.value as string[]).length - 1] : this.value) ||
          `${now.getFullYear()}-${now.getMonth() + 1}`
        return sanitizeDateString(date as string, this.type === 'date' ? 'month' : 'year')
      })()
    }
  },

  computed: {
    lastValue (): string | null {
      return this.multiple ? (this.value as string[])[(this.value as string[]).length - 1] : (this.value as string | null)
    },
    selectedMonths (): string | string[] | undefined {
      if (!this.value || !this.value.length || this.type === 'month') {
        return this.value
      } else if (this.multiple) {
        return (this.value as string[]).map(val => val.substr(0, 7))
      } else {
        return (this.value as string).substr(0, 7)
      }
    },
    current (): string | null {
      if (this.showCurrent === true) {
        return sanitizeDateString(`${this.now.getFullYear()}-${this.now.getMonth() + 1}-${this.now.getDate()}`, this.type)
      }

      return this.showCurrent || null
    },
    inputDate (): string {
      return this.type === 'date'
        ? `${this.inputYear}-${pad(this.inputMonth! + 1)}-${pad(this.inputDay!)}`
        : `${this.inputYear}-${pad(this.inputMonth! + 1)}`
    },
    tableMonth (): number {
      return Number((this.pickerDate || this.tableDate).split('-')[1]) - 1
    },
    tableYear (): number {
      return Number((this.pickerDate || this.tableDate).split('-')[0])
    },
    minMonth (): string | null {
      return this.min ? sanitizeDateString(this.min, 'month') : null
    },
    maxMonth (): string | null {
      return this.max ? sanitizeDateString(this.max, 'month') : null
    },
    minYear (): string | null {
      return this.min ? sanitizeDateString(this.min, 'year') : null
    },
    maxYear (): string | null {
      return this.max ? sanitizeDateString(this.max, 'year') : null
    },
    formatters (): Formatters {
      return {
        year: this.yearFormat || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
        titleDate: this.titleDateFormat || (this.multiple ? this.defaultTitleMultipleDateFormatter : this.defaultTitleDateFormatter)
      }
    },
    defaultTitleMultipleDateFormatter (): DatePickerMultipleFormatter {
      if ((this.value as string[]).length < 2) {
        return dates => dates.length ? this.defaultTitleDateFormatter(dates[0]) : '0 selected'
      }

      return dates => `${dates.length} selected`
    },
    defaultTitleDateFormatter (): DatePickerFormatter {
      const titleFormats = {
        year: { year: 'numeric', timeZone: 'UTC' },
        month: { month: 'long', timeZone: 'UTC' },
        date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }
      }

      const titleDateFormatter = createNativeLocaleFormatter(this.locale, titleFormats[this.type], {
        start: 0,
        length: { date: 10, month: 7, year: 4 }[this.type]
      })

      const landscapeFormatter = (date: string) => titleDateFormatter(date)
        .replace(/([^\d\s])([\d])/g, (match, nonDigit, digit) => `${nonDigit} ${digit}`)
        .replace(', ', ',<br>')

      return this.landscape ? landscapeFormatter : titleDateFormatter
    }
  },

  watch: {
    tableDate (val: string, prev: string) {
      // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
      // compare for example '2000-9' and '2000-10'
      const sanitizeType = this.type === 'month' ? 'year' : 'month'
      this.isReversing = sanitizeDateString(val, sanitizeType) < sanitizeDateString(prev, sanitizeType)
      this.$emit('update:pickerDate', val)
    },
    pickerDate (val: string | null) {
      if (val) {
        this.tableDate = val
      } else if (this.lastValue && this.type === 'date') {
        this.tableDate = sanitizeDateString(this.lastValue, 'month')
      } else if (this.lastValue && this.type === 'month') {
        this.tableDate = sanitizeDateString(this.lastValue, 'year')
      }
    },
    value (newValue: DatePickerValue, oldValue: DatePickerValue) {
      this.checkMultipleProp()
      this.setInputDate()

      if (!this.multiple && this.value && !this.pickerDate) {
        this.tableDate = sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month')
      } else if (this.multiple && (this.value as string[]).length && !(oldValue as string[]).length && !this.pickerDate) {
        this.tableDate = sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month')
      }
    },
    type (type: DatePickerType) {
      this.activePicker = type.toUpperCase()

      if (this.value && this.value.length) {
        const output = (this.multiple ? (this.value as string[]) : [this.value as string])
          .map((val: string) => sanitizeDateString(val, type))
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
    emitInput (newInput: string) {
      const output = this.multiple
        ? (
          (this.value as string[]).indexOf(newInput) === -1
            ? (this.value as string[]).concat([newInput])
            : (this.value as string[]).filter(x => x !== newInput)
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
    isDateAllowed (value: string) {
      return isDateAllowed(value, this.min, this.max, this.allowedDates)
    },
    yearClick (value: number) {
      this.inputYear = value
      if (this.type === 'month') {
        this.tableDate = `${value}`
      } else {
        this.tableDate = `${value}-${pad((this.tableMonth || 0) + 1)}`
      }
      this.activePicker = 'MONTH'
      if (this.reactive && !this.readonly && !this.multiple && this.isDateAllowed(this.inputDate)) {
        this.$emit('input', this.inputDate)
      }
    },
    monthClick (value: string) {
      this.inputYear = parseInt(value.split('-')[0], 10)
      this.inputMonth = parseInt(value.split('-')[1], 10) - 1
      if (this.type === 'date') {
        if (this.inputDay) {
          this.inputDay = Math.min(this.inputDay, daysInMonth(this.inputYear, this.inputMonth + 1))
        }

        this.tableDate = value
        this.activePicker = 'DATE'
        if (this.reactive && !this.readonly && !this.multiple && this.isDateAllowed(this.inputDate)) {
          this.$emit('input', this.inputDate)
        }
      } else {
        this.emitInput(this.inputDate)
      }
    },
    dateClick (value: string) {
      this.inputYear = parseInt(value.split('-')[0], 10)
      this.inputMonth = parseInt(value.split('-')[1], 10) - 1
      this.inputDay = parseInt(value.split('-')[2], 10)
      this.emitInput(this.inputDate)
    },
    genPickerTitle () {
      return this.$createElement(VDatePickerTitle, {
        props: {
          date: this.value ? (this.formatters.titleDate as (value: any) => string)(this.value) : '',
          disabled: this.disabled,
          readonly: this.readonly,
          selectingYear: this.activePicker === 'YEAR',
          year: this.formatters.year(this.value ? `${this.inputYear}` : this.tableDate),
          yearIcon: this.yearIcon,
          value: this.multiple ? (this.value as string[])[0] : this.value
        },
        slot: 'title',
        on: {
          'update:selectingYear': (value: boolean) => this.activePicker = value ? 'YEAR' : this.type.toUpperCase()
        }
      })
    },
    genTableHeader () {
      return this.$createElement(VDatePickerHeader, {
        props: {
          nextIcon: this.nextIcon,
          color: this.color,
          dark: this.dark,
          disabled: this.disabled,
          format: this.headerDateFormat,
          light: this.light,
          locale: this.locale,
          min: this.activePicker === 'DATE' ? this.minMonth : this.minYear,
          max: this.activePicker === 'DATE' ? this.maxMonth : this.maxYear,
          prevIcon: this.prevIcon,
          readonly: this.readonly,
          value: this.activePicker === 'DATE' ? `${pad(this.tableYear, 4)}-${pad(this.tableMonth + 1)}` : `${pad(this.tableYear, 4)}`
        },
        on: {
          toggle: () => this.activePicker = (this.activePicker === 'DATE' ? 'MONTH' : 'YEAR'),
          input: (value: string) => this.tableDate = value
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
          disabled: this.disabled,
          events: this.events,
          eventColor: this.eventColor,
          firstDayOfWeek: this.firstDayOfWeek,
          format: this.dayFormat,
          light: this.light,
          locale: this.locale,
          min: this.min,
          max: this.max,
          readonly: this.readonly,
          scrollable: this.scrollable,
          showWeek: this.showWeek,
          tableDate: `${pad(this.tableYear, 4)}-${pad(this.tableMonth + 1)}`,
          value: this.value,
          weekdayFormat: this.weekdayFormat
        },
        ref: 'table',
        on: {
          input: this.dateClick,
          tableDate: (value: string) => this.tableDate = value,
          'click:date': (value: string) => this.$emit('click:date', value),
          'dblclick:date': (value: string) => this.$emit('dblclick:date', value)
        }
      })
    },
    genMonthTable () {
      return this.$createElement(VDatePickerMonthTable, {
        props: {
          allowedDates: this.type === 'month' ? this.allowedDates : null,
          color: this.color,
          current: this.current ? sanitizeDateString(this.current, 'month') : null,
          dark: this.dark,
          disabled: this.disabled,
          events: this.type === 'month' ? this.events : null,
          eventColor: this.type === 'month' ? this.eventColor : null,
          format: this.monthFormat,
          light: this.light,
          locale: this.locale,
          min: this.minMonth,
          max: this.maxMonth,
          readonly: this.readonly && this.type === 'month',
          scrollable: this.scrollable,
          value: this.selectedMonths,
          tableDate: `${pad(this.tableYear, 4)}`
        },
        ref: 'table',
        on: {
          input: this.monthClick,
          tableDate: (value: string) => this.tableDate = value,
          'click:month': (value: string) => this.$emit('click:month', value),
          'dblclick:month': (value: string) => this.$emit('dblclick:month', value)
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
          value: this.tableYear
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
        key: this.activePicker
      }, children)
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

  render (): VNode {
    return this.genPicker('v-picker--date')
  }
})
