// Utils
import pad from '../VDatePicker/util/pad'

// Types
import Vue, { VNode } from 'vue'
import { Period, Time, Format, TimePickerType, TimePickerAllowed, TimePickerAllowFunction } from 'types'
import { PropValidator } from 'vue/types/options'

export const enum TimePickerEnum {
  Hour = 'hour',
  Minute = 'minute',
  Second = 'second'
}

export function convert24to12 (hour: number) {
  return hour ? ((hour - 1) % 12 + 1) : 12
}

export function convert12to24 (hour: number, period: Period) {
  return hour % 12 + (period === 'pm' ? 12 : 0)
}

export function parseTime (value: string | null | Date): [Time, Period] {
  let hour, minute, second, period

  if (value == null || value === '') {
    hour = null
    minute = null
    second = null
    period = 'am'
  } else if (value instanceof Date) {
    hour = value.getHours()
    minute = value.getMinutes()
    second = value.getSeconds()
    period = hour > 12 ? 'pm' : 'am'
  } else {
    const [, h, m, , s, p] = value.trim().toLowerCase().match(/^(\d+):(\d+)(:(\d+))?([ap]m)?$/) || new Array(6)

    hour = p ? convert12to24(parseInt(h, 10), p as Period) : parseInt(h, 10)
    minute = parseInt(m, 10)
    second = parseInt(s || 0, 10)
    period = p || (hour >= 0 && hour < 12 ? 'am' : 'pm')
  }

  return [{ hour, minute, second }, period as Period]
}

export interface VTimeScopedProps {
  allowed: {
    hour: TimePickerAllowFunction
    minute: TimePickerAllowFunction
    second: TimePickerAllowFunction
  }
  format: Format
  time: Time
  period: Period
  selectMode: TimePickerType
  setPeriod: Function
  setTime: Function
  setSelectMode: Function
  useSeconds: boolean
}

export default Vue.extend({
  name: 'v-time',

  props: {
    allowedHours: {
      type: Function,
      default: () => true,
    } as PropValidator<TimePickerAllowed>,
    allowedMinutes: {
      type: Function,
      default: () => true,
    } as PropValidator<TimePickerAllowed>,
    allowedSeconds: {
      type: Function,
      default: () => true,
    } as PropValidator<TimePickerAllowed>,
    format: {
      type: String,
      default: 'ampm',
      validator (val) {
        return ['ampm', '24hr'].includes(val)
      },
    } as PropValidator<Format>,
    min: String,
    max: String,
    value: {
      type: [String, Date],
    },
    useSeconds: Boolean,
  },

  data () {
    const [internalTime, period] = parseTime(this.value)

    return {
      period,
      selectMode: TimePickerEnum.Hour as TimePickerType,
      internalTime,
    }
  },

  computed: {
    isAllowedHourCb (): TimePickerAllowFunction {
      let cb: TimePickerAllowFunction

      if (!this.allowedHours) {
        cb = () => true
      } else if (this.allowedHours instanceof Array) {
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
    isAllowedMinuteCb (): TimePickerAllowFunction {
      let cb: TimePickerAllowFunction

      const isHourAllowed = !this.isAllowedHourCb || this.internalTime.hour === null || this.isAllowedHourCb(this.internalTime.hour)
      if (!this.allowedMinutes) {
        cb = () => true
      } else if (this.allowedMinutes instanceof Array) {
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
        const time = 60 * this.internalTime.hour! + val
        return time >= minTime &&
          time <= maxTime &&
          isHourAllowed &&
          (!cb || cb(val))
      }
    },
    isAllowedSecondCb (): TimePickerAllowFunction {
      let cb: TimePickerAllowFunction

      const isHourAllowed = !this.isAllowedHourCb || this.internalTime.hour === null || this.isAllowedHourCb(this.internalTime.hour)
      const isMinuteAllowed = isHourAllowed &&
        (!this.isAllowedMinuteCb ||
          this.internalTime.minute === null ||
          this.isAllowedMinuteCb(this.internalTime.minute)
        )

      if (!this.allowedSeconds) {
        cb = () => true
      } else if (this.allowedSeconds instanceof Array) {
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
        const time = 3600 * this.internalTime.hour! + 60 * this.internalTime.minute! + val
        return time >= minTime &&
          time <= maxTime &&
          isMinuteAllowed &&
          (!cb || cb(val))
      }
    },
    scopedSlotProps (): VTimeScopedProps {
      return {
        allowed: {
          hour: this.isAllowedHourCb,
          minute: this.isAllowedMinuteCb,
          second: this.isAllowedSecondCb,
        },
        format: this.format,
        time: this.internalTime,
        period: this.period,
        selectMode: this.selectMode,
        setPeriod: this.setPeriod,
        setTime: this.setTime,
        setSelectMode: this.setSelectMode,
        useSeconds: this.useSeconds,
      }
    },
    timeAsString (): string | null {
      const { hour, minute, second } = this.internalTime
      if (hour != null && minute != null && (!this.useSeconds || second != null)) {
        return `${pad(hour)}:${pad(minute)}` + (this.useSeconds ? `:${pad(second!)}` : '')
      }

      return null
    },
  },

  watch: {
    value (value: string | null | Date) {
      const [time, period] = parseTime(value)
      this.internalTime = time
      this.period = period
    },
    timeAsString (v: string | null) {
      if (v != null) this.$emit('input', v)
    },
    period (v: Period) {
      this.$emit('update:period', v)
    },
    selectMode (v: TimePickerType) {
      this.$emit('update:selectMode', v)
    },
  },

  methods: {
    setPeriod (p: Period) {
      this.period = p

      // If hour is set, and we change period
      // then we need to update hour since it
      // is always stored in a 24 hour format
      if (this.internalTime.hour) {
        this.internalTime.hour = this.period === 'am' ? this.internalTime.hour - 12 : this.internalTime.hour + 12
      }
    },
    setTime (t: Time) { this.internalTime = t },
    setSelectMode (m: TimePickerType) { this.selectMode = m },
  },

  render (): VNode {
    return this.$scopedSlots.default!(this.scopedSlotProps) as any
  },
})
