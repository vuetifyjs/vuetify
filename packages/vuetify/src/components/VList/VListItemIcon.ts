import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'v-list-item-icon',

  setup (props, { slots }) {
    return () => h('div', {
      class: 'v-list-item__icon',
    }, slots.default?.())
  },
})
