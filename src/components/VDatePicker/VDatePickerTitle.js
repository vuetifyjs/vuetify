require('../../stylus/components/_date-picker-title.styl')

// Components
import VIcon from '../VIcon'

export default {
  name: 'v-date-picker-title',

  components: {
    VIcon
  },

  props: {
    date: {
      type: String,
      default: ''
    },
    value: Boolean,
    year: {
      type: [Number, String],
      default: ''
    },
    yearIcon: {
      type: String
    }
  },

  methods: {
    genYearIcon () {
      return this.$createElement('v-icon', {
        props: {
          dark: true
        }
      }, this.yearIcon)
    },
    getYearBtn () {
      return this.$createElement('div', {
        staticClass: 'picker__title__btn date-picker-title__year',
        'class': {
          'active': this.value
        },
        on: {
          click: e => {
            e.stopPropagation()
            this.$emit('input', !this.value)
          }
        }
      }, [
        this.year,
        this.yearIcon ? this.genYearIcon() : null
      ])
    },
    genTitleText () {
      return this.$createElement('transition', {
        props: {
          name: 'slide-y-reverse-transition',
          mode: 'out-in'
        }
      }, [
        this.$createElement('div', {
          domProps: { innerHTML: this.date },
          key: this.date
        })
      ])
    },
    genTitleDate (title) {
      return this.$createElement('div', {
        staticClass: 'picker__title__btn date-picker-title__date',
        'class': {
          'active': !this.value
        },
        on: this.value ? {
          click: e => {
            e.stopPropagation()
            this.$emit('input', !this.value)
          }
        } : {}
      }, [this.genTitleText(title)])
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'date-picker-title'
    }, [
      this.getYearBtn(),
      this.genTitleDate()
    ])
  }
}
