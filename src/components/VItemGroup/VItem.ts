// Mixins
import Groupable from '../../mixins/groupable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import { VNode, VNodeChildrenArrayContents } from 'vue/types/vnode'

export default mixins(
  Groupable
).extend({
  name: 'v-item',

  render (): VNode {
    if (!this.$scopedSlots.default) {
      consoleWarn('v-item is missing a default scopedSlot', this)

      return null as any
    }

    let element: VNode | VNodeChildrenArrayContents | string | undefined

    /* istanbul ignore else */
    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default({ active: this.isActive })
    }

    if (!element || typeof element === 'string' || Array.isArray(element)) {
      consoleWarn('v-item should only contain a single element', this)

      return element as any
    }

    if (!this.disabled) {
      element.data = element.data || {}

      this._g(element.data, {
        click: this.onClick
      })
    }

    return element
  }
})
