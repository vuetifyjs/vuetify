// Mixins
import Themeable from '../../mixins/themeable'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default Themeable.extend({
  name: 'theme-provider',

  props: {
    root: Boolean,
  },

  computed: {
    isDark (): boolean {
      return this.root
        ? this.rootIsDark
        : Themeable.options.computed.isDark.call(this)
    },
  },

  render (): VNode {
    return (
      this.$slots.default! &&
      this.$slots.default!.find(node => !node.isComment && node.text !== ' ')!
    )
  },
})
