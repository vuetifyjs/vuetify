// Mixins
import Delayable from '../../mixins/delayable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import { VNode } from 'vue'

export default mixins(Delayable).extend({
  name: 'v-hover',

  data: () => ({
    hover: false
  }),

  methods: {
    __onMouseEnter () {
      this.hover = true
    },
    __onMouseLeave () {
      this.hover = false
    }
  },

  render (): any {
    if (!this.$scopedSlots.default) {
      consoleWarn('v-hover is missing a default scopedSlot', this)

      return null
    }

    // TODO: types are wrong - https://github.com/vuejs/vue/pull/8644
    const element = this.$scopedSlots.default({ hover: this.hover }) as any as VNode

    if (typeof element === 'string' || Array.isArray(element)) {
      consoleWarn('v-hover should only contain a single element', this)

      return null
    }

    element.data!.on = element.data!.on || {}

    element.data!.on!.mouseenter = () => {
      this.runDelay('open', this.__onMouseEnter)
    }
    element.data!.on!.mouseleave = () => {
      this.runDelay('close', this.__onMouseLeave)
    }

    return element
  }
})
