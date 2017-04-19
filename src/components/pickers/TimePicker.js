import TimeTitle from './mixins/time-title'
import TimeBody from './mixins/time-body'
import CardActions from '../../mixins/card-actions'

export default {
  name: 'time-picker',

  mixins: [CardActions, TimeBody, TimeTitle],

  data () {
    return {
      isDragging: false,
      rotate: 0,
      originalTime: this.value,
      period: 'am',
      selectingHour: true
    }
  },

  props: {
    actions: Boolean,
    dark: Boolean,
    landscape: Boolean,
    format: {
      type: String,
      default: 'ampm',
      validator (val) {
        return ['ampm', '24hr'].includes(val)
      }
    },
    value: String
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
        const minute = value.getMinutes()

        if (!this.is24hr) {
          hour = hour > 12 ? hour - 12 : hour
        }

        return `${hour}:${minute}${!this.is24hr ? this.period : ''}`
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
          val = val > 23 ? 0 : val
        }

        this.inputTime = `${val}:${this.minute}${this.period}`
      }
    },
    minute: {
      get () {
        const minute = parseInt(this.timeArray[1])

        return minute < 10 ? `0${minute}` : minute > 59 ? '00' : minute
      },
      set (val) {
        val = val < 10 ? `0${val}` : val > 59 ? 0 : val

        this.inputTime = `${this.hour}:${val}${this.period}`
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
      return this.landscape ? 240 : 260
    }
  },

  watch: {
    period (val) {
      this.inputTime = `${this.hour}:${this.minute}${val}`
    },
    value (val) {
      if (!this.$scopedSlots.default && !this.actions) this.originalTime = val
    }
  },

  methods: {
    actionCancel () {
      this.inputTime = this.originalTime
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
    },
    actionOk () {
      this.originalTime = this.value
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
    }
  },

  render (h) {
    let height = 'auto'

    if (this.landscape) {
      height = this.actions ? '310px' : '258px'
    } else {
      height = this.actions ? '487x' : '385px'
    }

    return h('v-card', {
      'class': {
        'time-picker': true,
        'time-picker--dark': this.dark,
        'time-picker--landscape': this.landscape,
        'time-picker--hours': this.selectingHour
      },
      props: {
        height: height
      }
    }, [this.genTitle(), this.genBody(), this.actions ? this.genActions() : null])
  }
}
