// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCardTitleProps = propsFactory({
  truncate: {
    type: Boolean,
    default: true,
  },

  ...makeComponentProps(),
  ...makeTagProps({ tag: 'div' }),
}, 'VCardTitle')

export type VCardTitle = InstanceType<typeof VCardTitle>

export const VCardTitle = genericComponent()({
  name: 'VCardTitle',

  props: makeVCardTitleProps(),

  setup (props, { slots }) {
    useRender(() => {
      return (
        <props.tag
          class={[
            'v-card-title',
            {
              'v-card-title--truncate': props.truncate,
              'v-card-title--wrap': !props.truncate,
            },
            props.class,
          ]}
          style={ props.style }
        >
          { slots.default?.() }
        </props.tag>
      )
    })

    return {}
  },
})