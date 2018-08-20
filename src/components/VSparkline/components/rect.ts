import Vue, { VNode } from 'vue'
import { Prop } from 'vue/types/options'

import { Boundary, Point } from '../VSparkline'

export default Vue.extend({
  props: [
    'id',
    'smooth',
    'boundary',
    'lineWidth',
    'gradient',
    'autoDrawDuration',
    'autoDraw',
    'points',
    'offsetX'
  ] as any as {
    id: Prop<string>
    smooth: Prop<boolean>
    boundary: Prop<Boundary>
    lineWidth: Prop<number>
    gradient: Prop<string[]>
    autoDrawDuration: Prop<number>
    autoDraw: Prop<boolean>
    points: Prop<Point[]>
    offsetX: Prop<number>
  },

  render (h): VNode {
    const { maxY } = this.boundary
    const rounding = this.smooth ? 2 : Number(this.smooth)

    return h('clipPath', {
      attrs: {
        id: `${this.id}-clip`
      }
    }, this.points.map((item, index) =>
      h('rect', {
        attrs: {
          x: item.x - this.offsetX,
          y: 0,
          width: this.lineWidth,
          height: maxY - item.y,
          rx: rounding,
          ry: rounding
        }
      }, [
        this.autoDraw ? h('animate', {
          attrs: {
            attributeName: 'height',
            from: 0,
            to: maxY - item.y,
            dur: `${this.autoDrawDuration}ms`,
            fill: 'freeze'
          }
        }) : undefined as never
      ])
    ))
  }
})
