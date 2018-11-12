/* eslint-disable no-multi-spaces, object-property-newline */

import Vue, { VNode } from 'vue'
import { Prop } from 'vue/types/options'

export default Vue.extend({
  props: ['gradient', 'id', 'gradientDirection'] as any as {
    gradient: Prop<string[]>
    id: Prop<string>
    gradientDirection: Prop<string>
  },

  render (h): VNode {
    const { gradient, id, gradientDirection } = this
    const len = gradient.length - 1
    const stops = gradient.slice().reverse().map((color, index) =>
      h('stop', {
        attrs: {
          offset: index / len,
          'stop-color': color
        }
      })
    )

    return h('defs', [
      h('linearGradient', {
        attrs: {
          id,
          x1: +(gradientDirection === 'left'),  y1: +(gradientDirection === 'top'),
          x2: +(gradientDirection === 'right'), y2: +(gradientDirection === 'bottom')
        }
      }, stops)
    ])
  }
})
