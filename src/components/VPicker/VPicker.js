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
    bodyKey: [Boolean, Number, String],
    landscape: Boolean
  },

  computed: {
    computedTitleColor () {
      const darkTheme = this.dark || (!this.light && this.$vuetify.dark)
      const defaultTitleColor = darkTheme ? null : this.computedColor
      return this.color || defaultTitleColor
    }
  },

  methods: {
    genSlot () {
      return this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      })
    },

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
          name: 'scale-transition'
        }
      }, [this.genBody()])
    },

    genBody () {
      return this.$createElement('div', {
        staticClass: 'picker__body',
        'class': {
          'picker__body--landscape': this.landscape
        },
        key: this.bodyKey
      }, this.$slots.default)
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
      this.genBodyTransition(),
      this.$slots.actions
    ])
  }
}
