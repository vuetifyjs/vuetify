// Styles
import './_grid.sass'

// Types
import Vue, { VNode } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-spacer',

  functional: true,

  render (h, { children }): VNode {
    return h('div', {
      staticClass: 'spacer v-spacer',
      attrs: { role: 'presentation' },
    }, children)
  },
})
