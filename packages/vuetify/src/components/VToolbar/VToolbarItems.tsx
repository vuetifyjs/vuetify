// Composables
import { makeVariantProps } from '@/composables/variant'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { defineComponent, useRender } from '@/util'
import { toRef } from 'vue'

export const VToolbarItems = defineComponent({
  name: 'VToolbarItems',

  props: makeVariantProps({ variant: 'text' }),

  setup (props, { slots }) {
    provideDefaults({
      VBtn: {
        color: toRef(props, 'color'),
        height: 'inherit',
        variant: toRef(props, 'variant'),
      },
    })

    useRender(() => (
      <div class="v-toolbar-items">
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})

export type VToolbarItems = InstanceType<typeof VToolbarItems>
