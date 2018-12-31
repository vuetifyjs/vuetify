// Components
import Path from './components/path'
import Text from './components/text'
import Gradient from './components/gradient'

// Types
import { VNode } from 'vue'
import props from './mixins/props'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'
import { genPoints } from './helpers/core'

interface options {
  $refs: {
    path: InstanceType<typeof Path>
  }
}

export default mixins<options & ExtractVue<typeof props>>(props).extend({
  name: 'trend',

  data: () => ({
    lastLength: 0
  }),

  watch: {
    value: {
      immediate: true,
      handler () {
        this.$nextTick(() => {
          if (!this.autoDraw) return

          const path = this.$refs.path.$el
          const length = path.getTotalLength()

          path.style.transition = 'none'
          path.style.strokeDasharray = length + ' ' + length
          path.style.strokeDashoffset = Math.abs(length - (this.lastLength || 0)).toString()
          path.getBoundingClientRect()
          path.style.transition = `stroke-dashoffset ${this.autoDrawDuration}ms ${this.autoDrawEasing}`
          path.style.strokeDashoffset = '0'
          this.lastLength = length
        })
      }
    }
  },

  render (h): VNode {
    if (this.value.length < 2) return undefined as never

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
    props.points = genPoints(this.value, boundary)

    return h('svg', {
      attrs: {
        'stroke-width': this.lineWidth || 1,
        width: width || '100%',
        height: height || '25%',
        viewBox: `0 0 ${viewWidth} ${viewHeight}`
      }
    }, [
      h(Gradient, { props }),
      this.showLabel ? h(Text, { props }) : undefined as never,
      h(Path, {
        props,
        ref: 'path'
      })
    ])
  }
})
