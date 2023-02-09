// Styles
import './VLabel.sass'

// Composables
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { GenericSlot } from '@/util'

export const VLabel = genericComponent<new () => {
  $props: GenericSlot
}>()({
  name: 'VLabel',

  props: {
    text: String,
    clickable: Boolean,

    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    useRender(() => (
      <label
        class={[
          'v-label',
          {
            'v-label--clickable': props.clickable,
          },
        ]}
      >
        { props.text }

        { slots.default?.() }
      </label>
    ))

    return {}
  },
})

export type VLabel = InstanceType<typeof VLabel>
