// Utility
import { genericComponent, useRender } from '@/util'

// Types
import type { GenericSlot } from '@/util'

export const VBreadcrumbsDivider = genericComponent<new () => {
  $props: GenericSlot
}>()({
  name: 'VBreadcrumbsDivider',

  props: {
    divider: [Number, String],
  },

  setup (props, { slots }) {
    useRender(() => (
      <li class="v-breadcrumbs-divider">
        { slots?.default?.() ?? props.divider }
      </li>
    ))

    return {}
  },
})
