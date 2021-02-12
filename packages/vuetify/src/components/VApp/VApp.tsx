// Styles
import './VApp.sass'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

// Composables
import { useTheme } from '@/composables/theme'

export default defineComponent({
  name: 'VApp',

  props: makeProps({
    theme: String,
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()

    return () => (
      <div class={['v-application', themeClasses.value]} data-app="true">
        <div class="v-application__wrap">{ slots.default?.() }</div>
      </div>
    )
  },
})
