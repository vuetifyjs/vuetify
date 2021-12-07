// Components
import { VLabel } from '@/components/VLabel'

// Utilities
import { defineComponent } from '@/util'

export const VFieldLabel = defineComponent({
  name: 'VFieldLabel',

  props: {
    floating: Boolean,
  },

  setup (props, { slots }) {
    return () => {
      return (
        <VLabel
          class={[
            'v-field-label',
            { 'v-field-label--floating': props.floating },
          ]}
          aria-hidden={ props.floating || undefined }
          v-slots={ slots }
        />
      )
    }
  },
})

export type VFieldLabel = InstanceType<typeof VFieldLabel>
