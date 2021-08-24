import { provideDefaults } from '@/composables/defaults'
import { defineComponent } from 'vue'

import type { PropType } from 'vue'
import type { DefaultsOptions } from '@/composables/defaults'

export default defineComponent({
  props: {
    defaults: Object as PropType<DefaultsOptions>,
  },

  setup (props, { slots }) {
    provideDefaults(props)

    return () => slots.default?.()
  },
})
