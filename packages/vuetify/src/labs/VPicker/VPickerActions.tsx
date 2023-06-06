// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VPickerActions = genericComponent()({
  name: 'VPickerActions',

  props: makeComponentProps(),

  setup (props, { slots }) {
    provideDefaults({
      VBtn: {
        variant: 'text',
      },
    })

    useRender(() => (
      <div
        class={[
          'v-picker-actions',
          props.class,
        ]}
        style={ props.style }
      >
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})

export type VPickerActions = InstanceType<typeof VPickerActions>
