// Components
import { VLabel } from '@/components/VLabel'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VFieldLabel = genericComponent()({
  name: 'VFieldLabel',

  props: {
    floating: Boolean,
  },

  setup (props, { slots }) {
    useRender(() => (
      <VLabel
        class={[
          'v-field-label',
          { 'v-field-label--floating': props.floating },
        ]}
        aria-hidden={ props.floating || undefined }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VFieldLabel = InstanceType<typeof VFieldLabel>
