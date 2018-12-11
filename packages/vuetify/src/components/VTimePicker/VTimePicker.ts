// Components
import VTimePickerTitle from './VTimePickerTitle'
import VTimePickerClock from './VTimePickerClock'

// Mixins
import Picker from '../../mixins/picker'

// Utils
import { createRange } from '../../util/helpers'
import pad from '../VDatePicker/util/pad'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

const rangeHours24 = createRange(24)
const rangeHours12am = createRange(12)
const rangeHours12pm = rangeHours12am.map(v => v + 12)
const range60 = createRange(60)
const selectingTimes = { hour: 1, minute: 2, second: 3 }
export { selectingTimes }

type Period = 'am' | 'pm'

export default mixins(
  Picker
/* @vue/component */
).extend({
  name: 'v-time-picker',

  mixins: [Picker],

  props: {
    allowedHours: Function,
    allowedMinutes: Function,
    allowedSeconds: Function,
    disabled: Boolean,
    format: {
      type: String,
      default: 'ampm',
      validator (val) {
        return ['ampm', '24hr'].includes(val)
      }
    } as PropValidator<'ampm' | '24hr'>,
    min: String,
    max: String,
    readonly: Boolean,
    scrollable: Boolean,
    useSeconds: Boolean,
    value: null as any as PropValidator<any>
  },

  data () {
    return {
      inputHour: null as number | null,
      inputMinute: null as number | null,
      inputSecond: null as number | null,
      lazyInputHour: null as number | null,
      lazyInputMinute: null as number | null,
      lazyInputSecond: null as number | null,
      period: 'am' as Period,
      selecting: selectingTimes.hour
    }
  },

  computed: {
    selectingHour: {
      get () {
        return this.selecting === selectingTimes.hour
      },
      set (v: boolean) {
        this.selecting = selectingTimes.hour
      }
    },
    selectingMinute: {
      get () {
        return this.selecting === selectingTimes.minute
      },
      set (v: boolean) {
        this.selecting = selectingTimes.minute
      }
    },
    selectingSecond: {
      get () {
        return this.selecting === selectingTimes.second
      },
      set (v: boolean) {
        this.selecting = selectingTimes.second
      }
    },
    isAllowedHourCb () {
      if (!this.min && !this.max) return this.allowedHours

      const minHour = this.min ? Number(this.min.split(':')[0]) : 0
      const maxHour = this.max ? Number(this.max.split(':')[0]) : 23

      return (val: number) => {
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

      const [minHour, minMinute] = this.min ? this.min.split(':').map(Number) : [0, 0]
      const [maxHour, maxMinute] = this.max ? this.max.split(':').map(Number) : [23, 59]
      const minTime = minHour * 60 + minMinute * 1
      const maxTime = maxHour * 60 + maxMinute * 1

      return (val: number) => {
        const time = 60 * this.inputHour! + val
        return time >= minTime &&
          time <= maxTime &&
          isHourAllowed &&
          (!this.allowedMinutes || this.allowedMinutes(val))
      }
    },
    isAllowedSecondCb () {
      const isHourAllowed = !this.allowedHours || this.allowedHours(this.inputHour)
      const isMinuteAllowed = !this.allowedMinutes || this.allowedMinutes(this.inputMinute)
      if (!this.min && !this.max) {
        return isHourAllowed && isMinuteAllowed ? this.allowedSeconds : () => false
      }

      const [minHour, minMinute, minSecond] = this.min ? this.min.split(':').map(Number) : [0, 0, 0]
      const [maxHour, maxMinute, maxSecond] = this.max ? this.max.split(':').map(Number) : [23, 59, 59]
      const minTime = minHour * 3600 + minMinute * 60 + (minSecond || 0) * 1
      const maxTime = maxHour * 3600 + maxMinute * 60 + (maxSecond || 0) * 1

      return (val: number) => {
        const time = 3600 * this.inputHour! + 60 * this.inputMinute! + val
        return time >= minTime &&
          time <= maxTime &&
          isHourAllowed && isMinuteAllowed &&
          (!this.allowedSeconds || this.allowedSeconds(val))
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
    genValue () {
      if (this.inputHour != null && this.inputMinute != null && (!this.useSeconds || this.inputSecond != null)) {
        return `${pad(this.inputHour)}:${pad(this.inputMinute)}` + (this.useSeconds ? `:${pad(this.inputSecond)}` : '')
      }

      return null
    },
    emitValue () {
      const value = this.genValue()
      if (value !== null) this.$emit('input', value)
    },
    setPeriod (period: Period) {
      this.period = period
      if (this.inputHour != null) {
        const newHour = this.inputHour! + (period === 'am' ? -12 : 12)
        this.inputHour = this.firstAllowed('hour', newHour)
        this.emitValue()
      }
    },
    setInputData (value: string | null | Date) {
      if (value == null || value === '') {
        this.inputHour = null
        this.inputMinute = null
        this.inputSecond = null
      } else if (value instanceof Date) {
        this.inputHour = value.getHours()
        this.inputMinute = value.getMinutes()
        this.inputSecond = value.getSeconds()
      } else {
        const [, hour, minute, , second, period] = value.trim().toLowerCase().match(/^(\d+):(\d+)(:(\d+))?([ap]m)?$/) || new Array(6)

        this.inputHour = period ? this.convert12to24(parseInt(hour, 10), period as Period) : parseInt(hour, 10)
        this.inputMinute = parseInt(minute, 10)
        this.inputSecond = parseInt(second || 0, 10)
      }

      this.period = (this.inputHour == null || this.inputHour < 12) ? 'am' : 'pm'
    },
    convert24to12 (hour: number) {
      return hour ? ((hour - 1) % 12 + 1) : 12
    },
    convert12to24 (hour: number, period: Period) {
      return hour % 12 + (period === 'pm' ? 12 : 0)
    },
    onInput (value: number) {
      if (this.selecting === selectingTimes.hour) {
        this.inputHour = this.isAmPm ? this.convert12to24(value, this.period) : value
      } else if (this.selecting === selectingTimes.minute) {
        this.inputMinute = value
      } else {
        this.inputSecond = value
      }
      this.emitValue()
    },
    onChange () {
      if (this.selecting === selectingTimes.hour) {
        this.selecting = selectingTimes.minute
      } else if (this.useSeconds && this.selecting === selectingTimes.minute) {
        this.selecting = selectingTimes.second
      }

      if (this.inputHour === this.lazyInputHour &&
        this.inputMinute === this.lazyInputMinute &&
        (!this.useSeconds || this.inputSecond === this.lazyInputSecond)
      ) return

      const value = this.genValue()
      if (value === null) return

      this.lazyInputHour = this.inputHour
      this.lazyInputMinute = this.inputMinute
      this.useSeconds && (this.lazyInputSecond = this.inputSecond)
      this.$emit('change', value)
    },
    firstAllowed (type: 'hour' | 'minute' | 'second', value: number) {
      const allowedFn = type === 'hour' ? this.isAllowedHourCb : (type === 'minute' ? this.isAllowedMinuteCb : this.isAllowedSecondCb)
      if (!allowedFn) return value

      // TODO: clean up
      const range = type === 'minute'
        ? range60
        : (type === 'second'
          ? range60
          : (this.isAmPm
            ? (value < 12
              ? rangeHours12am
              : rangeHours12pm)
            : rangeHours24))
      const first = range.find(v => allowedFn((v + value) % range.length + range[0]))
      return ((first || 0) + value) % range.length + range[0]
    },
    genClock () {
      return this.$createElement(VTimePickerClock, {
        props: {
          allowedValues:
            this.selecting === selectingTimes.hour
              ? this.isAllowedHourCb
              : (this.selecting === selectingTimes.minute
                ? this.isAllowedMinuteCb
                : this.isAllowedSecondCb),
          color: this.color,
          dark: this.dark,
          disabled: this.disabled,
          double: this.selecting === selectingTimes.hour && !this.isAmPm,
          format: this.selecting === selectingTimes.hour
            ? (this.isAmPm ? this.convert24to12 : (val: number) => val)
            : (val: number) => pad(val, 2),
          light: this.light,
          max: this.selecting === selectingTimes.hour ? (this.isAmPm && this.period === 'am' ? 11 : 23) : 59,
          min: this.selecting === selectingTimes.hour && this.isAmPm && this.period === 'pm' ? 12 : 0,
          readonly: this.readonly,
          scrollable: this.scrollable,
          size: Number(this.width) - ((!this.fullWidth && this.landscape) ? 80 : 20),
          step: this.selecting === selectingTimes.hour ? 1 : 5,
          value: this.selecting === selectingTimes.hour
            ? this.inputHour
            : (this.selecting === selectingTimes.minute
              ? this.inputMinute
              : this.inputSecond)
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
        key: this.selecting
      }, [this.genClock()])
    },
    genPickerTitle () {
      return this.$createElement(VTimePickerTitle, {
        props: {
          ampm: this.isAmPm,
          disabled: this.disabled,
          hour: this.inputHour,
          minute: this.inputMinute,
          second: this.inputSecond,
          period: this.period,
          readonly: this.readonly,
          useSeconds: this.useSeconds,
          selecting: this.selecting
        },
        on: {
          'update:selecting': (value: number) => (this.selecting = value),
          'update:period': this.setPeriod
        },
        ref: 'title',
        slot: 'title'
      })
    }
  },

  render (): VNode {
    return this.genPicker('v-picker--time')
  }
})
