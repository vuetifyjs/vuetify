import Vue, { VNode } from 'vue'
import { Prop } from 'vue/types/options'

import { Boundary, Point } from '../VSparkline'

export default Vue.extend({
  props: ['points', 'boundary', 'offsetX'] as any as {
    points: Prop<Point[]>
    boundary: Prop<Boundary>
    offsetX: Prop<number>
  },

  render (h): VNode {
    const offsetX = (this.offsetX || 0) / 2

    return h('g', {
      style: {
        fontSize: '8',
        textAnchor: 'middle',
        dominantBaseline: 'mathematical',
        fill: this.$vuetify.theme.secondary
      }
    }, this.points.map(item => (
      h('text', {
        attrs: {
          x: item.x - offsetX,
          y: this.boundary.maxY + 2
        }
      }, item.value.toString())
    )))
  }
})
