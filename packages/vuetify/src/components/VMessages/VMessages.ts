// Styles
import './VMessages.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Types
import { VNode, PropType } from 'vue'
import mixins from '../../util/mixins'

// Utilities
import { getSlot } from '../../util/helpers'

/* @vue/component */
export default mixins(Colorable, Themeable).extend({
  name: 'v-messages',

  props: {
    value: {
      type: Array as PropType<string[]>,
      default: () => ([]),
    },
  },

  methods: {
    genChildren () {
      return this.$createElement('transition-group', {
        staticClass: 'v-messages__wrapper',
        attrs: {
          name: 'message-transition',
          tag: 'div',
        },
      }, this.value.map(this.genMessage))
    },
    genMessage (message: string, key: number) {
      return this.$createElement('div', {
        staticClass: 'v-messages__message',
        key,
      }, getSlot(this, 'default', { message, key }) || [message])
    },
  },

  render (h): VNode {
    return h('div', this.setTextColor(this.color, {
      staticClass: 'v-messages',
      class: this.themeClasses,
    }), [this.genChildren()])
  },
})
