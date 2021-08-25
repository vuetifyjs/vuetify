
// Utilities
import { onMounted, ref } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VNoSsr',

  setup (props, { slots }) {
    const show = ref(false)

    onMounted(() => {
      show.value = true
    })

    return () => show.value && slots.default?.()
  },

})
