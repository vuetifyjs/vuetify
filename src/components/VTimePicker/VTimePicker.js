require('../../stylus/components/_pickers.styl')
require('../../stylus/components/_time-picker.styl')

import { createRange } from '../../util/helpers'

import VCard from '../VCard'

import Picker from '../../mixins/picker'
import TimeTitle from './mixins/time-title'
import TimeBody from './mixins/time-body'

export default {
  name: 'v-time-picker',

  components: {
    VCard
  },

  mixins: [Picker, TimeBody, TimeTitle],

  data () {
    return {
      isDragging: false,
      rotate: 0,
      originalTime: this.value,
      period: 'am',
      selectingHour: true,
      ranges: {
        hours: createRange(24),
        minutes: createRange(60)
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
    is24hrAfter12 () {
      return this.selectingHour && this.is24hr && this.hour >= 12
    },
    divider () {
      return this.selectingHour ? 12 : 60
    },
    degrees () {
      return this.degreesPerUnit * Math.PI / 180
    },
    degreesPerUnit () {
      return 360 / this.divider
    },
    inputTime: {
      get () {
        if (this.value && !(this.value instanceof Date)) {
          if (!this.is24hr) {
            this.period = this.value.match(/pm/i)
              ? 'pm'
              : 'am'
          }

          return this.value
        }
        let value = new Date()

        if (this.value instanceof Date) {
          value = this.value
        }

        let hour = value.getHours()
        let minute = value.getMinutes()
        let period = ''

        if (!this.is24hr) {
          period = hour >= 12 ? 'pm' : 'am'
          hour = hour > 12 ? hour - 12 : hour
          hour = hour === 0 ? 12 : hour
        }

        period && (this.period = period)

        hour = this.firstAllowed('hour', hour)
        minute = this.firstAllowed('minute', minute)

        minute = minute < 10 ? `0${minute}` : minute > 59 ? '00' : minute

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
      const hour = !!this.allowedHours && this.selectingHour ? this.firstAllowed('hour', this.hour - 1) : this.hour
      this.inputTime = `${hour}:${this.minute}${val}`
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

      // Fix for #1818
      // Wait for data to persist
      // then set selectingHour
      this.$nextTick(() => (this.selectingHour = true))
    },
    cancel () {
      this.inputTime = this.originalTime
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false

      // Fix for #1818
      // Wait for data to persist
      // then set selectingHour
      this.$nextTick(() => (this.selectingHour = true))
    },
    isAllowed (type, value) {
      const allowed = this[`allowed${type.charAt(0).toUpperCase() + type.slice(1)}s`]

      if (!allowed) return true

      if (Array.isArray(allowed)) {
        return !!allowed.some(v => v === value)
      } else if (allowed instanceof Function) {
        return allowed(value)
      } else if (allowed === Object(allowed)) {
        const range = type === 'minute' ? this.ranges.minutes : this.ranges.hours
        const mod = type === 'minute' ? 60 : 24

        if (allowed.min === String(allowed.min)) {
          allowed.min = this.convert12to24hr(allowed.min)
        }

        if (allowed.max === String(allowed.max)) {
          allowed.max = this.convert12to24hr(allowed.max)
        }

        const steps = allowed.max - allowed.min
        value = type === 'hour' && !this.is24hr && this.period === 'pm' ? value + 12 : value

        for (let i = 0; i <= steps; i++) {
          const index = (allowed.min + i) % mod
          if (range[index] === value) return true
        }

        return false
      }

      return true
    },
    convert12to24hr (input) {
      input = input.toLowerCase()
      const pm = input.indexOf('pm') !== -1
      const hour = parseInt(input.slice(0, input.indexOf(pm ? 'pm' : 'am')))

      return pm ? hour + 12 : hour
    },
    generateRange (type, start) {
      let range = type === 'hour' ? this.ranges.hours : this.ranges.minutes
      let offset = 1

      if (type === 'hour' && !this.is24hr) {
        range = range.slice(1, 13)
        offset = 0
      }

      return range.slice(start + offset, range.length)
        .concat(range.slice(0, start + offset))
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
        'picker--time--hours': this.selectingHour,
        ...this.themeClasses
      }
    }, children)
  }
}
