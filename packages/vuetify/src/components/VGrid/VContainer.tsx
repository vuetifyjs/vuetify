// Styles
import './VGrid.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
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
  ...makeDimensionProps(),
  ...makeTagProps(),
}, 'VContainer')

export const VContainer = genericComponent()({
  name: 'VContainer',

  props: makeVContainerProps(),

  setup (props, { slots }) {
    const { rtlClasses } = useRtl()
    const { dimensionStyles } = useDimension(props)

    useRender(() => (
      <props.tag
        class={[
          'v-container',
          { 'v-container--fluid': props.fluid },
          rtlClasses.value,
          props.class,
        ]}
        style={[
          dimensionStyles.value,
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VContainer = InstanceType<typeof VContainer>
