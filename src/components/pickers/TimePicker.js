import Picker from '../../mixins/picker'
import TimeTitle from './mixins/time-title'
import TimeBody from './mixins/time-body'

export default {
  name: 'time-picker',

  mixins: [Picker, TimeBody, TimeTitle],

  data () {
    return {
      isDragging: false,
      rotate: 0,
      originalTime: this.value,
      period: 'am',
      selectingHour: true,
      ranges: {
        hours: [...Array.from({ length: 24 }, (v, k) => k)],
        minutes: [...Array.from({ length: 60 }, (v, k) => k)]
      }
    }
  },

  props: {
    format: {
      type: String,
      default: 'ampm',
      validator (val) {
        return ['ampm', '24hr'].includes(val)
      }
    },
    allowedHours: {
      type: [Array, Object, Function],
      default: () => (null)
    },
    allowedMinutes: {
      type: [Array, Object, Function],
      default: () => (null)
    }
  },

  computed: {
    is24hr () {
      return this.format !== 'ampm'
    },
    divider () {
      if (!this.selectingHour) return 60
      return this.is24hr ? 24 : 12
    },
    degrees () {
      return this.degreesPerUnit * Math.PI / 180
    },
    degreesPerUnit () {
      return 360 / this.divider
    },
    inputTime: {
      get () {
        if (this.value && !(this.value instanceof Date)) return this.value
        let value = new Date()

        if (this.value instanceof Date) {
          value = this.value
        }

        let hour = value.getHours()
        let minute = value.getMinutes()
        let period = ''

        if (!this.is24hr) {
          hour = hour > 12 ? hour - 12 : hour
          period = this.period
        }

        hour = this.firstAllowed('hour', hour)
        minute = this.firstAllowed('minute', minute)

        return `${hour}:${minute}${period}`
      },
      set (val) {
        return this.$emit('input', val)
      }
    },
    timeArray () {
      return this.inputTime.replace(/(am|pm)/, '').split(':')
    },
    hour: {
      get () {
        return parseInt(this.timeArray[0])
      },
      set (val) {
        if (!this.is24hr) {
          val = val > 12 ? val - 12 : val < 1 ? 12 : val
        } else {
          val = val < 10 ? `0${val}` : val > 23 ? '00' : val
        }

        this.inputTime = `${val}:${this.minute}${!this.is24hr ? this.period : ''}`
      }
    },
    minute: {
      get () {
        const minute = parseInt(this.timeArray[1])

        return minute < 10 ? `0${minute}` : minute > 59 ? '00' : minute
      },
      set (val) {
        val = val < 10 ? `0${parseInt(val)}` : val > 59 ? '00' : val
        let hour = this.hour

        if (this.is24hr && hour < 10) {
          hour = `0${hour}`
        }

        this.inputTime = `${hour}:${val}${!this.is24hr ? this.period : ''}`
      }
    },
    clockHand () {
      if (this.selectingHour) return this.degreesPerUnit * this.hour
      return this.degreesPerUnit * this.minute
    },
    radius () {
      return this.clockSize / 2
    },
    clockSize: {
      get () {
        return this.size
      },
      set (val) {
        this.size = val
      }
    },
    size () {
      return this.landscape ? 250 : 280
    }
  },

  watch: {
    period (val) {
      this.inputTime = `${this.hour}:${this.minute}${val}`
    },
    value (val) {
      if (this.isSaving) {
        this.originalTime = this.inputTime
        this.isSaving = false
      }
    }
  },

  methods: {
    save () {
      if (this.originalTime) {
        this.originalTime = this.value
      } else {
        this.inputTime = this.inputTime
        this.originalTime = this.inputTime
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
    },
    cancel () {
      this.inputTime = this.originalTime
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
    },
    isAllowed(type, value) {
      const allowed = this[`allowed${type.charAt(0).toUpperCase() + type.slice(1)}s`]

      if (!allowed) return true

      if (Array.isArray(allowed)) {
        return !!allowed.find(v => v === value)
      } else if (allowed instanceof Function) {
        return allowed(value)
      } else if (allowed instanceof Object) {
        const range = type === 'minute' && this.ranges.minutes || !this.is24hr && this.ranges.hours.slice(1, 13) || this.ranges.hours
        const mod = type === 'minute' && 60 || !this.is24hr && 12 || 24
        const offset = type === 'hour' && !this.is24hr ? 1 : 0

        let steps = allowed.max - allowed.min
        steps < 0 && (steps = steps + mod)

        let j = allowed.min
        for (let i = 0; i <= steps; i++) {
          const index = (j - offset + i) % mod
          if (range[index] === value) return true
        }

        return false
      }

      return true
    },
    generateRange(type, start) {
      let range = type === 'hour' ? this.ranges.hours : this.ranges.minutes
      let offset = 1

      if (type === 'hour' && !this.is24hr) {
        range = range.slice(1, 13)
        offset = 0
      }

      return range.slice(start + offset, range.length).concat(range.slice(0, start + offset))
    },
    firstAllowed (type, value) {
      const allowed = this[`allowed${type.charAt(0).toUpperCase() + type.slice(1)}s`]

      if (!allowed) return value

      const range = this.generateRange(type, value)

      const first = range.find(v => this.isAllowed(type, v))

      return first || value
    }
  },

  render (h) {
    const children = [this.genBody()]

    !this.noTitle && children.unshift(this.genTitle())
    this.$scopedSlots.default && children.push(this.genSlot())

    return h('v-card', {
      'class': {
        'picker picker--time': true,
        'picker--landscape': this.landscape,
        'picker--dark': this.dark,
        'picker--time--hours': this.selectingHour
      }
    }, children)
  }
}
