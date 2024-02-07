// Styles
import './VLayout.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { createLayout, makeLayoutProps } from '@/composables/layout'

// Utilities
import { Suspense } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps(),
}, 'VLayout')

export const VLayout = genericComponent()({
  name: 'VLayout',

  props: makeVLayoutProps(),

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
