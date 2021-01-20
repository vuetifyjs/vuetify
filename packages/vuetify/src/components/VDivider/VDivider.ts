// Styles
import './VDivider.sass'

// Utilities
import { computed, defineComponent, h } from 'vue'

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
    const classes = computed(() => {
      return {
        'v-divider--inset': props.inset,
        'v-divider--vertical': props.vertical,
      }
    })
    const role = attrs.role ?? 'separator'
    const ariaOrientation = role === 'separator'
      ? props.vertical ? 'vertical' : 'horizontal'
      : undefined

    return () => (
      h('hr', {
        class: [
          'v-divider',
          classes.value,
          themeClasses.value,
        ],
        ariaOrientation,
        role,
      })
    )
  },
})
