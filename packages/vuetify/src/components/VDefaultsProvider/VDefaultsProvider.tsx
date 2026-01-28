// Composables
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { toRefs } from 'vue'
import { genericComponent, propsFactory, renderSlot } from '@/util'

// Types
import type { PropType } from 'vue'
import type { DefaultsOptions } from '@/composables/defaults'

export const makeVDefaultsProviderProps = propsFactory({
  defaults: Object as PropType<DefaultsOptions>,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean,
}, 'VDefaultsProvider')

export const VDefaultsProvider = genericComponent(false)({
  name: 'VDefaultsProvider',

  props: makeVDefaultsProviderProps(),

  setup (props, { slots }) {
    const { defaults, disabled, reset, root, scoped } = toRefs(props)

    provideDefaults(defaults, {
      reset,
      root,
      scoped,
      disabled,
    })

    return () => renderSlot(slots, 'default')
  },
})

export type VDefaultsProvider = InstanceType<typeof VDefaultsProvider>
