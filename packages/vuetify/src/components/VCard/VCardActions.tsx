// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCardActionsProps = propsFactory({
  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VCardActions')

export const VCardActions = genericComponent()({
  name: 'VCardActions',

  props: makeVCardActionsProps(),

  setup (props, { slots }) {
    provideDefaults({
      VBtn: {
        slim: true,
        variant: 'text',
      },
    })

    useRender(() => (
      <props.tag
        class={[
          'v-card-actions',
          props.class,
        ]}
        style={ props.style }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VCardActions = InstanceType<typeof VCardActions>
