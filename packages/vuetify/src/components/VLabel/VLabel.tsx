// Styles
import './VLabel.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVLabelProps = propsFactory({
  text: String,
  clickable: Boolean,

  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'v-label')

export const VLabel = genericComponent()({
  name: 'VLabel',

  props: makeVLabelProps(),

  setup (props, { slots }) {
    useRender(() => (
      <label
        class={[
          'v-label',
          {
            'v-label--clickable': props.clickable,
          },
          props.class,
        ]}
        style={ props.style }
      >
        { props.text }

        { slots.default?.() }
      </label>
    ))

    return {}
  },
})

export type VLabel = InstanceType<typeof VLabel>
