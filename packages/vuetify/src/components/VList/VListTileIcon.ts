// Types
import Vue, { VNode } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-list-tile-icon',

  functional: true,

  props: {
    left: Boolean,
    right: Boolean
  },

  render (h, { data, children, props }): VNode {
    data.staticClass = (`v-list__tile__icon ${data.staticClass || ''}`).trim()

    if (props.left) data.staticClass += ' v-list__tile__icon--left'
    if (props.right) data.staticClass += ' v-list__tile__icon--right'

    return h('div', data, children)
  }
})
