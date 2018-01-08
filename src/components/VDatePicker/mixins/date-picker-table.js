require('../../../stylus/components/_date-picker-table.styl')

// Directives
import Touch from '../../../directives/touch'

export default {
  directives: { Touch },

  data () {
    return {
      defaultColor: 'accent',
      isReversing: false
    }
  },

  props: {
    allowedDates: {
      type: [Array, Object, Function],
      default: () => null
    },
    current: String,
    format: {
      type: Function,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    scrollable: Boolean,
    tableDate: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    }
  },

  computed: {
    computedTransition () {
      return this.isReversing ? 'tab-reverse-transition' : 'tab-transition'
    },
    selectedDate () {
      return this.value ? (this.value.split('-')[2] * 1) : null
    },
    selectedMonth () {
      return this.value ? (this.value.split('-')[1] - 1) : null
    },
    selectedYear () {
      return this.value ? (this.value.split('-')[0] * 1) : null
    },
    currentDate () {
      return this.current ? (this.current.split('-')[2] * 1) : null
    },
    currentMonth () {
      return this.current ? (this.current.split('-')[1] - 1) : null
    },
    currentYear () {
      return this.current ? (this.current.split('-')[0] * 1) : null
    },
    displayedMonth () {
      return this.tableDate.split('-')[1] - 1
    },
    displayedYear () {
      return this.tableDate.split('-')[0] * 1
    }
  },

  watch: {
    tableDate (newVal, oldVal) {
      this.isReversing = newVal < oldVal
    }
  },

  methods: {
    wheel (e) {
      e.preventDefault()
      this.$emit('tableDate', this.calculateTableDate(e.deltaY))
    },
    touch (value) {
      this.$emit('tableDate', this.calculateTableDate(value))
    },
    genTable (staticClass, children) {
      const transition = this.$createElement('transition', {
        props: { name: this.computedTransition }
      }, [this.$createElement('table', { key: this.tableDate }, children)])

      const touchDirective = {
        name: 'touch',
        value: {
          left: e => (e.offsetX < -15) && this.touch(1),
          right: e => (e.offsetX > 15) && this.touch(-1)
        }
      }

      return this.$createElement('div', {
        staticClass,
        on: this.scrollable ? { wheel: this.wheel } : undefined,
        directives: [touchDirective]
      }, [transition])
    }
  }
}
