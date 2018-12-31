// Components
import { Point } from '../VSparkline'

// Utilities
import { genPath } from '../helpers/path'

// Types
import Vue, { VNode } from 'vue'
import { Prop } from 'vue/types/options'

export default Vue.extend<Vue & { $el: SVGPathElement }>().extend({
  name: 'VSparklinePath',

  props: ['smooth', 'radius', 'id', 'points'] as any as {
    smooth: Prop<boolean>
    radius: Prop<number>
    id: Prop<string>
    points: Prop<Point[]>
  },

  render (h): VNode {
    const { smooth, id } = this
    const radius = smooth === true ? 8 : Number(smooth)
    const d = genPath(this.points, radius)

    return h('path', {
      attrs: { d, fill: 'none', stroke: `url(#${id})` }
    })
  }
})
