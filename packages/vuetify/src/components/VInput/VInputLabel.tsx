// Utilities
import { convertToUnit, defineComponent, roundEven } from '@/util'

// Composables
import { makeThemeProps } from '@/composables/theme'

export default defineComponent({
  name: 'VInputLabel',

  props: {
    active: Boolean,
    activeScale: {
      type: [Number, String],
      default: 0.75,
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
        : `translate(
            ${convertToUnit(roundEven(props.translateX))},
            ${convertToUnit(roundEven(props.translateY))}
          ) scale(${props.activeScale})`

      return (
        <label
          class={[
            'v-label',
            {
              'v-label--active': props.active,
            },
          ]}
          style={{
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
