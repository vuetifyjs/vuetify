import DateTitle from './mixins/date-title'
import DateHeader from './mixins/date-header'
import DateTable from './mixins/date-table'
import DateYears from './mixins/date-years'
import Picker from '../../mixins/picker'

export default {
  name: 'date-picker',

  mixins: [DateTitle, DateHeader, DateTable, DateYears, Picker],

  data () {
    return {
      tableDate: new Date(),
      originalDate: this.value,
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      isSelected: false,
      isReversing: false
    }
  },

  props: {
    dateFormat: {
      type: Function,
      default: val => {
        return new Date(val).toISOString().substr(0, 10)
      }
    },
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
    }
  },

  computed: {
    inputDate: {
      get () {
        if (!this.value) return new Date()
        if (this.value instanceof Date) return this.value
        if (!isNaN(this.value) && this.value.indexOf(':') !== -1) return new Date(this.value)

        return new Date(`${this.value}T12:00:00`)
      },
      set (val) {
        this.$emit('input', val ? this.dateFormat(val) : this.originalDate)
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
    tableMonth () {
      return this.tableDate.getMonth()
    },
    tableYear () {
      return this.tableDate.getFullYear()
    },
    dayName () {
      return this.inputDate ? this.days[this.inputDate.getDay()] : ''
    },
    monthName () {
      return this.inputDate ? this.months[this.month] : ''
    },
    computedTransition () {
      return this.isReversing ? 'v-tab-reverse-transition' : 'v-tab-transition'
    }
  },

  watch: {
    isSelected (val) {
      val && this.$nextTick(() => {
        this.$refs.years.scrollTop = this.$refs.years.scrollHeight / 2 - 125
      })
    },
    tableDate (val, prev) {
      this.isReversing = val < prev
    },
    value (val) {
      if (val) this.tableDate = this.inputDate
    }
  },

  methods: {
    save () {
      if (this.originalDate) {
        this.originalDate = this.value
      } else {
        this.inputDate = this.inputDate
        this.originalDate = this.inputDate
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
    },
    cancel () {
      this.inputDate = this.originalDate
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
    }
  },

  mounted () {
    this.currentDay = this.tableDate.getDate()
    this.currentMonth = this.tableDate.getMonth()
    this.currentYear = this.tableDate.getFullYear()
    this.tableDate = this.inputDate
  },

  render (h) {
    const children = []

    !this.noTitle && children.push(this.genTitle())

    if (!this.isSelected) {
      const bodyChildren = []

      bodyChildren.push(this.genHeader())
      bodyChildren.push(this.genTable())

      children.push(h('div', {
        'class': 'picker__body'
      }, bodyChildren))
    } else {
      children.push(this.genYears())
    }

    this.$scopedSlots.default && children.push(this.genSlot())

    return h('v-card', {
      'class': {
        'picker picker--date': true,
        'picker--landscape': this.landscape,
        'picker--dark': this.dark
      }
    }, children)
  }
}
