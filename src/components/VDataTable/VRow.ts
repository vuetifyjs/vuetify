import Vue, { VNode } from 'vue'
import { VRowRegular, VRowFunctional } from '.'

export default Vue.extend({
  name: 'v-row',

  functional: true,

  props: {
    functional: Boolean
  },

  render (h, ctx): VNode {
    return h(ctx.props.functional ? VRowFunctional : VRowRegular, {
      props: ctx.data.attrs,
      ...ctx.data
    }, ctx.children)
  }
})
