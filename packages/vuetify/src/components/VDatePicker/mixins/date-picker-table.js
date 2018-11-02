import '../../../stylus/components/_date-picker-table.styl'

// Directives
import Touch from '../../../directives/touch'

// Utils
import isDateAllowed from '.././util/isDateAllowed'

/* @vue/component */
export default {
  directives: { Touch },

  props: {
    allowedDates: Function,
    current: String,
    disabled: Boolean,
    format: {
      type: Function,
      default: null
    },
    events: {
      type: [Array, Object, Function],
      default: () => null
    },
    eventColor: {
      type: [String, Function, Object],
      default: 'warning'
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    min: String,
    max: String,
    scrollable: Boolean,
    tableDate: {
      type: String,
      required: true
    },
    value: [String, Array]
  },

  data: () => ({
    isReversing: false
  }),

  computed: {
    computedTransition () {
      return (this.isReversing === !this.$vuetify.rtl) ? 'tab-reverse-transition' : 'tab-transition'
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
    genButtonClasses (isAllowed, isFloating, isSelected, isCurrent) {
      return {
        'v-btn--active': isSelected,
        'v-btn--flat': !isSelected,
        'v-btn--icon': isSelected && isAllowed && isFloating,
        'v-btn--floating': isFloating,
        'v-btn--depressed': !isFloating && isSelected,
        'v-btn--disabled': !isAllowed || (this.disabled && isSelected),
        'v-btn--outline': isCurrent && !isSelected,
        ...this.themeClasses
      }
    },
    genButton (value, isFloating) {
      const isAllowed = isDateAllowed(value, this.min, this.max, this.allowedDates)
      const isSelected = value === this.value || (Array.isArray(this.value) && this.value.indexOf(value) !== -1)
      const isCurrent = value === this.current
      const setColor = isSelected ? this.setBackgroundColor : this.setTextColor
      const color = (isSelected || isCurrent) && (this.color || 'accent')

      return this.$createElement('button', setColor(color, {
        staticClass: 'v-btn',
        'class': this.genButtonClasses(isAllowed, isFloating, isSelected, isCurrent),
        attrs: {
          type: 'button'
        },
        domProps: {
          disabled: !isAllowed
        },
        on: (this.disabled || !isAllowed) ? {} : {
          click: () => this.$emit('input', value)
        }
      }), [
        this.$createElement('div', {
          staticClass: 'v-btn__content'
        }, [this.formatter(value)]),
        this.isEvent(value) ? this.genEvent(value) : null
      ])
    },
    isEvent (date) {
      if (Array.isArray(this.events)) {
        return this.events.indexOf(date) > -1
      } else if (this.events instanceof Function) {
        return this.events(date)
      } else {
        return false
      }
    },
    genEvent (date) {
      let eventColor
      if (typeof this.eventColor === 'string') {
        eventColor = this.eventColor
      } else if (typeof this.eventColor === 'function') {
        eventColor = this.eventColor(date)
      } else {
        eventColor = this.eventColor[date]
      }
      return this.$createElement('div', this.setBackgroundColor(eventColor || this.color || 'accent', {
        staticClass: 'v-date-picker-table__event'
      }))
    },
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
        class: this.themeClasses,
        on: this.scrollable ? { wheel: this.wheel } : undefined,
        directives: [touchDirective]
      }, [transition])
    }
  }
}
