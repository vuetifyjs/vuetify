import '../../stylus/components/_date-picker-years.styl'

// Mixins
import Colorable from '../../mixins/colorable'

// Utils
import { createNativeLocaleFormatter } from './util'

/* @vue/component */
export default {
  name: 'v-date-picker-years',

  mixins: [Colorable],

  props: {
    format: {
      type: Function,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    min: [Number, String],
    max: [Number, String],
    value: [Number, String]
  },

  data () {
    return {
      defaultColor: 'primary'
    }
  },

  computed: {
    formatter () {
      return this.format || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
    }
  },

  mounted () {
    const activeItem = this.$el.getElementsByClassName('active')[0]
    if (activeItem) {
      this.$el.scrollTop = activeItem.offsetTop - this.$el.offsetHeight / 2 + activeItem.offsetHeight / 2
    } else {
      this.$el.scrollTop = this.$el.scrollHeight / 2 - this.$el.offsetHeight / 2
    }
  },

  methods: {
    genYearItem (year) {
      const formatted = this.formatter(`${year}`)

      return this.$createElement('li', {
        key: year,
        'class': parseInt(this.value, 10) === year
          ? this.addTextColorClassChecks({ active: true })
          : {},
        on: {
          click: () => this.$emit('input', year)
        }
      }, formatted)
    },
    genYearItems () {
      const children = []
      const selectedYear = this.value ? parseInt(this.value, 10) : new Date().getFullYear()
      const maxYear = this.max ? parseInt(this.max, 10) : (selectedYear + 100)
      const minYear = Math.min(maxYear, this.min ? parseInt(this.min, 10) : (selectedYear - 100))

      for (let year = maxYear; year >= minYear; year--) {
        children.push(this.genYearItem(year))
      }

      return children
    }
  },

  render () {
    return this.$createElement('ul', {
      staticClass: 'v-date-picker-years',
      ref: 'years'
    }, this.genYearItems())
  }
}
