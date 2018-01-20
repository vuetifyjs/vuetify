import props from './mixins/props'
import Rect from './components/rect'
import Gradient from './components/gradient'

export default {
  name: 'bar',

  mixins: [props],

  render (h) {
    if (!this.data || this.data.length < 2) return
    const { width, height, padding } = this
    const viewWidth = width || 300
    const viewHeight = height || 75
    const boundary = {
      minX: padding,
      minY: padding,
      maxX: viewWidth - padding,
      maxY: viewHeight - padding
    }
    const props = this.$props

    props.boundary = boundary
    props.id = 'sparkline-trend-' + this._uid

    return h(
      'svg',
      {
        attrs: {
          width: width || '100%',
          height: height || '25%',
          viewBox: `0 0 ${viewWidth} ${viewHeight}`
        }
      },
      [
        h(Gradient, { props }),
        h(Rect, { props }),
        h('g', {
          attrs: {
            'clip-path': `url(#${props.id}-clip)`,
            fill: `url(#${props.id})`
          }
        }, [
          h('rect', {
            attrs: {
              x: 0,
              y: 0,
              width: viewWidth,
              height: viewHeight
            }
          })
        ])
      ]
    )
  }
}
