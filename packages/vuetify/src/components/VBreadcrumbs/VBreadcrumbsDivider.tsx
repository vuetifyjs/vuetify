// Utility
import { defineComponent, useRender } from '@/util'

export const VBreadcrumbsDivider = defineComponent({
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
