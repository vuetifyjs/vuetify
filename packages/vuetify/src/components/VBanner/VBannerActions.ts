// Styles
import './VBannerActions.scss'

// Utilities
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'VBannerActions',

  inheritAttrs: false,

  setup (props, { slots }) {
    return () => h('div', {
      class: 'v-banner__actions',
    }, slots.actions?.())
  },
})
