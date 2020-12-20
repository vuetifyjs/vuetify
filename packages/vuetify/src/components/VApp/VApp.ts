// Styles
import './VApp.sass'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

// Composables
import { useTheme } from '@/composables'

export default defineComponent({
  name: 'VApp',

  props: makeProps({
    theme: String,
  }),

  setup (props, { slots }) {
    const { themeClass } = useTheme()
    return () => (
      h('div', {
        ...props,
        class: [
          'v-application',
          themeClass.value,
        ],
        'data-app': true,
      }, h('div', { class: 'v-application__wrap' }, slots.default?.()))
    )
  },
})
