// Styles
import './VLayout.sass'

// Composables
import { createLayout, makeLayoutProps } from '@/composables/layout'

// Utilities
import { Suspense } from 'vue'
import { defineComponent, useRender } from '@/util'

export const VLayout = defineComponent({
  name: 'VLayout',

  props: makeLayoutProps(),

  setup (props, { slots }) {
    const { layoutClasses, layoutStyles, getLayoutItem, items, layoutRef } = createLayout(props)

    useRender(() => (
      <div ref={ layoutRef } class={ layoutClasses.value } style={ layoutStyles.value }>
        <Suspense>
          <>
            { slots.default?.() }
          </>
        </Suspense>
      </div>
    ))

    return {
      getLayoutItem,
      items,
    }
  },
})

export type VLayout = InstanceType<typeof VLayout>
