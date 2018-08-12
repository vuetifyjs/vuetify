import Vue from 'vue'
import { consoleWarn } from '../../util/console'

export default Vue.extend({
  data: () => ({
    hover: false
  }),

  render (): any {
    if (!this.$scopedSlots.default) {
      consoleWarn('v-hover is missing a default scopedSlot')

      return null
    }

    const element = this.$scopedSlots.default({ hover: this.hover })

    element.data.on = element.data.on || {}

    element.data.on.mouseenter = () => (this.hover = true)
    element.data.on.mouseleave = () => (this.hover = false)

    return element
  }
})
