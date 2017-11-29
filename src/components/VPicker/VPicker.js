require('../../stylus/components/_pickers.styl')

import VCard from '../VCard'

import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-picker',

  components: {
    VCard
  },

  mixins: [Colorable, Themeable],

  data () {
    return {
      defaultColor: 'primary'
    }
  },

  props: {
    landscape: Boolean,
    transition: {
      type: String,
      default: 'scale-transition'
    }
  },

  computed: {
    computedTitleColor () {
      const darkTheme = this.dark || (!this.light && this.$vuetify.dark)
      const defaultTitleColor = darkTheme ? null : this.computedColor
      return this.color || defaultTitleColor
    }
  },

  methods: {
    genTitle () {
      return this.$slots.title ? this.$createElement('div', {
        staticClass: 'picker__title',
        'class': this.addBackgroundColorClassChecks({
          'picker__title--landscape': this.landscape
        }, 'computedTitleColor')
      }, this.$slots.title) : null
    },

    genBodyTransition () {
      return this.$createElement('transition', {
        props: {
          origin: 'center center',
          mode: 'out-in',
          name: this.transition
        }
      }, this.$slots.default)
    },

    genBody () {
      return this.$createElement('div', {
        staticClass: 'picker__body',
        'class': {
          'picker__body--landscape': this.landscape
        }
      }, [this.genBodyTransition()])
    }
  },

  render (h) {
    return h('v-card', {
      staticClass: 'picker',
      'class': {
        'picker--landscape': this.landscape,
        ...this.themeClasses
      }
    }, [
      this.genTitle(),
      this.genBody(),
      this.$slots.actions
    ])
  }
}
