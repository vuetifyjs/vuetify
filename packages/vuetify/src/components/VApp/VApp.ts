// Styles
import './VApp.sass'

// Components
import VThemeProvider from '../VThemeProvider'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VApp',

  props: makeProps({
    theme: String,
  }),

  setup (props, { slots }) {
    return () => (
      h(VThemeProvider, {
        ...props,
        class: 'v-application',
        'data-app': true,
      }, () => h('div', { class: 'v-application__wrap' }, slots.default?.()))
    )
  },
})
