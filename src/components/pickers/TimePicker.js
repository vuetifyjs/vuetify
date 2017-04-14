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
      period: 'am',
      selectingHour: true
    }
  },

  props: {
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
    inputTime: {
      get () {
        if(!this.value) {
          const date = new Date()
          let hour = date.getHours()
          hour = this.format === 'ampm' && hour > 12
            ? hour - 12
            : hour
          const minute = date.getMinutes()

          return `${hour}:${minute}${this.format === 'ampm' ? this.format : ''}`
        }


        return this.value
      },
      set (val) {
        return this.$emit('input', val)
      }
    },
    hour: {
      get () {
        const time = this.inputTime.replace(/(am|pm)/,  '').split(':')
        const hour = parseInt(time[0])

        if (this.format === 'ampm') {
          return hour > 12 ? hour - 12 : hour
        }

        return hour
      },
      set (val) {
        if (this.format === 'ampm') {
          val = val > 12 ? val -  12 : val
        }

        this.inputTime = `${val}:${this.minute}${this.period}`
      }
    },
    minute:{
      get () {
        const time = this.inputTime.replace(/(am|pm)/,  '').split(':')
        const minute = parseInt(time[1])

        return minute < 10 ? `0${minute}` : minute
      },
      set (val) {
        val = val < 10 ? `0${val}` : val

        this.inputTime = `${this.hour}:${val}${this.period}`
      }
    },
    hourHand () {
      return this.format === 'ampm'
        ? 360 / 12 * this.hour
        : 360 / 24 * this.hour
    },
    minuteHand () {
      return 360 / 60 * this.minute
    },
    radius () {
      const size = this.landscape ? 240 : 280

      return -(size / 2 * 0.86)
    }
  },

  watch: {
    period (val) {
      this.inputTime = `${this.hour}:${this.minute}${val}`
    }
  },

  render (h) {
    return h('v-card', {
      'class': {
        'time-picker': true,
        'time-picker--dark': this.dark,
        'time-picker--landscape': this.landscape,
        'time-picker--hours': this.selectingHour
      },
      props: {
        height: this.landscape ? '310px' : 'auto'
      }
    }, [this.genTitle(), this.genBody()])
  }
}
