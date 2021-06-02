import { provideDefaults } from '@/composables/defaults'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    defaults: Object,
  },

  setup (props, { slots }) {
    provideDefaults(props)

    return () => slots.default?.()
  },
})
