import DateHeader from './mixins/DateHeader'
import DateBody from './mixins/DateBody'
import DateTable from './mixins/DateTable'

export default {
  name: 'date-picker',

  mixins: [DateHeader, DateBody, DateTable],

  data () {
    return {
      lazyDate: null
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
      if (this.lazyDate) return this.lazyDate.getDate()
    },
    month () {
      if (this.lazyDate) return this.lazyDate.getMonth()
    },
    year () {
      if (this.lazyDate) return this.lazyDate.getFullYear()
    },
    dayName () {
      return this.lazyDate ? this.days[this.lazyDate.getDay()] : ''
    },
    monthName () {
      return this.lazyDate ? this.months[this.month] : ''
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
      this.inputDate = val
    }
  },

  mounted () {
    this.inputDate = this.value
    this.lazyDate = this.inputDate
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
