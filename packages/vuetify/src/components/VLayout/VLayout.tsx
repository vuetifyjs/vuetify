// Styles
import './VLayout.sass'

// Composables
import { createLayout, makeLayoutProps } from '@/composables/layout'
import { makeComponentProps } from '@/composables/component'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VLayout = genericComponent()({
  name: 'VLayout',

  props: {
    ...makeComponentProps(),
    ...makeLayoutProps(),
  },

  setup (props, { slots }) {
    const { layoutClasses, layoutStyles, getLayoutItem, items, layoutRef } = createLayout(props)

    useRender(() => (
      <div
        ref={ layoutRef }
        class={[
          layoutClasses.value,
          props.class,
        ]}
        style={[
          layoutStyles.value,
          props.style,
        ]}
      >
        { slots.default?.() }
      </div>
    ))

    return {
      getLayoutItem,
      items,
    }
  },
})

export type VLayout = InstanceType<typeof VLayout>
