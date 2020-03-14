import './_grid.sass'

import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'v-spacer',

  render (h): VNode {
    return h('div', {
      staticClass: 'spacer v-spacer',
      attrs: {
        role: 'presentation',
      },
    }, this.$slots.default)
  },
})
