import './VDatePickerHeader.sass'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Localable from '../../mixins/localable'
import Themeable from '../../mixins/themeable'

// Utils
import { monthChange } from './util'
import mixins from '../../util/mixins'

// Types
import { VNode, PropType } from 'vue'
import { DatePickerFormatter, DatePickerType } from 'types'
import { DatePickerEnum } from './VDate'

export default mixins(
  Colorable,
  Localable,
  Themeable
/* @vue/component */
).extend({
  name: 'v-date-picker-header',

  inheritAttrs: false,

  props: {
    disabled: Boolean,
    yearFormat: Function as PropType<DatePickerFormatter>,
    monthFormat: Function as PropType<DatePickerFormatter>,
    min: String,
    max: String,
    nextIcon: {
      type: String,
      default: '$next',
    },
    prevIcon: {
      type: String,
      default: '$prev',
    },
    readonly: Boolean,
    /** value is string formatted as year-month (e.g. 2005-11) */
    value: {
      type: String,
      required: true,
    },
    activePicker: String as PropType<DatePickerType>,
  },

  data () {
    return {
      isReversing: false,
    }
  },

  computed: {
    isMonthPicker (): boolean {
      return this.activePicker === DatePickerEnum.Month
    },
    isDatePicker (): boolean {
      return this.activePicker === DatePickerEnum.Date
    },
    formatter (): DatePickerFormatter {
      const fn = (v: string) => v
      switch (this.activePicker) {
        case DatePickerEnum.Date: return this.monthFormat || fn
        case DatePickerEnum.Month: return this.yearFormat || fn
        default: return fn
      }
    },
  },

  watch: {
    value (newVal, oldVal) {
      this.isReversing = newVal < oldVal
    },
  },

  methods: {
    genBtn (change: number) {
      const newDate = this.calculateChange(this.value, change, this.activePicker)
      const disabled = this.disabled ||
        (change < 0 && this.min && newDate < this.min) ||
        (change > 0 && this.max && newDate > this.max)

      return this.$createElement(VBtn, {
        props: {
          dark: this.dark,
          disabled,
          icon: true,
          small: true,
          light: this.light,
        },
        nativeOn: {
          click: (e: Event) => {
            e.stopPropagation()
            this.$emit(`update:pickerDate`, newDate)
          },
        },
      }, [
        this.$createElement(VIcon, ((change < 0) === !this.$vuetify.rtl) ? this.prevIcon : this.nextIcon),
      ])
    },
    calculateChange (value: string, sign: number, activePicker: DatePickerType) {
      const [year] = value.split('-').map(Number)

      switch (activePicker) {
        case DatePickerEnum.Date: return monthChange(value, sign)
        case DatePickerEnum.Month: return `${year + sign}`
        default: return value
      }
    },
    genHeader () {
      const color = !this.disabled && (this.color || 'accent')
      const header = this.$createElement('div', this.setTextColor(color, {
        key: this.value,
      }), [this.$createElement('button', {
        attrs: {
          type: 'button',
        },
        on: {
          click: () => this.$emit('update:activePicker', this.isDatePicker ? DatePickerEnum.Month : DatePickerEnum.Year),
        },
      }, [this.$slots.default || this.formatter(this.value)])])

      const transition = this.$createElement('transition', {
        props: {
          name: (this.isReversing === !this.$vuetify.rtl) ? 'tab-reverse-transition' : 'tab-transition',
        },
      }, [header])

      return this.$createElement('div', {
        staticClass: 'v-date-picker-header__value',
        class: {
          'v-date-picker-header__value--disabled': this.disabled,
        },
      }, [transition])
    },
  },

  render (): VNode {
    return this.$createElement('div', {
      staticClass: 'v-date-picker-header',
      class: {
        'v-date-picker-header--disabled': this.disabled,
        ...this.themeClasses,
      },
    }, [
      this.genBtn(-1),
      this.genHeader(),
      this.genBtn(+1),
    ])
  },
})
