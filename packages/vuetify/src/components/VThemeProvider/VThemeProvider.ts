// Utilities
import { defineComponent, h } from 'vue'
import { provideTheme } from '@/composables'
import makeProps from '@/util/makeProps'

export const VThemeProvider = defineComponent({
  name: 'VThemeProvider',

  props: makeProps({
    theme: {
      type: String,
    },
    // TODO: Better name
    newContext: {
      type: Boolean,
    },
  }),

  setup (props, context) {
    const { themeClass } = provideTheme(props, context)

    return () => h('div', {
      class: ['v-theme-provider', themeClass.value],
    }, [h('div', [context.slots.default?.()])])
  },
})
