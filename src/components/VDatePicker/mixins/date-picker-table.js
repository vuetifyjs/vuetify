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
    value: {
      type: String,
      required: false
    }
  },

  data: () => ({
    defaultColor: 'accent',
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
    genButtonClasses (value, isAllowed, isFloating) {
      const isSelected = value === this.value
      const isCurrent = value === this.current

      const classes = {
        'v-btn--active': isSelected,
        'v-btn--flat': !isSelected,
        'v-btn--icon': isSelected && isAllowed && isFloating,
        'v-btn--floating': isFloating,
        'v-btn--depressed': !isFloating && isSelected,
        'v-btn--disabled': !isAllowed || (this.disabled && isSelected),
        'v-btn--outline': isCurrent && !isSelected,
        ...this.themeClasses
      }

      if (isSelected) return this.addBackgroundColorClassChecks(classes)
      if (isCurrent) return this.addTextColorClassChecks(classes)
      return classes
    },
    genButton (value, isFloating) {
      const isAllowed = isDateAllowed(value, this.min, this.max, this.allowedDates)

      return this.$createElement('button', {
        staticClass: 'v-btn',
        'class': this.genButtonClasses(value, isAllowed, isFloating),
        attrs: {
          type: 'button'
        },
        domProps: {
          disabled: !isAllowed,
          innerHTML: `<div class="v-btn__content">${this.formatter(value)}</div>`
        },
        on: (this.disabled || !isAllowed) ? {} : {
          click: () => this.$emit('input', value)
        }
      })
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
