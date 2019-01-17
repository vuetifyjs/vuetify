// Styles
import '../../stylus/components/_messages.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Colorable, Themeable).extend({
  name: 'v-messages',

  props: {
    value: {
      type: Array,
      default: () => ([])
    } as PropValidator<string[]>
  },

  methods: {
    genChildren () {
      return this.$createElement('transition-group', {
        staticClass: 'v-messages__wrapper',
        attrs: {
          name: 'message-transition',
          tag: 'div'
        }
      }, this.value.map(this.genMessage))
    },
    genMessage (message: string, key: number) {
      return this.$createElement('div', {
        staticClass: 'v-messages__message',
        key,
        domProps: {
          innerHTML: message
        }
      })
    }
  },

  render (h): VNode {
    return h('div', this.setTextColor(this.color, {
      staticClass: 'v-messages',
      class: this.themeClasses
    }), [this.genChildren()])
  }
})
