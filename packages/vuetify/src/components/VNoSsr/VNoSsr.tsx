// Composables
import { useHydration } from '@/composables/hydration'

// Utilities
import { defineComponent } from '@/util'
import { ref } from 'vue'

export default defineComponent({
  name: 'VNoSsr',

  setup (_, { slots }) {
    const show = ref(false)

    useHydration(() => (show.value = true))

    return () => show.value && slots.default?.()
  },

})
