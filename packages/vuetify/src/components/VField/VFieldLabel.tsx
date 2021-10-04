// Utilities
import { genericComponent } from '@/util'

// Composables
import { makeThemeProps } from '@/composables/theme'

export const VFieldLabel = genericComponent<new () => {
  $el: HTMLElement
}>()({
  name: 'VFieldLabel',

  props: {
    floating: Boolean,

    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    return () => {
      return (
        <label
          class={[
            'v-field-label',
            { 'v-field-label--floating': props.floating },
          ]}
          aria-hidden={ props.floating || undefined }
        >
          { slots.default?.() }
        </label>
      )
    }
  },
})

export type VFieldLabel = InstanceType<typeof VFieldLabel>
type T = typeof VFieldLabel
