// Styles
import './VDivider.sass'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

// Composables
import {
  makeBorderProps,
  makeDimensionProps,
  useBorder,
  useDimension,
  useTheme,
} from '@/composables'

export default defineComponent({
  name: 'VDivider',

  props: {
    ...makeBorderProps(),
    ...makeDimensionProps({
      height: undefined,
      maxHeight: undefined,
      maxWidth: undefined,
      width: undefined,
    }),
    ...makeProps({
      inset: Boolean,
      vertical: Boolean,
    }),
  },

  setup (props, { attrs }) {
    const { borderClasses } = useBorder(props)
    const { dimensionStyles } = useDimension(props)
    const { themeClasses } = useTheme()

    return () => (
      h('hr', {
        ariaOrientation: attrs.role === 'separator'
          ? props.vertical ? 'vertical' : 'horizontal'
          : undefined,
        class: [
          'v-divider',
          {
            'v-divider--inset': props.inset,
            'v-divider--vertical': props.vertical,
          },
          themeClasses.value,
          borderClasses.value,
        ],
        role: attrs.role || 'separator',
        style: [dimensionStyles.value],
      })
    )
  },
})
