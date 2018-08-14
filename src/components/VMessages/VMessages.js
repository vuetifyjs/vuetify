// Styles
import '../../stylus/components/_messages.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-messages',

  mixins: [Colorable, Themeable],

  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },

  methods: {
    genChildren () {
      return this.$createElement('transition-group', {
        staticClass: 'v-messages__wrapper',
        attrs: {
          name: 'message-transition',
          tag: 'div'
        }
      }, this.value.map(m => this.genMessage(m)))
    },
    genMessage (key) {
      return this.$createElement('div', {
        staticClass: 'v-messages__message',
        key,
        domProps: {
          innerHTML: key
        }
      })
    }
  },

  render (h) {
    return h('div', this.setTextColor(this.color, {
      staticClass: 'v-messages',
      class: this.themeClasses
    }), [this.genChildren()])
  }
}
