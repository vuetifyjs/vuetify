// Styles
import './VApp.sass'

import { defineComponent, computed, h, mergeProps } from 'vue'

export default defineComponent({
  name: 'VApp',

  setup (props, { attrs, slots }) {
    const classes = computed(() => ({
      'v-application': true,
    }))

    return () => (
      h('div', mergeProps(attrs, {
        class: classes.value,
        'data-app': true,
      }), h('div', {
        class: 'v-application__wrap',
      }, slots.default()))
    )
  },
})
