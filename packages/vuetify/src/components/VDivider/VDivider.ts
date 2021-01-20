// Styles
import './VDivider.sass'

// Utilities
import { defineComponent, h } from 'vue'

// Composables
import { useTheme } from '@/composables'

export default defineComponent({
  name: 'VDivider',

  props: {
    inset: Boolean,
    vertical: Boolean,
  },

  setup (props, { attrs }) {
    const { themeClasses } = useTheme()
    const role = attrs.role ?? 'separator'
    const ariaOrientation = role === 'separator'
      ? props.vertical ? 'vertical' : 'horizontal'
      : undefined

    return () => (
      h('hr', {
        class: [
          'v-divider',
          {
            'v-divider--inset': props.inset,
            'v-divider--vertical': props.vertical,
          },
          themeClasses.value,
        ],
        ariaOrientation,
        role,
      })
    )
  },
})
