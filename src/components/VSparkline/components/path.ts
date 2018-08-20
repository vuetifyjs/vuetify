import Vue, { VNode } from 'vue'
import { Prop } from 'vue/types/options'

import { Point } from '../VSparkline'
import { genPath } from '../helpers/path'

export default Vue.extend<Vue & { $el: SVGPathElement }>().extend({
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
