// Mixins
import Localable from '../../mixins/localable'

// Utils
import { pad, createNativeLocaleFormatter } from './util'
import isDateAllowed from './util/isDateAllowed'
import { consoleWarn } from '../../util/console'
import mixins from '../../util/mixins'

// Types
import { VNode, PropType } from 'vue'
import { wrapInArray } from '../../util/helpers'
import { DatePickerFormatter, DatePickerTitleDateFormatter, DatePickerType, DatePickerValue, DatePickerAllowedDatesFunction } from 'types'

export interface VDateFormatters {
  yearFormat: DatePickerFormatter
  titleDateFormat: DatePickerTitleDateFormatter
  landscapeTitleDateFormat: DatePickerTitleDateFormatter
  headerDateFormat: DatePickerFormatter
  dayFormat: DatePickerFormatter
  monthFormat: DatePickerFormatter
  weekdayFormat: DatePickerFormatter
}

// Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
// 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
function sanitizeDateString (dateString: string, type: 'date' | 'month' | 'year'): string {
  const [year, month = 1, date = 1] = dateString.split('-')
  return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
}

export const enum DatePickerEnum {
  Date = 'date',
  Month = 'month',
  Year = 'year'
}

export interface VDateScopedProps extends VDateFormatters {
  currentDate: string
  showCurrent: boolean
  dateClick: Function
  monthClick: Function
  yearClick: Function
  value: string[]
  activePicker: DatePickerType
  updateActivePicker: Function
  pickerDate: string
  updatePickerDate: Function
  multiple: boolean
  type: DatePickerType
}

export const VDateProps = {
  yearFormat: {
    type: Function as PropType<DatePickerFormatter>,
  },
  titleDateFormat: {
    type: Function as PropType<DatePickerTitleDateFormatter>,
  },
  headerDateFormat: {
    type: Function as PropType<DatePickerFormatter>,
  },
  // TODO: breaking change to dateFormat?
  dayFormat: {
    type: Function as PropType<DatePickerFormatter>,
  },
  weekdayFormat: {
    type: Function as PropType<DatePickerFormatter>,
  },
  monthFormat: {
    type: Function as PropType<DatePickerFormatter>,
  },
  activePicker: String as PropType<DatePickerType>,
  allowedDates: Function as PropType<DatePickerAllowedDatesFunction | undefined>,
  showCurrent: [Boolean, String] as PropType<boolean | string>,
  max: String,
  min: String,
  multiple: Boolean,
  range: Boolean,
  pickerDate: String,
  value: [Array, String] as PropType<DatePickerValue>,
  selectedItemsText: {
    type: String,
    default: '$vuetify.datePicker.itemsSelected',
  },
  type: {
    type: String,
    default: 'date',
    validator: (type: any) => ['month', 'date', 'year'].includes(type), // TODO: add year
  } as any as PropType<DatePickerType>,
  reactive: Boolean, // TODO: This should really be called something else
}

export default mixins(
  Localable
/* @vue/component */
).extend({
  name: 'v-date',

  inheritAttrs: false,

  props: {
    ...VDateProps,
  },

  data () {
    const firstDate = this.value && wrapInArray(this.value)[0]
    const currentDate = typeof this.showCurrent === 'string' ? this.showCurrent : new Date().toISOString()
    const now = sanitizeDateString(currentDate, 'date')
    const internalPickerDate = sanitizeDateString(this.pickerDate || firstDate || now, this.type === 'month' ? 'year' : 'month')

    return {
      now,
      internalPickerDate,
      internalDate: this.value ? wrapInArray(this.value).map(date => sanitizeDateString(date, this.type)) : [],
      internalActivePicker: (this.activePicker || this.type) as DatePickerType,
    }
  },

  computed: {
    isMultiple (): boolean {
      return this.multiple || this.range
    },
    lastPickedValue (): string | null {
      return this.internalDate.length ? this.internalDate[this.internalDate.length - 1] : null
    },
    computedFormatters (): VDateFormatters {
      return {
        yearFormat: this.yearFormat || createNativeLocaleFormatter(this.currentLocale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
        titleDateFormat: this.titleDateFormat || this.defaultTitleDateFormatter,
        landscapeTitleDateFormat: /* this.landscapeTitleDateFormat  || */this.defaultLandscapeTitleDate,
        weekdayFormat: this.weekdayFormat || createNativeLocaleFormatter(this.currentLocale, { weekday: 'narrow', timeZone: 'UTC' }) || (v => v),
        dayFormat: this.dayFormat || createNativeLocaleFormatter(this.currentLocale, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 }) || (v => v),
        headerDateFormat: this.headerDateFormat || createNativeLocaleFormatter(this.currentLocale, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 }),
        monthFormat: this.monthFormat || createNativeLocaleFormatter(this.currentLocale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 }),
      }
    },
    defaultTitleDateFormatter (): DatePickerTitleDateFormatter {
      const titleFormats = {
        year: { year: 'numeric', timeZone: 'UTC' },
        month: { month: 'long', timeZone: 'UTC' },
        date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' },
      }

      const substrOptions = { date: 10, month: 7, year: 4 }

      const titleDateFormatter = createNativeLocaleFormatter(this.currentLocale, titleFormats[this.type], {
        start: 0,
        length: substrOptions[this.type],
      })

      return (date: string | string[], type: string): string => {
        if (this.multiple || this.range) {
          return date.length === 1 ? titleDateFormatter(date[0]) : this.$vuetify.lang.t(this.selectedItemsText, date.length)
        } else if (type === 'month') {
          return date.length && date[0].split('-').length === 2 ? titleDateFormatter(date[0]) : '-'
        } else {
          return date.length && date[0].split('-').length === 3 ? titleDateFormatter(date[0]) : '-'
        }
      }
    },
    defaultLandscapeTitleDate (): DatePickerTitleDateFormatter {
      return (date: string | string[], type: string) => this.defaultTitleDateFormatter(date, type)
        .replace(/([^\d\s])([\d])/g, (match, nonDigit, digit) => `${nonDigit} ${digit}`)
        .replace(', ', ',<br>')
    },
    scopedSlotProps (): VDateScopedProps {
      return {
        showCurrent: this.showCurrent !== false,
        currentDate: this.now,
        dateClick: this.dateClick,
        monthClick: this.monthClick,
        yearClick: this.yearClick,
        value: this.internalDate,
        activePicker: this.internalActivePicker,
        updateActivePicker: this.updateActivePicker,
        pickerDate: this.internalPickerDate,
        updatePickerDate: this.updatePickerDate,
        multiple: this.multiple,
        type: this.type,
        ...this.computedFormatters,
      }
    },
  },

  watch: {
    internalPickerDate (val: string, prev: string) {
      // TODO: What was isReversing used for??
      // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
      // compare for example '2000-9' and '2000-10'
      // const sanitizeType = this.type === 'month' ? 'year' : 'month'
      // this.isReversing = sanitizeDateString(val, sanitizeType) < sanitizeDateString(prev, sanitizeType)
      this.$emit('update:pickerDate', val)
    },
    pickerDate (val: string | null) {
      if (val) {
        this.internalPickerDate = val
      } else if (this.lastPickedValue) {
        this.internalPickerDate = sanitizeDateString(this.lastPickedValue, DatePickerEnum.Month)
      }
    },
    value (newValue: DatePickerValue, oldValue: DatePickerValue) {
      this.checkMultipleProp()

      if (newValue) {
        const arr = wrapInArray(newValue)

        if (!arr.every(this.isDateAllowed)) return

        this.internalDate = arr

        if (!this.pickerDate && this.lastPickedValue) {
          const type = this.type === DatePickerEnum.Month ? DatePickerEnum.Year : DatePickerEnum.Month
          this.internalPickerDate = sanitizeDateString(this.lastPickedValue, type)
        }
      }
    },
    type (type: DatePickerType) {
      this.internalActivePicker = type

      // If we're switching type then we need to reformat current values
      // e.g. 2019-05-01 => 2019-05 when going from date to month
      if (this.internalDate.length) {
        this.internalDate = this.internalDate.map(date => sanitizeDateString(date, type)).filter(this.isDateAllowed)
        this.emitInput()
      }
    },
    activePicker (activePicker: DatePickerType) {
      this.internalActivePicker = activePicker
    },
  },

  created () {
    this.checkMultipleProp()
  },

  methods: {
    updateActivePicker (type: DatePickerType) {
      this.internalActivePicker = type
      this.$emit('update:activePicker', type)
    },
    updatePickerDate (date: string) {
      this.internalPickerDate = date
    },
    emitInput (emitChange = true) {
      if (!this.internalDate.length) return

      const value = this.isMultiple ? this.internalDate : this.internalDate[0]

      this.$emit('input', value)

      emitChange && !this.multiple && this.$emit('change', value)
    },
    checkMultipleProp () {
      if (this.value == null) return
      const valueType = this.value.constructor.name
      const expected = this.isMultiple ? 'Array' : 'String'
      if (valueType !== expected) {
        consoleWarn(`Value must be ${this.multiple ? 'an' : 'a'} ${expected}, got ${valueType}`, this)
      }
    },
    isDateAllowed (value: string): boolean {
      return isDateAllowed(value, this.min, this.max, this.allowedDates)
    },
    yearClick (value: string) {
      if (this.type !== 'year') {
        this.internalPickerDate = value
        this.internalActivePicker = DatePickerEnum.Month

        this.reactive && this.updateInternalDate(value, false)
      } else {
        this.updateInternalDate(value)
      }
    },
    monthClick (value: string) {
      if (this.type === DatePickerEnum.Date) {
        this.internalPickerDate = value
        this.internalActivePicker = DatePickerEnum.Date

        this.reactive && this.updateInternalDate(value, false)
      } else {
        this.updateInternalDate(value)
      }
    },
    dateClick (value: string) {
      this.updateInternalDate(value)
    },
    updateInternalDate (value: string, emitChange = true) {
      if (this.range) {
        this.internalDate.length === 2
          ? this.internalDate = [value]
          : this.internalDate.push(value)

        this.internalDate.sort()
      } else if (this.internalDate.includes(value)) {
        this.internalDate = this.internalDate.filter(d => d !== value)
      } else if (this.multiple) {
        this.internalDate.push(value)
        this.internalDate.sort()
      } else {
        this.internalDate = [value]
      }

      this.emitInput(emitChange)
    },
  },

  render (): VNode {
    return this.$scopedSlots.default!(this.scopedSlotProps) as any
  },
})
