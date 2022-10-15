// Composables
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { defineComponent, toRefs } from 'vue'

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
    const { defaults, reset, root, scoped } = toRefs(props)

    provideDefaults(defaults, {
      reset,
      root,
      scoped,
    })

    return () => slots.default?.()
  },
})

export type VDefaultsProvider = InstanceType<typeof VDefaultsProvider>
