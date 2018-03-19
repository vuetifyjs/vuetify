import '../../stylus/components/_pickers.styl'

// Components
import VCard from '../VCard'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-picker',

  mixins: [Colorable, Themeable],

  data () {
    return {
      defaultColor: 'primary'
    }
  },

  props: {
    fullWidth: Boolean,
    landscape: Boolean,
    transition: {
      type: String,
      default: 'fade-transition'
    },
    width: {
      type: [Number, String],
      default: 290,
      validator: value => parseInt(value, 10) > 0
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
      return this.$createElement('div', {
        staticClass: 'picker__title',
        'class': this.addBackgroundColorClassChecks({
          'picker__title--landscape': this.landscape
        }, this.computedTitleColor)
      }, this.$slots.title)
    },
    genBodyTransition () {
      return this.$createElement('transition', {
        props: {
          name: this.transition
        }
      }, this.$slots.default)
    },
    genBody () {
      return this.$createElement('div', {
        staticClass: 'picker__body',
        style: this.fullWidth ? undefined : {
          width: this.width + 'px'
        }
      }, [
        this.genBodyTransition()
      ])
    },
    genActions () {
      return this.$createElement('div', {
        staticClass: 'picker__actions card__actions'
      }, this.$slots.actions)
    }
  },

  render (h) {
    return h(VCard, {
      staticClass: 'picker',
      'class': {
        'picker--landscape': this.landscape,
        ...this.themeClasses
      }
    }, [
      this.$slots.title ? this.genTitle() : null,
      this.genBody(),
      this.$slots.actions ? this.genActions() : null
    ])
  }
}
