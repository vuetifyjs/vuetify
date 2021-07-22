// Utilities
import { computed } from 'vue'
import { convertToUnit, defineComponent } from '@/util'

// Composables
import { makeThemeProps, useTheme } from '@/composables/theme'

export default defineComponent({
  name: 'VInputLabel',

  props: {
    active: Boolean,
    activeScale: {
      type: [Number, String],
      default: 0.75,
    },
    left: {
      type: [Number, String],
      default: 0,
    },
    text: String,
    translateY: {
      type: [Number, String],
      default: 0,
    },
    translateX: {
      type: [Number, String],
      default: 0,
    },

    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    return () => {
      const translate = !props.translateX && !props.translateY
        ? undefined
        : `translate(${convertToUnit(props.translateX)}, ${convertToUnit(props.translateY)}) scale(${props.activeScale})`

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
              ? translate
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
