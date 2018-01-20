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

export default {
  name: 'v-time-picker',

  components: {
    VTimePickerTitle,
    VTimePickerClock
  },

  mixins: [Picker],

  data () {
    const { inputHour, inputMinute } = this.getInputTime(this.value)

    return {
      inputHour,
      inputMinute,
      selectingHour: true
    }
  },

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
    scrollable: Boolean,
    value: null
  },

  computed: {
    isAllowedHourCb () {
      if (!this.min && !this.max) return this.allowedHours

      const minHour = this.min ? this.min.split(':')[0] : 0
      const maxHour = this.max ? this.max.split(':')[0] : 23

      return val => {
        return val >= minHour * 1
          && val <= maxHour * 1
          && (!this.allowedHours || this.allowedHours(val))
      }
    },
    isAllowedMinuteCb () {
      if (!this.min && !this.max) return this.allowedHours

      const [minHour, minMinute] = this.min ? this.min.split(':') : [0, 0]
      const [maxHour, maxMinute] = this.max ? this.max.split(':') : [23, 59]
      const minTime = minHour * 60 + minMinute * 1
      const maxTime = maxHour * 60 + maxMinute * 1
      const isHourAllowed = !this.allowedHours || this.allowedHours(this.hour)

      return val => {
        const time = 60 * this.hour + val
        return time >= minTime
          && time <= maxTime
          && isHourAllowed
          && (!this.allowedMinutes || this.allowedMinutes(val))
      }
    },
    hour: {
      get () {
        return this.inputHour == null ? this.firstAllowed('hour', new Date().getHours()) : this.inputHour
      },
      set (value) {
        this.inputHour = value
      }
    },
    minute: {
      get () {
        return this.inputMinute == null ? this.firstAllowed('minute', new Date().getMinutes()) : this.inputMinute
      },
      set (value) {
        this.inputMinute = value
      }
    },
    period: {
      get () {
        return this.hour < 12 ? 'am' : 'pm'
      },
      set (val) {
        const newHour = this.hour + (val === 'am' ? -12 : 12)
        this.hour = this.firstAllowed('hour', newHour)
      }
    },
    isAmPm () {
      return this.format === 'ampm'
    }
  },

  watch: {
    value (value) {
      const { inputHour, inputMinute } = this.getInputTime(value)
      this.inputHour = inputHour
      this.inputMinute = inputMinute
    },
    inputHour (val) {
      this.$emit('input', `${pad(this.hour)}:${pad(this.minute)}`)
    },
    inputMinute (val) {
      this.$emit('input', `${pad(this.hour)}:${pad(this.minute)}`)
    }
  },

  methods: {
    getInputTime (value) {
      if (value instanceof Date) {
        return {
          inputHour: value.getHours(),
          inputMinute: value.getMinutes()
        }
      }

      if (value) {
        const [, hour, minute, , period] = value.trim().toLowerCase().match(/^(\d+):(\d+)(:\d+)?([ap]m)?$/, '') || []

        return {
          inputMinute: parseInt(minute, 10),
          inputHour: period ? this.convert12to24(parseInt(hour, 10), period) : parseInt(hour, 10)
        }
      }

      return {}
    },
    convert24to12 (hour) {
      return hour ? ((hour - 1) % 12 + 1) : 12
    },
    convert12to24 (hour, period) {
      return hour % 12 + (period === 'pm' ? 12 : 0)
    },
    onInput (value) {
      if (!this.selectingHour) {
        this.minute = value
      } else {
        this.hour = this.isAmPm ? this.convert12to24(value, this.period) : value
      }
    },
    onChange () {
      if (!this.selectingHour) {
        this.$emit('change', this.value)
      }

      this.selectingHour = !this.selectingHour
    },
    firstAllowed (type, value) {
      const allowedFn = type === 'hour' ? this.isAllowedHourCb : this.isAllowedMinuteCb
      if (!allowedFn) return value

      const range = type === 'minute'
        ? rangeMinutes :
        (this.isAmPm
          ? (value < 12
            ? rangeHours12am
            : rangeHours12pm)
          : rangeHours24)
      const first = range.find(v => allowedFn((v + value) % range.length + range[0]))
      return ((first || 0) + value) % range.length + range[0]
    },
    genClock () {
      return this.$createElement('v-time-picker-clock', {
        props: {
          allowedValues: this.selectingHour ? this.isAllowedHourCb : this.isAllowedMinuteCb,
          color: this.color,
          dark: this.dark,
          double: this.selectingHour && !this.isAmPm,
          format: this.selectingHour ? (this.isAmPm ? this.convert24to12 : val => val) : val => pad(val, 2),
          max: this.selectingHour ? (this.isAmPm && this.period === 'am' ? 11 : 23) : 59,
          min: this.selectingHour && this.isAmPm && this.period === 'pm' ? 12 : 0,
          scrollable: this.scrollable,
          size: this.width - ((!this.fullWidth && this.landscape) ? 80 : 20),
          step: this.selectingHour ? 1 : 5,
          value: this.selectingHour ? this.hour : this.minute
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
        staticClass: 'time-picker-clock__container',
        style: {
          width: `${this.width}px`,
          height: `${this.width - ((!this.fullWidth && this.landscape) ? 60 : 0)}px`
        },
        key: this.selectingHour
      }, [this.genClock()])
    },
    genPickerTitle () {
      return this.$createElement('v-time-picker-title', {
        props: {
          ampm: this.isAmPm,
          value: pad(this.hour) + ':' + pad(this.minute),
          selectingHour: this.selectingHour
        },
        on: {
          'update:selectingHour': value => (this.selectingHour = value),
          'update:period': value => (this.period = value)
        },
        ref: 'title',
        slot: 'title'
      })
    }
  },

  render (h) {
    return this.genPicker('picker--time')
  }
}
