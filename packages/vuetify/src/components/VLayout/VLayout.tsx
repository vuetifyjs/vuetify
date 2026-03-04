// Styles
import './VLayout.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { createLayout, makeLayoutProps } from '@/composables/layout'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLayoutProps(),
}, 'VLayout')

export const VLayout = genericComponent()({
  name: 'VLayout',

  props: makeVLayoutProps(),

  setup (props, { slots }) {
    const { layoutClasses, layoutStyles, getLayoutItem, items } = createLayout(props)
    const { dimensionStyles } = useDimension(props)

    useRender(() => (
      <div
        class={[
          layoutClasses.value,
          props.class,
        ]}
        style={[
          dimensionStyles.value,
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
