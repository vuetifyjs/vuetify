
// Utilities
import { onMounted, ref } from 'vue'
import { defineComponent } from '@/util'

function doesHydrate (fn: () => void) {
  if (typeof window === 'undefined') return
  // @ts-expect-error
  return document.querySelector('#app')?.__vue_app__ ? fn() : onMounted(fn)
}

export default defineComponent({
  name: 'VNoSsr',

  setup (_, { slots }) {
    const show = ref(false)

    doesHydrate(() => {
      show.value = true
    })

    return () => show.value && slots.default?.()
  },

})
