// Components
import { VLabel } from '@/components/VLabel'

// Composables
import { makeComponentProps } from '@/composables/component'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VFieldLabel = genericComponent()({
  name: 'VFieldLabel',

  props: {
    floating: Boolean,

    ...makeComponentProps(),
  },

  setup (props, { slots }) {
    useRender(() => (
      <VLabel
        class={[
          'v-field-label',
          { 'v-field-label--floating': props.floating },
          props.class,
        ]}
        style={ props.style }
        aria-hidden={ props.floating || undefined }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VFieldLabel = InstanceType<typeof VFieldLabel>
