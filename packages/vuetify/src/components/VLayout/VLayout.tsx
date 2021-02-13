// Styles
import './VLayout.sass'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

// Composables
import { createLayout, makeLayoutProps } from '@/composables/layout'

export default defineComponent({
  name: 'VLayout',

  props: makeProps(makeLayoutProps()),

  setup (props, { slots }) {
    const { layoutClasses } = createLayout(props)

    return () => (
      <div
        class={layoutClasses.value}
        style={{
          height: props.fullHeight ? '100vh' : undefined,
        }}
      >{ slots.default?.() }</div>
    )
  },
})
