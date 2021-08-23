// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { onMounted, ref } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VNoSsr',

  props: {
    ...makeTagProps({ tag: 'div' }),
  },

  setup (props, { attrs, slots }) {
    const show = ref(false)

    onMounted(() => {
      show.value = true
    })

    return () => {
      return show.value && (
        <props.tag>
          { slots.default?.() }
        </props.tag>
      )
    }
  },

})
