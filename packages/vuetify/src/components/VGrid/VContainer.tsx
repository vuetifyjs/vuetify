// Styles
import './VGrid.sass'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { GenericSlot } from '@/util'

export const VContainer = genericComponent<new () => {
  $props: GenericSlot
}>()({
  name: 'VContainer',

  props: {
    fluid: {
      type: Boolean,
      default: false,
    },

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    useRender(() => (
      <props.tag
        class={[
          'v-container',
          { 'v-container--fluid': props.fluid },
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VContainer = InstanceType<typeof VContainer>
