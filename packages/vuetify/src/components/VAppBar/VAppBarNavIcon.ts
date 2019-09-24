// Components
import VIcon from '../VIcon'
import VBtn from '../VBtn/VBtn'

// Types
import Vue from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'v-app-bar-nav-icon',

  functional: true,

  render (h, { slots, listeners, props, data }) {
    const d = Object.assign(data, {
      staticClass: (`v-app-bar__nav-icon ${data.staticClass || ''}`).trim(),
      props: {
        ...props,
        icon: true,
      },
      on: listeners,
    })

    const defaultSlot = slots().default

    return h(VBtn, d, defaultSlot || [h(VIcon, '$menu')])
  },
})
