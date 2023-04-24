// Composables
import { makeComponentProps } from '@/composables/component'

// Utility
import { genericComponent, useRender } from '@/util'

export const VBreadcrumbsDivider = genericComponent()({
  name: 'VBreadcrumbsDivider',

  props: {
    divider: [Number, String],

    ...makeComponentProps(),
  },

  setup (props, { slots }) {
    useRender(() => (
      <li
        class={[
          'v-breadcrumbs-divider',
          props.class,
        ]}
        style={ props.style }
      >
        { slots?.default?.() ?? props.divider }
      </li>
    ))

    return {}
  },
})
