// Composables
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { toRefs } from 'vue'
import { genericComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DefaultsOptions } from '@/composables/defaults'

export const VDefaultsProvider = genericComponent(false)({
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
