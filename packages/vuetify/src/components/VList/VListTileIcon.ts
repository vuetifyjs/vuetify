// Types
import Vue, { VNode } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-list-tile-icon',

  functional: true,

  render (h, { data, children, props }): VNode {
    data.staticClass = (`v-list__tile__icon ${data.staticClass || ''}`).trim()

    return h('div', data, children)
  }
})
