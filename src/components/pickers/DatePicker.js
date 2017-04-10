import DateHeader from './mixins/DateHeader'
import DateBody from './mixins/DateBody'
import DateTable from './mixins/DateTable'
import DateYears from './mixins/DateYears'

export default {
  name: 'date-picker',

  mixins: [DateHeader, DateBody, DateTable, DateYears],

  data () {
    return {
      lazyDate: new Date(this.value),
      currentDay: null,
      isSelected: false
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
    isSelected (val) {
      if (val) {
        this.$nextTick(() => {
          const years = this.$refs.years
          years.scrollTop = years.scrollHeight / 2 - 165
        })
      }
    },
    value (val) {
      this.lazyDate = new Date(val)
    }
  },

  mounted () {
    this.inputDate = this.value
    this.lazyDate = this.inputDate
    this.currentDay = this.inputDate.getDate()
  },

  render (h) {
    return h('v-card', {
      'class': 'date-picker'
    }, [
      this.genHeader(),
      !this.isSelected ? this.genBody() : null,
      !this.isSelected ? this.genTable() : null,
      this.isSelected ? this.genYears() : null
    ])
  }
}
