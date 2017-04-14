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
      hour: 3,
      minute: 30,
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
    }
  },

  computed: {
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

  render (h) {
    const children = []

    children.push(this.genTitle())
    children.push(this.genBody())

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
    }, children)
  }
}
