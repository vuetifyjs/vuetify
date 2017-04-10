import DateHeader from './mixins/DateHeader'
import DateBody from './mixins/DateBody'
import DateTable from './mixins/DateTable'

export default {
  name: 'date-picker',

  mixins: [DateHeader, DateBody, DateTable],

  data () {
    return {
      lazyDate: new Date(this.value),
      calendarDate: null
    }
  },

  computed: {
    inputDate: {
      get () {
        return new Date(this.value)
      },
      set (val) {
        this.$emit('input', val)

        return val
      }
    },
    day () {
      return this.inputDate.getDate()
    },
    month () {
      return this.inputDate.getMonth()
    },
    year () {
      return this.inputDate.getFullYear()
    },
    dayName () {
      return this.inputDate ? this.days[this.inputDate.getDay()] : ''
    },
    monthName () {
      return this.inputDate ? this.months[this.month] : ''
    }
  },

  props: {
    days: {
      type: Array,
      default: () => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    months: {
      type: Array,
      default: () => [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    },
    value: {
      default: () => Date.now()
    }
  },

  watch: {
    value (val) {
      this.lazyDate = new Date(val)
    }
  },

  mounted () {
    this.inputDate = this.value
    this.lazyDate = this.inputDate
    this.calendarDate = this.inputDate
  },

  render (h) {
    return h('v-card', {
      'class': 'date-picker'
    }, [
      this.genHeader(),
      this.genBody(),
      this.genTable()
    ])
  }
}
