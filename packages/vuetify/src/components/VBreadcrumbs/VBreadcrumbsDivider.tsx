// Composables
import { makeComponentProps } from '@/composables/component'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVBreadcrumbsDividerProps = propsFactory({
  divider: [Number, String],

  ...makeComponentProps(),
}, 'VBreadcrumbsDivider')

export const VBreadcrumbsDivider = genericComponent()({
  name: 'VBreadcrumbsDivider',

  props: makeVBreadcrumbsDividerProps(),

  setup (props, { slots }) {
    useRender(() => (
      <li
        aria-hidden="true"
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

export type VBreadcrumbsDivider = InstanceType<typeof VBreadcrumbsDivider>
