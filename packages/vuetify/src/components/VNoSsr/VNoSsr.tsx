// Utilities
import { defineComponent, IN_BROWSER } from '@/util'
import { onMounted, ref } from 'vue'

function doesHydrate (fn: () => void) {
  if (!IN_BROWSER) return
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
