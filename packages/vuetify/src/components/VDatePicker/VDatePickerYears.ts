import './VDatePickerYears.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Localable from '../../mixins/localable'

// Utils
import { createNativeLocaleFormatter } from './util'
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode, PropType } from 'vue'
import { DatePickerFormatter } from 'types'

interface options extends Vue {
  $el: HTMLElement
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof Colorable,
    typeof Localable
  ]>
/* eslint-enable indent */
>(
  Colorable,
  Localable
/* @vue/component */
).extend({
  name: 'v-date-picker-years',

  props: {
    format: Function as PropType<DatePickerFormatter | undefined>,
    min: [Number, String],
    max: [Number, String],
    value: Array as PropType<string[]>,
  },

  data () {
    return {
      defaultColor: 'primary',
    }
  },

  computed: {
    formatter (): DatePickerFormatter {
      return this.format || createNativeLocaleFormatter(this.currentLocale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
    },
  },

  watch: {
    value: 'scrollToFirstActiveYear',
  },

  mounted () {
    this.scrollToFirstActiveYear()
  },

  methods: {
    scrollToFirstActiveYear () {
      setTimeout(() => {
        const activeItem = this.$el.getElementsByClassName('active')[0]
        if (activeItem) {
          this.$el.scrollTop = activeItem.offsetTop - this.$el.offsetHeight / 2 + activeItem.offsetHeight / 2
        } else if (this.min && !this.max) {
          this.$el.scrollTop = this.$el.scrollHeight
        } else if (!this.min && this.max) {
          this.$el.scrollTop = 0
        } else {
          this.$el.scrollTop = this.$el.scrollHeight / 2 - this.$el.offsetHeight / 2
        }
      })
    },
    genYearItem (year: number): VNode {
      const formatted = this.formatter(`${year}`)
      const active = this.value && !!this.value.find(date => parseInt(date, 10) === year)
      const color = active && (this.color || 'primary')

      return this.$createElement('li', this.setTextColor(color, {
        key: year,
        class: active ? { active } : undefined,
        on: {
          click: () => this.$emit('input', String(year)),
        },
      }), formatted)
    },

    genYearItems (): VNode[] {
      const children = []
      const selectedYears = this.value && this.value.length
        ? this.value.map(date => parseInt(date, 10))
        : [new Date().getFullYear()]
      const maxYear = Math.max(...selectedYears)
      const minYear = Math.min(...selectedYears)
      const lastYear = this.max ? parseInt(this.max, 10) : (maxYear + 100)
      const firstYear = Math.min(lastYear, this.min ? parseInt(this.min, 10) : (minYear - 100))

      for (let year = lastYear; year >= firstYear; year--) {
        children.push(this.genYearItem(year))
      }

      return children
    },
  },

  render (): VNode {
    return this.$createElement('ul', {
      staticClass: 'v-date-picker-years',
      ref: 'years',
    }, this.genYearItems())
  },
})
