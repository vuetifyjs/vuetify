// Components
import VTimePickerTitle from './VTimePickerTitle'
import VTimePickerClock from './VTimePickerClock'

// Mixins
import Picker from '../../mixins/picker'

// Utils
import { createRange } from '../../util/helpers'
import pad from '../VDatePicker/util/pad'

const rangeHours24 = createRange(24)
const rangeHours12am = createRange(12)
const rangeHours12pm = rangeHours12am.map(v => v + 12)
const rangeMinutes = createRange(60)

/* @vue/component */
export default {
  name: 'v-time-picker',

  mixins: [Picker],

  props: {
    allowedHours: Function,
    allowedMinutes: Function,
    format: {
      type: String,
      default: 'ampm',
      validator (val) {
        return ['ampm', '24hr'].includes(val)
      }
    },
    min: String,
    max: String,
    readonly: Boolean,
    scrollable: Boolean,
    value: null
  },

  data () {
    return {
      inputHour: null,
      inputMinute: null,
      period: 'am',
      selectingHour: true
    }
  },

  computed: {
    isAllowedHourCb () {
      if (!this.min && !this.max) return this.allowedHours

      const minHour = this.min ? this.min.split(':')[0] : 0
      const maxHour = this.max ? this.max.split(':')[0] : 23

      return val => {
        return val >= minHour * 1 &&
          val <= maxHour * 1 &&
          (!this.allowedHours || this.allowedHours(val))
      }
    },
    isAllowedMinuteCb () {
      const isHourAllowed = !this.allowedHours || this.allowedHours(this.inputHour)
      if (!this.min && !this.max) {
        return isHourAllowed ? this.allowedMinutes : () => false
      }

      const [minHour, minMinute] = this.min ? this.min.split(':') : [0, 0]
      const [maxHour, maxMinute] = this.max ? this.max.split(':') : [23, 59]
      const minTime = minHour * 60 + minMinute * 1
      const maxTime = maxHour * 60 + maxMinute * 1

      return val => {
        const time = 60 * this.inputHour + val
        return time >= minTime &&
          time <= maxTime &&
          isHourAllowed &&
          (!this.allowedMinutes || this.allowedMinutes(val))
      }
    },
    isAmPm () {
      return this.format === 'ampm'
    }
  },

  watch: {
    value: 'setInputData'
  },

  mounted () {
    this.setInputData(this.value)
  },

  methods: {
    emitValue () {
      if (this.inputHour != null && this.inputMinute != null) {
        this.$emit('input', `${pad(this.inputHour)}:${pad(this.inputMinute)}`)
      }
    },
    setPeriod (period) {
      this.period = period
      if (this.inputHour != null) {
        const newHour = this.inputHour + (period === 'am' ? -12 : 12)
        this.inputHour = this.firstAllowed('hour', newHour)
        this.emitValue()
      }
    },
    setInputData (value) {
      if (value == null) {
        this.inputHour = null
        this.inputMinute = null
        return
      }

      if (value instanceof Date) {
        this.inputHour = value.getHours()
        this.inputMinute = value.getMinutes()
      } else {
        const [, hour, minute, , period] = value.trim().toLowerCase().match(/^(\d+):(\d+)(:\d+)?([ap]m)?$/, '') || []

        this.inputHour = period ? this.convert12to24(parseInt(hour, 10), period) : parseInt(hour, 10)
        this.inputMinute = parseInt(minute, 10)
      }

      this.period = this.inputHour < 12 ? 'am' : 'pm'
    },
    convert24to12 (hour) {
      return hour ? ((hour - 1) % 12 + 1) : 12
    },
    convert12to24 (hour, period) {
      return hour % 12 + (period === 'pm' ? 12 : 0)
    },
    onInput (value) {
      if (this.selectingHour) {
        this.inputHour = this.isAmPm ? this.convert12to24(value, this.period) : value
      } else {
        this.inputMinute = value
      }
      this.emitValue()
    },
    onChange () {
      if (!this.selectingHour) {
        this.$emit('change', this.value)
      } else {
        this.selectingHour = false
      }
    },
    firstAllowed (type, value) {
      const allowedFn = type === 'hour' ? this.isAllowedHourCb : this.isAllowedMinuteCb
      if (!allowedFn) return value

      // TODO: clean up
      const range = type === 'minute'
        ? rangeMinutes
        : (this.isAmPm
          ? (value < 12
            ? rangeHours12am
            : rangeHours12pm)
          : rangeHours24)
      const first = range.find(v => allowedFn((v + value) % range.length + range[0]))
      return ((first || 0) + value) % range.length + range[0]
    },
    genClock () {
      return this.$createElement(VTimePickerClock, {
        props: {
          allowedValues: this.selectingHour ? this.isAllowedHourCb : this.isAllowedMinuteCb,
          color: this.color,
          dark: this.dark,
          double: this.selectingHour && !this.isAmPm,
          format: this.selectingHour ? (this.isAmPm ? this.convert24to12 : val => val) : val => pad(val, 2),
          light: this.light,
          max: this.selectingHour ? (this.isAmPm && this.period === 'am' ? 11 : 23) : 59,
          min: this.selectingHour && this.isAmPm && this.period === 'pm' ? 12 : 0,
          readonly: this.readonly,
          scrollable: this.scrollable,
          size: this.width - ((!this.fullWidth && this.landscape) ? 80 : 20),
          step: this.selectingHour ? 1 : 5,
          value: this.selectingHour ? this.inputHour : this.inputMinute
        },
        on: {
          input: this.onInput,
          change: this.onChange
        },
        ref: 'clock'
      })
    },
    genPickerBody () {
      return this.$createElement('div', {
        staticClass: 'v-time-picker-clock__container',
        style: {
          width: `${this.width}px`,
          height: `${this.width - ((!this.fullWidth && this.landscape) ? 60 : 0)}px`
        },
        key: this.selectingHour
      }, [this.genClock()])
    },
    genPickerTitle () {
      return this.$createElement(VTimePickerTitle, {
        props: {
          ampm: this.isAmPm,
          hour: this.inputHour,
          minute: this.inputMinute,
          period: this.period,
          readonly: this.readonly,
          selectingHour: this.selectingHour
        },
        on: {
          'update:selectingHour': value => (this.selectingHour = value),
          'update:period': this.setPeriod
        },
        ref: 'title',
        slot: 'title'
      })
    }
  },

  render () {
    return this.genPicker('v-picker--time')
  }
}
