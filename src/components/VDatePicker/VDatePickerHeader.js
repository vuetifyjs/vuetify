require('../../stylus/components/_date-picker-header.styl')

import Colorable from '../../mixins/colorable'

import VBtn from '../VBtn'
import VIcon from '../VIcon'

import { createNativeLocaleFormatter, monthChange } from './util'

export default {
  name: 'v-date-picker-header',

  components: {
    VBtn,
    VIcon
  },

  mixins: [
    Colorable
  ],

  props: {
    format: {
      type: Function,
      default: null
    },
    iconPrev: {
      type: String,
      default: 'chevron_left'
    },
    iconNext: {
      type: String,
      default: 'chevron_right'
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    value: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      isReversing: false,
      defaultColor: 'accent'
    }
  },

  watch: {
    value (newVal, oldVal) {
      this.isReversing = newVal < oldVal
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

  methods: {
    genBtn (change) {
      return this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: e => {
            e.stopPropagation()
            this.$emit('input', this.calculateChange(change))
          }
        }
      }, [
        this.$createElement('v-icon', change < 0 ? this.iconPrev : this.iconNext)
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
        'class': this.addTextColorClassChecks(),
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
        'class': 'date-picker-header__value'
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
