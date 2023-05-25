// Composables
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { toRefs } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DefaultsOptions } from '@/composables/defaults'

export const makeDefaultsProviderProps = propsFactory({
  defaults: Object as PropType<DefaultsOptions>,
  disabled: Boolean,
  reset: [Number, String],
  root: Boolean,
  scoped: Boolean,
}, 'v-defaults-provider')

export const VDefaultsProvider = genericComponent(false)({
  name: 'VDefaultsProvider',

  props: makeDefaultsProviderProps(),

  setup (props, { slots }) {
    const { defaults, disabled, reset, root, scoped } = toRefs(props)

    provideDefaults(defaults, {
      reset,
      root,
      scoped,
      disabled,
    })

    return () => slots.default?.()
  },
})

export type VDefaultsProvider = InstanceType<typeof VDefaultsProvider>
