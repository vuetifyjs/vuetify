// Utilities
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'VBannerActions',

  inheritAttrs: false,

  render () {
    return h('div', {
      class: 'v-banner__actions',
    }, this.$slots.actions?.())
  },
})
