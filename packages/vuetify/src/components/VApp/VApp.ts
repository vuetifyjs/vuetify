// Styles
import './VApp.sass'

import { computed, h } from 'vue'

export default {
  name: 'VApp',

  setup (props, { attrs, slots }) {
    const classes = computed(() => ({
      'v-application': true,
    }))

    return () => (
      h('div', {
        class: classes.value,
        'data-app': true,
        ...attrs,
      }, slots.default())
    )
  }
}
