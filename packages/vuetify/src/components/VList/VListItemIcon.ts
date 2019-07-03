// Types
import Vue, { VNode } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-list-item-icon',

  functional: true,

  render (h, { data, children }): VNode {
    data.staticClass = (`v-list-item__icon ${data.staticClass || ''}`).trim()

    return h('div', data, children)
  },
})
