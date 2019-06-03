// Mixins
import Delayable from '../../mixins/delayable'
import Toggleable from '../../mixins/toggleable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import { VNode, ScopedSlotChildren } from 'vue/types/vnode'

export default mixins(
  Delayable,
  Toggleable
  /* @vue/component */
).extend({
  name: 'v-hover',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: undefined,
    },
  },

  methods: {
    onMouseEnter () {
      this.runDelay('open')
    },
    onMouseLeave () {
      this.runDelay('close')
    },
  },

  render (): VNode {
    if (!this.$scopedSlots.default && this.value === undefined) {
      consoleWarn('v-hover is missing a default scopedSlot or bound value', this)

      return null as any
    }

    let element: VNode | ScopedSlotChildren

    /* istanbul ignore else */
    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default({ hover: this.isActive })
    }

    if (Array.isArray(element) && element.length === 1) {
      element = element[0]
    }

    if (!element || Array.isArray(element) || !element.tag) {
      consoleWarn('v-hover should only contain a single element', this)

      return element as any
    }

    if (!this.disabled) {
      element.data = element.data || {}
      this._g(element.data, {
        mouseenter: this.onMouseEnter,
        mouseleave: this.onMouseLeave,
      })
    }

    return element
  },
})
