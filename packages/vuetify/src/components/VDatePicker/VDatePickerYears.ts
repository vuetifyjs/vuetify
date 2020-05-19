import './VDatePickerYears.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Localable from '../../mixins/localable'

// Utils
import {
  createItemTypeNativeListeners,
  createNativeLocaleFormatter,
} from './util'
import { mergeListeners } from '../../util/mergeData'
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode, PropType } from 'vue'
import { DatePickerFormatter } from 'vuetify/types'

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
    readonly: Boolean,
    value: [Number, String],
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

  mounted () {
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

  methods: {
    genYearItem (year: number): VNode {
      const formatted = this.formatter(`${year}`)
      const active = parseInt(this.value, 10) === year
      const color = active && (this.color || 'primary')

      return this.$createElement('li', this.setTextColor(color, {
        key: year,
        class: { active },
        on: mergeListeners({
          click: () => this.$emit('input', year),
        }, createItemTypeNativeListeners(this, ':year', year)),
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
    },
  },

  render (): VNode {
    return this.$createElement('ul', {
      staticClass: 'v-date-picker-years',
      ref: 'years',
    }, this.genYearItems())
  },
})
