// Types
import Vue, { VNode } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-list-tile-action',

  functional: true,

  props: {
    left: Boolean,
    right: Boolean
  },

  render (h, { data, children = [], props }): VNode {
    data.staticClass = data.staticClass ? `v-list__tile__action ${data.staticClass}` : 'v-list__tile__action'
    const filteredChild = children.filter(VNode => {
      return VNode.isComment === false && VNode.text !== ' '
    })
    if (filteredChild.length > 1) data.staticClass += ' v-list__tile__action--stack'
    if (props.left) data.staticClass += ' v-list__tile__action--left'
    if (props.right) data.staticClass += ' v-list__tile__action--right'

    return h('div', data, children)
  }
})
