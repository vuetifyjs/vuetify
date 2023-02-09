// Composables
import { makeVariantProps } from '@/composables/variant'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { genericComponent, useRender } from '@/util'
import { toRef } from 'vue'

// Types
import type { GenericSlot } from '@/util'

export const VToolbarItems = genericComponent<new () => {
  $props: GenericSlot
}>()({
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
