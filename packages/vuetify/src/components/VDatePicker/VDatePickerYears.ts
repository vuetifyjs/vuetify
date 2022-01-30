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
      focusedItemIndex: 0,
      yearsList: [] as HTMLElement[],
    }
  },

  computed: {
    formatter (): DatePickerFormatter {
      return this.format || createNativeLocaleFormatter(this.currentLocale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
    },
  },

  mounted () {
    this.yearsList = (this as any).$refs.years.children
    this.yearsList[this.focusedItemIndex].focus()

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
    handleKeydown (e: KeyboardEvent) {
      if (e.code === 'ArrowDown') {
        this.moveFocus('next')
      }

      if (e.code === 'ArrowUp') {
        this.moveFocus('previous')
      }
    },
    moveFocus (direction: 'next' | 'previous') {
      this.focusedItemIndex = direction === 'next' ? this.focusedItemIndex + 1 : this.focusedItemIndex - 1

      if (this.focusedItemIndex > this.yearsList.length - 1) {
        this.focusedItemIndex = 0
      }

      if (this.focusedItemIndex < 0) {
        this.focusedItemIndex = this.yearsList.length - 1
      }

      this.yearsList[this.focusedItemIndex].focus()
    },
    genYearItem (year: number): VNode {
      const formatted = this.formatter(`${year}`)
      const active = parseInt(this.value, 10) === year
      const color = active && (this.color || 'primary')

      return this.$createElement('li', this.setTextColor(color, {
        attrs: {
          tabindex: -1,
        },
        key: year,
        class: { active },
        on: mergeListeners({
          click: () => this.$emit('input', year),
          keydown: (e: KeyboardEvent) => {
            if (e.code === 'Enter' || e.code === 'Space') {
              e.preventDefault()
              this.$emit('update:should-autofocus', true)
              this.$emit('input', year)
            }
          },
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

        if (year === selectedYear) {
          this.focusedItemIndex = children.length - 1
        }
      }

      return children
    },
  },

  render (): VNode {
    return this.$createElement('ul', {
      attrs: {
        tabindex: 0,
      },
      staticClass: 'v-date-picker-years',
      ref: 'years',
      on: {
        keydown: this.handleKeydown,
      },
    }, this.genYearItems())
  },
})
