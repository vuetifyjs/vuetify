// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVBannerActionsProps = propsFactory({
  color: String,
  density: String,

  ...makeComponentProps(),
}, 'v-banner-actions')

export const VBannerActions = genericComponent()({
  name: 'VBannerActions',

  props: makeVBannerActionsProps(),

  setup (props, { slots }) {
    provideDefaults({
      VBtn: {
        color: props.color,
        density: props.density,
        variant: 'text',
      },
    })

    useRender(() => (
      <div
        class={[
          'v-banner-actions',
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

export type VBannerActions = InstanceType<typeof VBannerActions>
