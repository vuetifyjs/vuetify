import DateHeader from './mixins/DateHeader'
import DateBody from './mixins/DateBody'
import DateTable from './mixins/DateTable'

export default {
  name: 'date-picker',

  mixins: [DateHeader, DateBody, DateTable],

  data () {
    return {
      inputDate: new Date(Date.now())
    }
  },

  computed: {
    day () {
      return 7
    },
    month () {
      return this.months[this.inputDate.getMonth()]
    },
    year () {
      return this.inputDate.getFullYear()
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
      default: null
    }
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
