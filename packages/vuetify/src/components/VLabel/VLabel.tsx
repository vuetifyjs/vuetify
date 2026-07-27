// Styles
import './VLabel.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { EventProp, genericComponent, propsFactory, useRender } from '@/util'

export const makeVLabelProps = propsFactory({
  text: String,

  onClick: EventProp<[MouseEvent]>(),

  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VLabel')

export const VLabel = genericComponent()({
  name: 'VLabel',

  props: makeVLabelProps(),

  setup (props, { slots }) {
    useRender(() => (
      <label
        class={[
          'v-label',
          {
            'v-label--clickable': !!props.onClick,
          },
          props.class,
        ]}
        style={ props.style }
        onClick={ props.onClick }
      >
        { props.text }

        { slots.default?.() }
      </label>
    ))

    return {}
  },
})

export type VLabel = InstanceType<typeof VLabel>
