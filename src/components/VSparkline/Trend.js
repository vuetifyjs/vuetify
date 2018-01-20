import props from './mixins/props'
import Path from './components/path'
import Gradient from './components/gradient'

export default {
  name: 'trend',

  mixins: [props],

  watch: {
    data: {
      immediate: true,
      handler () {
        this.$nextTick(() => {
          if (!this.autoDraw) {
            return
          }

          const path = this.$refs.path.$el
          const length = path.getTotalLength()

          path.style.transition = 'none'
          path.style.strokeDasharray = length + ' ' + length
          path.style.strokeDashoffset = Math.abs(length - (this.lastLength || 0))
          path.getBoundingClientRect()
          path.style.transition = `stroke-dashoffset ${this.autoDrawDuration}ms ${this.autoDrawEasing}`
          path.style.strokeDashoffset = 0
          this.lastLength = length
        })
      }
    }
  },

  render(h) {
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
          stroke: 'black',
          'stroke-width': this.lineWidth || 1,
          width: width || '100%',
          height: height || '25%',
          viewBox: `0 0 ${viewWidth} ${viewHeight}`
        }
      },
      [
        h(Gradient, { props }),
        h(Path, {
          props,
          ref: 'path'
        })
      ]
    )
  }
}
