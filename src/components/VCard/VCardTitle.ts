// Types
import Vue, { VNode } from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-card-title',

  functional: true,

  props: {
    primaryTitle: Boolean
  },

  render (h, { data, props, children }): VNode {
    data.staticClass = (`v-card__title ${data.staticClass || ''}`).trim()

    if (props.primaryTitle) data.staticClass += ' v-card__title--primary'

    return h('div', data, children)
  }
})
