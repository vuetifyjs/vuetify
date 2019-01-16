import '../../stylus/components/_pickers.styl'
import '../../stylus/components/_cards.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Helpers
import { convertToUnit } from '../../util/helpers'

// Types
import { VNode } from 'vue/types'
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Colorable, Themeable).extend({
  name: 'v-picker',

  props: {
    fullWidth: Boolean,
    landscape: Boolean,
    transition: {
      type: String,
      default: 'fade-transition'
    },
    width: {
      type: [Number, String],
      default: 290
    }
  },

  computed: {
    computedTitleColor (): string | false {
      const defaultTitleColor = this.isDark ? false : (this.color || 'primary')
      return this.color || defaultTitleColor
    }
  },

  methods: {
    genTitle () {
      return this.$createElement('div', this.setBackgroundColor(this.computedTitleColor, {
        staticClass: 'v-picker__title',
        'class': {
          'v-picker__title--landscape': this.landscape
        }
      }), this.$slots.title)
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
        staticClass: 'v-picker__body',
        'class': this.themeClasses,
        style: this.fullWidth ? undefined : {
          width: convertToUnit(this.width)
        }
      }, [
        this.genBodyTransition()
      ])
    },
    genActions () {
      return this.$createElement('div', {
        staticClass: 'v-picker__actions v-card__actions'
      }, this.$slots.actions)
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-picker v-card',
      'class': {
        'v-picker--landscape': this.landscape,
        'v-picker--full-width': this.fullWidth,
        ...this.themeClasses
      }
    }, [
      this.$slots.title ? this.genTitle() : null,
      this.genBody(),
      this.$slots.actions ? this.genActions() : null
    ])
  }
})
