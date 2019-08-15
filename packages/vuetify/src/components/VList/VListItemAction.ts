// Types
import Vue, { VNode } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-list-item-action',

  functional: true,

  render (h, { data, children = [] }): VNode {
    data.staticClass = data.staticClass ? `v-list-item__action ${data.staticClass}` : 'v-list-item__action'
    const filteredChild = children.filter(VNode => {
      return VNode.isComment === false && VNode.text !== ' '
    })
    if (filteredChild.length > 1) data.staticClass += ' v-list-item__action--stack'

    return h('div', data, children)
  },
})
