// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVToolbarItemsProps = propsFactory({
  ...makeComponentProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'v-toolbar-items')

export const VToolbarItems = genericComponent()({
  name: 'VToolbarItems',

  props: makeVToolbarItemsProps(),

  setup (props, { slots }) {
    provideDefaults({
      VBtn: {
        color: toRef(props, 'color'),
        height: 'inherit',
        variant: toRef(props, 'variant'),
      },
    })

    useRender(() => (
      <div
        class={[
          'v-toolbar-items',
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

export type VToolbarItems = InstanceType<typeof VToolbarItems>
