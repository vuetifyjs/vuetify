// Components
import VDatePickerHeader from './VDatePickerHeader'
import VDatePickerDateTable from './VDatePickerDateTable'
import VDatePickerMonthTable from './VDatePickerMonthTable'
import VDatePickerYears from './VDatePickerYears'
import { VDateProps, DatePickerEnum } from './VDate'

// Mixins
import mixins from '../../util/mixins'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Localable from '../../mixins/localable'

// Utils
import { pad } from './util'

// Types
import { VNode, VNodeChildren, PropType } from 'vue'
import { DateEvents, DateEventColors, DatePickerType } from 'types'
import { PropValidator } from 'vue/types/options'

// Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
// 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
function sanitizeDateString (dateString: string, type: 'date' | 'month' | 'year'): string {
  const [year, month = 1, date = 1] = dateString.split('-')
  return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
}

export const VDatePickerBodyProps = {
  disabled: Boolean,
  events: {
    type: [Array, Function, Object],
    default: () => null,
  } as any as PropValidator<DateEvents>,
  eventColor: {
    type: [Array, Function, Object, String],
    default: () => 'warning',
  } as any as PropValidator<DateEventColors>,
  nextIcon: {
    type: String,
    default: '$next',
  },
  pickerDate: String,
  prevIcon: {
    type: String,
    default: '$prev',
  },
  firstDayOfWeek: {
    type: [String, Number],
    default: 0,
  },
  readonly: Boolean,
  scrollable: Boolean,
  showWeek: Boolean,
  yearIcon: String,
}

export default mixins(
  Colorable,
  Themeable,
  Localable
/* @vue/component */
).extend({
  name: 'v-date-picker-body',

  inheritAttrs: false,

  props: {
    ...VDatePickerBodyProps,
    ...VDateProps,
    currentDate: String,
    value: Array as PropType<string[]>,
    activePicker: String as PropType<DatePickerType>,
  },

  computed: {
    minMonth (): string | null {
      return this.min ? sanitizeDateString(this.min, DatePickerEnum.Month) : null
    },
    maxMonth (): string | null {
      return this.max ? sanitizeDateString(this.max, DatePickerEnum.Month) : null
    },
    minYear (): string | null {
      return this.min ? sanitizeDateString(this.min, DatePickerEnum.Year) : null
    },
    maxYear (): string | null {
      return this.max ? sanitizeDateString(this.max, DatePickerEnum.Year) : null
    },
    tableYear (): number {
      return this.pickerDate ? parseInt(this.pickerDate.split('-')[0], 10) : 0
    },
    tableMonth (): number {
      return this.pickerDate ? parseInt(this.pickerDate.split('-')[1], 10) - 1 : 0
    },
    isDatePicker (): boolean {
      return this.activePicker === DatePickerEnum.Date
    },
    isMonthPicker (): boolean {
      return this.activePicker === DatePickerEnum.Month
    },
    currentMonth (): string | null {
      return sanitizeDateString(this.currentDate, DatePickerEnum.Month)
    },
    selectedMonths (): string | string[] | undefined {
      // if (!this.value || !this.value.length || this.activePicker === PickerType.Month) {
      //   return this.value
      // } else if (this.multiple) {
      //   return (this.value as string[]).map(val => val.substr(0, 7))
      // } else {
      //   return (this.value as string).substr(0, 7)
      // }
      return this.value.map(val => val.substr(0, 7))
    },
    selectedYears (): string[] {
      return this.value.map(date => date.substr(0, 4))
    },
  },

  methods: {
    genTableHeader () {
      return this.$createElement(VDatePickerHeader, {
        props: {
          nextIcon: this.nextIcon,
          color: this.color,
          dark: this.dark,
          disabled: this.disabled,
          yearFormat: this.yearFormat,
          monthFormat: this.headerDateFormat,
          light: this.light,
          locale: this.locale,
          min: this.isDatePicker ? this.minMonth : this.minYear,
          max: this.isDatePicker ? this.maxMonth : this.maxYear,
          prevIcon: this.prevIcon,
          readonly: this.readonly,
          activePicker: this.activePicker,
          value: this.pickerDate,
        },
        on: {
          'update:activePicker': (picker: DatePickerType) => this.$emit('update:activePicker', picker/* this.isDateType ? PickerType.Month : PickerType.Year */),
          'update:pickerDate': (date: string) => this.$emit('update:pickerDate', date),
        },
      })
    },
    genDateTable () {
      return this.$createElement(VDatePickerDateTable, {
        props: {
          allowedDates: this.allowedDates,
          color: this.color,
          showCurrent: this.showCurrent,
          currentDate: this.currentDate,
          dark: this.dark,
          disabled: this.disabled,
          events: this.events,
          eventColor: this.eventColor,
          firstDayOfWeek: this.firstDayOfWeek,
          weekdayFormat: this.weekdayFormat,
          dayFormat: this.dayFormat,
          light: this.light,
          locale: this.locale,
          min: this.min,
          max: this.max,
          readonly: this.readonly,
          scrollable: this.scrollable,
          showWeek: this.showWeek,
          pickerDate: this.pickerDate,
          range: this.range,
          value: this.value,
        },
        on: {
          input: (date: number) => this.$emit('update:date', date),
          'update:pickerDate': (value: string) => this.$emit('update:pickerDate', value),
          'click:date': (value: string) => this.$emit('click:date', value),
          'dblclick:date': (value: string) => this.$emit('dblclick:date', value),
        },
      })
    },
    genMonthTable () {
      return this.$createElement(VDatePickerMonthTable, {
        props: {
          allowedDates: this.allowedDates,
          color: this.color,
          showCurrent: this.showCurrent,
          currentDate: this.currentDate,
          dark: this.dark,
          disabled: this.disabled,
          events: this.events,
          eventColor: this.eventColor,
          dayFormat: this.monthFormat,
          light: this.light,
          locale: this.locale,
          min: this.minMonth,
          max: this.maxMonth,
          readonly: this.readonly,
          scrollable: this.scrollable,
          value: this.selectedMonths,
          pickerDate: this.pickerDate,
        },
        on: {
          'update:month': (month: number) => this.$emit('update:month', month),
          'update:pickerDate': (value: string) => this.$emit('update:pickerDate', value),
          'click:month': (value: string) => this.$emit('click:month', value),
          'dblclick:month': (value: string) => this.$emit('dblclick:month', value),
        },
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
          value: this.selectedYears,
        },
        on: {
          input: (year: number) => this.$emit('update:year', year),
        },
      })
    },
    genMonths () {
      return [
        this.genTableHeader(),
        this.genMonthTable(),
      ]
    },
    genDates () {
      return [
        this.genTableHeader(),
        this.genDateTable(),
      ]
    },
  },

  render (h): VNode {
    let children: VNodeChildren = []

    switch (this.activePicker) {
      case DatePickerEnum.Year: children = [this.genYears()]; break
      case DatePickerEnum.Month: children = this.genMonths(); break
      case DatePickerEnum.Date: children = this.genDates(); break
    }

    return h('div', children)
  },
})
