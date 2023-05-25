// Styles
import './VGrid.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useRtl } from '@/composables/locale'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false,
  },

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'v-container')

export const VContainer = genericComponent()({
  name: 'VContainer',

  props: makeVContainerProps(),

  setup (props, { slots }) {
    const { rtlClasses } = useRtl()

    useRender(() => (
      <props.tag
        class={[
          'v-container',
          { 'v-container--fluid': props.fluid },
          rtlClasses.value,
          props.class,
        ]}
        style={ props.style }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VContainer = InstanceType<typeof VContainer>
