// Styles
import './VLayout.sass'

// Utilities
import { defineComponent } from 'vue'
import { makeProps, useRender } from '@/util'

// Composables
import { createLayout, makeLayoutProps } from '@/composables/layout'

export default defineComponent({
  name: 'VLayout',

  props: makeProps(makeLayoutProps()),

  setup (props, { slots }) {
    const { layoutClasses, getLayoutItem, items } = createLayout(props)

    useRender(() => (
      <div
        class={layoutClasses.value}
        style={{
          height: props.fullHeight ? '100vh' : undefined,
        }}
      >{ slots.default?.() }</div>
    ))

    return {
      getLayoutItem,
      items,
    }
  },
})
