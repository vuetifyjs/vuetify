// Styles
import './VLayout.sass'

// Composables
import { createLayout, makeLayoutProps } from '@/composables/layout'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VLayout = genericComponent()({
  name: 'VLayout',

  props: makeLayoutProps(),

  setup (props, { slots }) {
    const { layoutClasses, layoutStyles, getLayoutItem, items, layoutRef } = createLayout(props)

    useRender(() => (
      <div ref={ layoutRef } class={ layoutClasses.value } style={ layoutStyles.value }>
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
