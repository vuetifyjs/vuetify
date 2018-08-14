// Mixins
import Delayable from '../../mixins/delayable'
import Toggleable from '../../mixins/toggleable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'
import { combineListeners } from '../../util/helpers'

// Types
import { VNode } from 'vue'

/* @vue/component */
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
    onMouseEnter () {
      this.isActive = true
    },
    onMouseLeave () {
      this.isActive = false
    }
  },

  render (): any {
    if (!this.$scopedSlots.default && this.value === undefined) {
      consoleWarn('v-hover is missing a default scopedSlot or bound value', this)

      return null
    }

    let element = null

    if (this.$scopedSlots.default) {
      // TODO: types are wrong - https://github.com/vuejs/vue/pull/8644
      element = this.$scopedSlots.default({ hover: this.isActive }) as any as VNode
    } else if (this.$slots.default.length === 1) {
      element = this.$slots.default[0]
    }

    if (!element || typeof element === 'string' || Array.isArray(element)) {
      consoleWarn('v-hover should only contain a single element', this)

      return element
    }

    if (!this.disabled) {
      element.data!.on = this.$listeners

      element.data!.on = combineListeners(element.data!.on, {
        mouseenter: () => {
          this.runDelay('open', this.onMouseEnter)
        },
        mouseleave: () => {
          this.runDelay('close', this.onMouseLeave)
        }
      })
    }

    return element
  }
})
