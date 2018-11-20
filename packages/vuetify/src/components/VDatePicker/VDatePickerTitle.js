import '../../stylus/components/_date-picker-title.styl'

// Components
import VIcon from '../VIcon'

// Mixins
import PickerButton from '../../mixins/picker-button'

/* @vue/component */
export default {
  name: 'v-date-picker-title',

  mixins: [PickerButton],

  props: {
    date: {
      type: String,
      default: ''
    },
    selectingYear: Boolean,
    year: {
      type: [Number, String],
      default: ''
    },
    yearIcon: {
      type: String
    },
    value: {
      type: String
    }
  },

  data: () => ({
    isReversing: false
  }),

  computed: {
    computedTransition () {
      return this.isReversing ? 'picker-reverse-transition' : 'picker-transition'
    }
  },

  watch: {
    value (val, prev) {
      this.isReversing = val < prev
    }
  },

  methods: {
    genYearIcon () {
      return this.$createElement(VIcon, {
        props: {
          dark: true
        }
      }, this.yearIcon)
    },
    getYearBtn () {
      return this.genPickerButton('selectingYear', true, [
        this.year,
        this.yearIcon ? this.genYearIcon() : null
      ], false, 'v-date-picker-title__year')
    },
    genTitleText () {
      return this.$createElement('transition', {
        props: {
          name: this.computedTransition
        }
      }, [
        this.$createElement('div', {
          domProps: { innerHTML: this.date || '&nbsp;' },
          key: this.value
        })
      ])
    },
    genTitleDate (title) {
      return this.genPickerButton('selectingYear', false, this.genTitleText(title), false, 'v-date-picker-title__date')
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-date-picker-title'
    }, [
      this.getYearBtn(),
      this.genTitleDate()
    ])
  }
}
