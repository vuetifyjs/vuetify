import '../../stylus/components/_date-picker-header.styl'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'

// Utils
import { createNativeLocaleFormatter, monthChange } from './util'

export default {
  name: 'v-date-picker-header',

  components: {
    VBtn,
    VIcon
  },

  mixins: [Colorable],

  data () {
    return {
      isReversing: false,
      defaultColor: 'accent'
    }
  },

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
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    value: {
      type: [Number, String],
      required: true
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

      return this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          disabled,
          icon: true
        },
        nativeOn: {
          click: e => {
            e.stopPropagation()
            this.$emit('input', this.calculateChange(change))
          }
        }
      }, [
        this.$createElement('v-icon', change < 0 ? this.prevIcon : this.nextIcon)
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
      const header = this.$createElement('strong', {
        'class': this.disabled ? undefined : this.addTextColorClassChecks(),
        key: String(this.value),
        on: {
          click: () => this.$emit('toggle')
        }
      }, [this.$slots.default || this.formatter(String(this.value))])

      const transition = this.$createElement('transition', {
        props: {
          name: this.isReversing ? 'tab-reverse-transition' : 'tab-transition'
        }
      }, [header])

      return this.$createElement('div', {
        staticClass: 'date-picker-header__value',
        class: {
          'date-picker-header__value--disabled': this.disabled
        }
      }, [transition])
    }
  },

  render (h) {
    return this.$createElement('div', {
      staticClass: 'date-picker-header'
    }, [
      this.genBtn(-1),
      this.genHeader(),
      this.genBtn(+1)
    ])
  }
}
