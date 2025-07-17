// Components
import { VLabel } from '@/components/VLabel'

// Composables
import { makeComponentProps } from '@/composables/component'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVFieldLabelProps = propsFactory({
  floating: Boolean,

  ...makeComponentProps(),
}, 'VFieldLabel')

export const VFieldLabel = genericComponent()({
  name: 'VFieldLabel',

  props: makeVFieldLabelProps(),

  setup (props, { slots }) {
    useRender(() => (
      <VLabel
        class={[
          'v-field-label',
          { 'v-field-label--floating': props.floating },
          props.class,
        ]}
        style={ props.style }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VFieldLabel = InstanceType<typeof VFieldLabel>
