// Styles
import './VLayout.sass'

// Utilities
import { defineComponent, useRender } from '@/util'

// Composables
import { createLayout, makeLayoutProps } from '@/composables/layout'

export const VLayout = defineComponent({
  name: 'VLayout',

  props: makeLayoutProps(),

  setup (props, { slots }) {
    const { layoutClasses, getLayoutItem, items } = createLayout(props)

    useRender(() => (
      <div class={ layoutClasses.value }>
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
