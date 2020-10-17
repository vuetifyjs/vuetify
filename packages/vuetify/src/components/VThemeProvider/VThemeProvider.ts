// Styles
import './VThemeProvider.sass'

// Utilities
import { defineComponent, h } from 'vue'
import { provideTheme } from '../../composables/theme'
import makeProps from '@/util/makeProps'

export const VThemeProvider = defineComponent({
  name: 'VThemeProvider',

  props: makeProps({
    theme: {
      type: String,
    },
  }),

  setup (props, { slots }) {
    const { themeClass } = provideTheme(props)

    return () => h('div', {
      class: ['v-theme-provider', themeClass.value],
    }, [h('div', [slots.default?.()])])
  },
})
