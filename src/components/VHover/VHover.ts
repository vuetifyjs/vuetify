// Mixins
import Delayable from '../../mixins/delayable'
import Toggleable from '../../mixins/toggleable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import { VNode } from 'vue'

export default mixins(
  Delayable,
  Toggleable
).extend({
  name: 'v-hover',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: undefined
    }
  },

  methods: {
    __onMouseEnter () {
      this.isActive = true
    },
    __onMouseLeave () {
      this.isActive = false
    }
  },

  render (): any {
    if (!this.$scopedSlots.default && this.value === undefined) {
      consoleWarn('v-hover is missing a default scopedSlot or bound value', this)

      return null
    }

    let element = null

    // TODO: types are wrong - https://github.com/vuejs/vue/pull/8644
    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default({ hover: this.isActive }) as any as VNode
    } else if (this.$slots.default.length === 1) {
      element = this.$slots.default[0]
    }

    if (!element || typeof element === 'string' || Array.isArray(element)) {
      consoleWarn('v-hover should only contain a single element', this)

      return element
    }

    if (!this.disabled) {
      element.data!.on = element.data!.on || {}

      element.data!.on!.mouseenter = () => {
        this.runDelay('open', this.__onMouseEnter)
      }
      element.data!.on!.mouseleave = () => {
        this.runDelay('close', this.__onMouseLeave)
      }
    }

    return element
  }
})
