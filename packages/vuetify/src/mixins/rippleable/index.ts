// Directives
import ripple from '../../directives/ripple'

// Types
import Vue, { VNode, VNodeData, VNodeDirective } from 'vue'

export default Vue.extend({
  name: 'rippleable',

  directives: { ripple },

  props: {
    ripple: {
      type: [Boolean, Object],
      default: true,
    },
  },

  methods: {
    genRipple (data: VNodeData = {}): VNode | null {
      if (!this.ripple) return null

      data.staticClass = 'v-input--selection-controls__ripple'

      data.directives = data.directives || []
      data.directives.push({
        name: 'ripple',
        value: { center: true },
      } as VNodeDirective)

      return this.$createElement('div', data)
    },
  },
})
