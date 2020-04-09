// Components
import VTimePickerTitle from './VTimePickerTitle'
import VTimePickerClock from './VTimePickerClock'

// Mixins
import Picker from '../../mixins/picker'
import PickerButton from '../../mixins/picker-button'

// Utils
import { createRange } from '../../util/helpers'
import pad from '../VDatePicker/util/pad'
import mixins from '../../util/mixins'

// Types
import { VNode, PropType } from 'vue'
import { SelectingTimes } from './SelectingTimes'

const rangeHours24 = createRange(24)
const rangeHours12am = createRange(12)
const rangeHours12pm = rangeHours12am.map(v => v + 12)
const range60 = createRange(60)
const selectingNames = { 1: 'hour', 2: 'minute', 3: 'second' }
export { SelectingTimes }

type Period = 'am' | 'pm'
type AllowFunction = (val: number) => boolean

export default mixins(
  Picker,
  PickerButton
/* @vue/component */
).extend({
  name: 'v-time-picker',

  props: {
    allowedHours: [Function, Array] as PropType<AllowFunction | number[]>,
    allowedMinutes: [Function, Array] as PropType<AllowFunction | number[]>,
    allowedSeconds: [Function, Array] as PropType<AllowFunction | number[]>,
    disabled: Boolean,
    format: {
      type: String as PropType<'ampm' | '24hr'>,
      default: 'ampm',
      validator (val) {
        return ['ampm', '24hr'].includes(val)
      },
    },
    min: String,
    max: String,
    readonly: Boolean,
    scrollable: Boolean,
    useSeconds: Boolean,
    value: null as any as PropType<any>,
    ampmInTitle: Boolean,
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
      selecting: SelectingTimes.Hour,
    }
  },

  computed: {
    selectingHour: {
      get (): boolean {
        return this.selecting === SelectingTimes.Hour
      },
      set (v: boolean) {
        this.selecting = SelectingTimes.Hour
      },
    },
    selectingMinute: {
      get (): boolean {
        return this.selecting === SelectingTimes.Minute
      },
      set (v: boolean) {
        this.selecting = SelectingTimes.Minute
      },
    },
    selectingSecond: {
      get (): boolean {
        return this.selecting === SelectingTimes.Second
      },
      set (v: boolean) {
        this.selecting = SelectingTimes.Second
      },
    },
    isAllowedHourCb (): AllowFunction {
      let cb: AllowFunction

      if (this.allowedHours instanceof Array) {
        cb = (val: number) => (this.allowedHours as number[]).includes(val)
      } else {
        cb = this.allowedHours
      }

      if (!this.min && !this.max) return cb

      const minHour = this.min ? Number(this.min.split(':')[0]) : 0
      const maxHour = this.max ? Number(this.max.split(':')[0]) : 23

      return (val: number) => {
        return val >= minHour * 1 &&
          val <= maxHour * 1 &&
          (!cb || cb(val))
      }
    },
    isAllowedMinuteCb (): AllowFunction {
      let cb: AllowFunction

      const isHourAllowed = !this.isAllowedHourCb || this.inputHour === null || this.isAllowedHourCb(this.inputHour)
      if (this.allowedMinutes instanceof Array) {
        cb = (val: number) => (this.allowedMinutes as number[]).includes(val)
      } else {
        cb = this.allowedMinutes
      }

      if (!this.min && !this.max) {
        return isHourAllowed ? cb : () => false
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
          (!cb || cb(val))
      }
    },
    isAllowedSecondCb (): AllowFunction {
      let cb: AllowFunction

      const isHourAllowed = !this.isAllowedHourCb || this.inputHour === null || this.isAllowedHourCb(this.inputHour)
      const isMinuteAllowed = isHourAllowed &&
        (!this.isAllowedMinuteCb ||
          this.inputMinute === null ||
          this.isAllowedMinuteCb(this.inputMinute)
        )

      if (this.allowedSeconds instanceof Array) {
        cb = (val: number) => (this.allowedSeconds as number[]).includes(val)
      } else {
        cb = this.allowedSeconds
      }

      if (!this.min && !this.max) {
        return isMinuteAllowed ? cb : () => false
      }

      const [minHour, minMinute, minSecond] = this.min ? this.min.split(':').map(Number) : [0, 0, 0]
      const [maxHour, maxMinute, maxSecond] = this.max ? this.max.split(':').map(Number) : [23, 59, 59]
      const minTime = minHour * 3600 + minMinute * 60 + (minSecond || 0) * 1
      const maxTime = maxHour * 3600 + maxMinute * 60 + (maxSecond || 0) * 1

      return (val: number) => {
        const time = 3600 * this.inputHour! + 60 * this.inputMinute! + val
        return time >= minTime &&
          time <= maxTime &&
          isMinuteAllowed &&
          (!cb || cb(val))
      }
    },
    isAmPm (): boolean {
      return this.format === 'ampm'
    },
  },

  watch: {
    value: 'setInputData',
  },

  mounted () {
    this.setInputData(this.value)
    this.$on('update:period', this.setPeriod)
  },

  methods: {
    genValue () {
      if (this.inputHour != null && this.inputMinute != null && (!this.useSeconds || this.inputSecond != null)) {
        return `${pad(this.inputHour)}:${pad(this.inputMinute)}` + (this.useSeconds ? `:${pad(this.inputSecond!)}` : '')
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
      if (this.selecting === SelectingTimes.Hour) {
        this.inputHour = this.isAmPm ? this.convert12to24(value, this.period) : value
      } else if (this.selecting === SelectingTimes.Minute) {
        this.inputMinute = value
      } else {
        this.inputSecond = value
      }
      this.emitValue()
    },
    onChange (value: number) {
      this.$emit(`click:${selectingNames[this.selecting]}`, value)

      const emitChange = this.selecting === (this.useSeconds ? SelectingTimes.Second : SelectingTimes.Minute)

      if (this.selecting === SelectingTimes.Hour) {
        this.selecting = SelectingTimes.Minute
      } else if (this.useSeconds && this.selecting === SelectingTimes.Minute) {
        this.selecting = SelectingTimes.Second
      }

      if (this.inputHour === this.lazyInputHour &&
        this.inputMinute === this.lazyInputMinute &&
        (!this.useSeconds || this.inputSecond === this.lazyInputSecond)
      ) return

      const time = this.genValue()
      if (time === null) return

      this.lazyInputHour = this.inputHour
      this.lazyInputMinute = this.inputMinute
      this.useSeconds && (this.lazyInputSecond = this.inputSecond)

      emitChange && this.$emit('change', time)
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
            this.selecting === SelectingTimes.Hour
              ? this.isAllowedHourCb
              : (this.selecting === SelectingTimes.Minute
                ? this.isAllowedMinuteCb
                : this.isAllowedSecondCb),
          color: this.color,
          dark: this.dark,
          disabled: this.disabled,
          double: this.selecting === SelectingTimes.Hour && !this.isAmPm,
          format: this.selecting === SelectingTimes.Hour
            ? (this.isAmPm ? this.convert24to12 : (val: number) => val)
            : (val: number) => pad(val, 2),
          light: this.light,
          max: this.selecting === SelectingTimes.Hour ? (this.isAmPm && this.period === 'am' ? 11 : 23) : 59,
          min: this.selecting === SelectingTimes.Hour && this.isAmPm && this.period === 'pm' ? 12 : 0,
          readonly: this.readonly,
          scrollable: this.scrollable,
          size: Number(this.width) - ((!this.fullWidth && this.landscape) ? 80 : 20),
          step: this.selecting === SelectingTimes.Hour ? 1 : 5,
          value: this.selecting === SelectingTimes.Hour
            ? this.inputHour
            : (this.selecting === SelectingTimes.Minute
              ? this.inputMinute
              : this.inputSecond),
        },
        on: {
          input: this.onInput,
          change: this.onChange,
        },
        ref: 'clock',
      })
    },
    genClockAmPm () {
      return this.$createElement('div', this.setTextColor(this.color || 'primary', {
        staticClass: 'v-time-picker-clock__ampm',
      }), [
        this.genPickerButton('period', 'am', this.$vuetify.lang.t('$vuetify.timePicker.am'), this.disabled || this.readonly),
        this.genPickerButton('period', 'pm', this.$vuetify.lang.t('$vuetify.timePicker.pm'), this.disabled || this.readonly),
      ])
    },
    genPickerBody () {
      return this.$createElement('div', {
        staticClass: 'v-time-picker-clock__container',
        key: this.selecting,
      }, [
        !this.ampmInTitle && this.isAmPm && this.genClockAmPm(),
        this.genClock(),
      ])
    },
    genPickerTitle () {
      return this.$createElement(VTimePickerTitle, {
        props: {
          ampm: this.isAmPm,
          ampmReadonly: this.isAmPm && !this.ampmInTitle,
          disabled: this.disabled,
          hour: this.inputHour,
          minute: this.inputMinute,
          second: this.inputSecond,
          period: this.period,
          readonly: this.readonly,
          useSeconds: this.useSeconds,
          selecting: this.selecting,
        },
        on: {
          'update:selecting': (value: 1 | 2 | 3) => (this.selecting = value),
          'update:period': (period: string) => this.$emit('update:period', period),
        },
        ref: 'title',
        slot: 'title',
      })
    },
  },

  render (): VNode {
    return this.genPicker('v-picker--time')
  },
})
