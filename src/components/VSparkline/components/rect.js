import { genPoints } from '../helpers/core'

export default {
  props: [
    'id',
    'smooth',
    'data',
    'boundary',
    'barWidth',
    'gradient',
    'autoDrawDuration',
    'autoDraw'
  ],

  render (h) {
    const points = genPoints(this.data, this.boundary)
    const props = this.$props
    const { maxX, maxY } = props.boundary
    const totalWidth = maxX / (points.length - 1)
    if (!props.barWidth) {
      props.barWidth = totalWidth - (props.padding || 5)
    }
    const rounding = props.smooth ? 2 : 0
    const offsetX = (totalWidth - props.barWidth) / 2

    return h(
      'clipPath',
      {
        attrs: {
          transform: `scale(1,-1) translate(0,-${this.boundary.maxY})`,
          id: `${props.id}-clip`
        }
      },
      points.map((item, index) =>
        h(
          'rect',
          {
            attrs: {
              x: item.x - offsetX,
              y: 0,
              width: props.barWidth,
              height: maxY - item.y,
              rx: rounding,
              ry: rounding
            }
          },
          [
            this.autoDraw ? h('animate', {
              attrs: {
                attributeName: 'height',
                from: 0,
                to: maxY - item.y,
                dur: `${props.autoDrawDuration}ms`,
                fill: 'freeze'
              }
            }) : null
          ]
        )
      )
    )
  }
}
