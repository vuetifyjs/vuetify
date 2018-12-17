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
      type: [Array, Function, Object],
      default: () => null
    },
    eventColor: {
      type: [Array, Function, Object, String],
      default: () => 'warning'
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    min: String,
    max: String,
    readonly: Boolean,
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
    genButtonEvents (value, isAllowed, mouseEventType) {
      if (this.disabled) return undefined

      return {
        click: () => {
          isAllowed && !this.readonly && this.$emit('input', value)
          this.$emit(`click:${mouseEventType}`, value)
        },
        dblclick: () => this.$emit(`dblclick:${mouseEventType}`, value)
      }
    },
    genButton (value, isFloating, mouseEventType) {
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
          disabled: this.disabled || !isAllowed
        },
        on: this.genButtonEvents(value, isAllowed, mouseEventType)
      }), [
        this.$createElement('div', {
          staticClass: 'v-btn__content'
        }, [this.formatter(value)]),
        this.genEvents(value)
      ])
    },
    /**
     *
     * @param {string} date
     * @returns boolean|string|string[]
     */
    getEventData (date) {
      if (Array.isArray(this.events)) {
        return this.events.includes(date)
      } else if (this.events instanceof Function) {
        return this.events(date) || false
      } else if (this.events) {
        return this.events[date] || false
      } else {
        return false
      }
    },
    genEvents (date) {
      let eventColors = this.getEventData(date)

      if (eventColors === true) {
        if (typeof this.eventColor === 'string') {
          eventColors = this.eventColor
        } else if (typeof this.eventColor === 'function') {
          eventColors = this.eventColor(date)
        } else if (Array.isArray(this.eventColor)) {
          eventColors = this.eventColor
        } else {
          eventColors = this.eventColor[date]
        }
      }
      if (!Array.isArray(eventColors)) eventColors = [eventColors]
      eventColors = eventColors.filter(v => v)

      return eventColors.length ? this.$createElement('div', {
        staticClass: 'v-date-picker-table__events'
      }, eventColors.map(color => this.$createElement('div', this.setBackgroundColor(color || this.color)))) : null
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
        class: {
          'v-date-picker-table--disabled': this.disabled,
          ...this.themeClasses
        },
        on: (!this.disabled && this.scrollable) ? { wheel: this.wheel } : undefined,
        directives: [touchDirective]
      }, [transition])
    }
  }
}
