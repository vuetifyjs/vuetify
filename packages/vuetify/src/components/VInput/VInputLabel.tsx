// Utilities
import { computed } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

// Composables
import { makeThemeProps, useTheme } from '@/composables/theme'

export default defineComponent({
  name: 'VInputLabel',

  props: {
    text: String,
    active: Boolean,
    left: {
      type: [Number, String],
      default: 0,
    },
    activeScale: {
      type: [Number, String],
      default: 0.75,
    },
    translateY: {
      type: [Number, String],
      default: 0,
    },
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    return () => {
      return (
        <label
          class={[
            'v-label',
            {
              'v-label--active': props.active,
            },
          ]}
          style={{
            left: convertToUnit(props.left),
            transform: props.active
              ? `translateY(${convertToUnit(props.translateY)}) scale(${props.activeScale})`
              : undefined,
          }}
        >
          { slots.default?.() }

          { props.text }
        </label>
      )
    }
  },
})
