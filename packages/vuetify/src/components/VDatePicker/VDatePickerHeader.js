import '../../stylus/components/_date-picker-header.styl'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Utils
import { createNativeLocaleFormatter, monthChange } from './util'

/* @vue/component */
export default {
  name: 'v-date-picker-header',

  mixins: [
    Colorable,
    Themeable
  ],

  props: {
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
    nextIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    readonly: Boolean,
    value: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      isReversing: false
    }
  },

  computed: {
    formatter () {
      if (this.format) {
        return this.format
      } else if (String(this.value).split('-')[1]) {
        return createNativeLocaleFormatter(this.locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 })
      } else {
        return createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
      }
    }
  },

  watch: {
    value (newVal, oldVal) {
      this.isReversing = newVal < oldVal
    }
  },

  methods: {
    genBtn (change) {
      const disabled = this.disabled ||
        (change < 0 && this.min && this.calculateChange(change) < this.min) ||
        (change > 0 && this.max && this.calculateChange(change) > this.max)

      return this.$createElement(VBtn, {
        props: {
          dark: this.dark,
          disabled,
          icon: true,
          light: this.light
        },
        nativeOn: {
          click: e => {
            e.stopPropagation()
            this.$emit('input', this.calculateChange(change))
          }
        }
      }, [
        this.$createElement(VIcon, ((change < 0) === !this.$vuetify.rtl) ? this.prevIcon : this.nextIcon)
      ])
    },
    calculateChange (sign) {
      const [year, month] = String(this.value).split('-').map(v => 1 * v)

      if (month == null) {
        return `${year + sign}`
      } else {
        return monthChange(String(this.value), sign)
      }
    },
    genHeader () {
      const color = !this.disabled && (this.color || 'accent')
      const header = this.$createElement('div', this.setTextColor(color, {
        key: String(this.value)
      }), [this.$createElement('button', {
        on: {
          click: () => this.$emit('toggle')
        }
      }, [this.$slots.default || this.formatter(String(this.value))])])

      const transition = this.$createElement('transition', {
        props: {
          name: (this.isReversing === !this.$vuetify.rtl) ? 'tab-reverse-transition' : 'tab-transition'
        }
      }, [header])

      return this.$createElement('div', {
        staticClass: 'v-date-picker-header__value',
        class: {
          'v-date-picker-header__value--disabled': this.disabled
        }
      }, [transition])
    }
  },

  render () {
    return this.$createElement('div', {
      staticClass: 'v-date-picker-header',
      class: {
        'v-date-picker-header--disabled': this.disabled,
        ...this.themeClasses
      }
    }, [
      this.genBtn(-1),
      this.genHeader(),
      this.genBtn(+1)
    ])
  }
}
