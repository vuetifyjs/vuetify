import '../../stylus/components/_date-picker-years.styl'

// Mixins
import Colorable from '../../mixins/colorable'

// Utils
import { createNativeLocaleFormatter } from './util'
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode } from 'vue'
import { NativeLocaleFormatter } from './util/createNativeLocaleFormatter'
import { PropValidator } from 'vue/types/options'

interface options extends Vue {
  $el: HTMLElement
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof Colorable
  ]>
/* eslint-enable indent */
>(
  Colorable
/* @vue/component */
).extend({
  name: 'v-date-picker-years',

  props: {
    format: {
      type: Function,
      default: null
    } as any as PropValidator<NativeLocaleFormatter | null>,
    locale: {
      type: String,
      default: 'en-us'
    },
    min: [Number, String],
    max: [Number, String],
    readonly: Boolean,
    value: [Number, String]
  },

  data () {
    return {
      defaultColor: 'primary'
    }
  },

  computed: {
    formatter (): NativeLocaleFormatter {
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
    genYearItem (year: number): VNode {
      const formatted = this.formatter(`${year}`)
      const active = parseInt(this.value, 10) === year
      const color = active && (this.color || 'primary')

      return this.$createElement('li', this.setTextColor(color, {
        key: year,
        'class': { active },
        on: {
          click: () => this.$emit('input', year)
        }
      }), formatted)
    },

    genYearItems (): VNode[] {
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

  render (): VNode {
    return this.$createElement('ul', {
      staticClass: 'v-date-picker-years',
      ref: 'years'
    }, this.genYearItems())
  }
})
