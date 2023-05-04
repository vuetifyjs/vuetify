// Styles
import './VGrid.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VContainer = genericComponent()({
  name: 'VContainer',

  props: {
    fluid: {
      type: Boolean,
      default: false,
    },

    ...makeComponentProps(),
    ...makeTagProps(),
  },

  setup (props, { slots }) {
    useRender(() => (
      <props.tag
        class={[
          'v-container',
          { 'v-container--fluid': props.fluid },
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
