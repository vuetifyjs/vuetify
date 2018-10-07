import Vue, { VNode } from 'vue'
import { convertToUnit } from '../../util/helpers'

export default Vue.extend({
  name: 'v-table',

  functional: true,

  props: {
    height: [String, Number]
  },

  render (h, ctx): VNode {
    const table = h('table', ctx.children)
    const data = Object.assign({}, ctx.data)

    if (ctx.props.height) {
      data.style = Object.assign({}, data.style, {
        height: convertToUnit(ctx.props.height)
      })
    }

    return h('div', data, [table])
  }
})
