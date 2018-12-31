// Mixins
import Colorable from '../../../mixins/colorable'

// Utilities
import mixins from '../../../util/mixins'

// Types
import { VNode } from 'vue'
import { Prop } from 'vue/types/options'

export default mixins(Colorable).extend({
  name: 'VSparklineGradient',

  props: ['gradient', 'id', 'gradientDirection'] as any as {
    gradient: Prop<string[]>
    id: Prop<string>
    gradientDirection: Prop<string>
  },

  render (h): VNode {
    const { id, gradientDirection } = this
    const gradient = this.gradient.slice()

    // Pushes empty string to force
    // a fallback to currentColor
    if (!gradient.length) gradient.push('')

    const len = Math.max(gradient.length - 1, 1)
    const stops = gradient.reverse().map((color, index) =>
      h('stop', {
        attrs: {
          offset: index / len,
          'stop-color': color || 'currentColor'
        }
      })
    )

    return h('defs', [
      h('linearGradient', this.setTextColor(this.color, {
        attrs: {
          id,
          x1: +(gradientDirection === 'left'),
          y1: +(gradientDirection === 'top'),
          x2: +(gradientDirection === 'right'),
          y2: +(gradientDirection === 'bottom')
        }
      }), stops)
    ])
  }
})
