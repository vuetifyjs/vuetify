// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCardTitleProps = propsFactory({
  wrap: Boolean,

  ...makeComponentProps(),
  ...makeTagProps({ tag: 'div' }),
}, 'VCardTitle')

export const VCardTitle = genericComponent()({
  name: 'VCardTitle',

  props: makeVCardTitleProps(),

  setup (props, { slots }) {
    useRender(() => {
      return (
        <props.tag
          class={[
            'v-card-title',
            { 'v-card-title--wrap': props.wrap },
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

export type VCardTitle = InstanceType<typeof VCardTitle>;
