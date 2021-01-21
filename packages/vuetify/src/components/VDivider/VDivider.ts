// Styles
import './VDivider.sass'

// Utilities
import { defineComponent, h, mergeProps } from 'vue'
import makeProps from '@/util/makeProps'

// Composables
import { useTheme } from '@/composables'

export default defineComponent({
  name: 'VDivider',

  inheritAttrs: false,

  props: makeProps({
    inset: Boolean,
    vertical: Boolean,
  }),

  setup (props, { attrs }) {
    const { themeClasses } = useTheme()

    return () => (
      h('hr', mergeProps(
        {
          class: [
            'v-divider',
            {
              'v-divider--inset': props.inset,
              'v-divider--vertical': props.vertical,
            },
            themeClasses.value,
          ],
        },
        attrs,
        {
          ariaOrientation: !attrs.role || attrs.role === 'separator'
            ? props.vertical ? 'vertical' : 'horizontal'
            : undefined,
          role: attrs.role || 'separator',
        }
      ))
    )
  },
})
