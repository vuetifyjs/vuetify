// Utility
import { genericComponent, useRender } from '@/util'

export const VBreadcrumbsDivider = genericComponent()({
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
