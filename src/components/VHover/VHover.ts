import Vue, { VNode } from 'vue'
import { consoleWarn } from '../../util/console'

export default Vue.extend({
  data: () => ({
    hover: false
  }),

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

    element.data!.on!.mouseenter = () => (this.hover = true)
    element.data!.on!.mouseleave = () => (this.hover = false)

    return element
  }
})
