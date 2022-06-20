// Composables
import { makeVariantProps } from '@/composables/variant'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { defineComponent } from '@/util'
import { toRef } from 'vue'

export const VToolbarItems = defineComponent({
  name: 'VToolbarItems',

  props: {
    ...makeVariantProps({ variant: 'tonal' }),
  },

  setup (props, { slots }) {
    provideDefaults({
      VBtn: {
        color: toRef(props, 'color'),
        variant: toRef(props, 'variant'),
      },
    })

    return () => slots.default?.()
  },
})

export type VToolbarItems = InstanceType<typeof VToolbarItems>
