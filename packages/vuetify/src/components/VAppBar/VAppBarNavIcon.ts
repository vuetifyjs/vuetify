// Components
import VIcon from '../VIcon'
import VBtn from '../VBtn/VBtn'

// Types
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'v-app-bar-nav-icon',

  setup (props, { attrs, slots }) {
    return h(VBtn, {
      ...attrs,
      class: 'v-app-bar__nav-icon',
      icons: true,
    }, slots.default || h(VIcon, '$menu'))
  }
})
