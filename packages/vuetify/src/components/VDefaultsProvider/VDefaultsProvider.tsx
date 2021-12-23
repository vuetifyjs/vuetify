// Composables
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { defineComponent } from 'vue'

// Types
import type { DefaultsOptions } from '@/composables/defaults'
import type { PropType } from 'vue'

export const VDefaultsProvider = defineComponent({
  name: 'VDefaultsProvider',

  props: {
    defaults: Object as PropType<DefaultsOptions>,
    reset: [Number, String],
    root: Boolean,
    scoped: Boolean,
  },

  setup (props, { slots }) {
    provideDefaults(props)

    return () => slots.default?.()
  },
})
