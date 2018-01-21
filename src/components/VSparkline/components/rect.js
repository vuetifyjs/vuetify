export default {
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
  ],

  render (h) {
    const { maxY } = this.boundary
    const rounding = this.smooth ? 2 : Number(this.smooth)

    return h(
      'clipPath',
      {
        attrs: {
          id: `${this.id}-clip`
        }
      },
      this.points.map((item, index) =>
        h(
          'rect',
          {
            attrs: {
              x: item.x - this.offsetX,
              y: 0,
              width: this.lineWidth,
              height: maxY - item.y,
              rx: rounding,
              ry: rounding
            }
          },
          [
            this.autoDraw && h('animate', {
              attrs: {
                attributeName: 'height',
                from: 0,
                to: maxY - item.y,
                dur: `${this.autoDrawDuration}ms`,
                fill: 'freeze'
              }
            })
          ]
        )
      )
    )
  }
}
