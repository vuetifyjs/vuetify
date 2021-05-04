// Styles
import './VProgressCircular.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useTheme } from '@/composables/theme'
import { useColor } from '@/composables/color'

// Utilities
import { computed, defineComponent } from 'vue'
import { convertToUnit, makeProps } from '@/util'

export default defineComponent({
  name: 'VProgressCircular',

  props: makeProps({
    indeterminate: Boolean,
    rotate: {
      type: [Number, String],
      default: 0,
    },
    size: {
      type: [Number, String],
      default: 32,
    },
    color: {
      type: String,
      default: 'primary',
    },
    width: {
      type: [Number, String],
      default: 4,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    ...makeTagProps({ tag: 'div' }),
  }),

  setup (props, { slots }) {
    const radius = 20
    const isVisible = true

    const { themeClasses } = useTheme()

    const { colorClasses, colorStyles } = useColor(computed(() => ({
      text: props.color,
    })))

    const calculatedSize = computed(():number => Number(props.size))

    const circumference = computed((): number => 2 * Math.PI * radius)

    const normalizedValue = computed((): number => {
      if (props.value < 0) {
        return 0
      }

      if (props.value > 100) {
        return 100
      }

      return parseFloat(props.value)
    })

    const strokeDashArray = computed((): number => {
      return Math.round(circumference.value * 1000) / 1000
    })

    const strokeDashOffset = computed((): string => {
      return ((100 - normalizedValue.value) / 100) * circumference.value + 'px'
    })

    const strokeWidth = computed((): number => {
      return Number(props.width) / +props.size * viewBoxSize.value * 2
    })

    const svgStyles = computed((): object => {
      return {
        transform: `rotate(${Number(props.rotate)}deg)`,
      }
    })

    const viewBoxSize = computed((): number => {
      return radius / (1 - Number(props.width) / +props.size)
    })

    return () =>
      (
        <props.tag
          class={[
            'v-progress-circular',
            {
              'v-progress-circular--visible': isVisible,
              'v-progress-circular--indeterminate': props.indeterminate,
            },
            themeClasses.value,
            colorClasses.value,
          ]}
          style={[
            colorStyles.value,
            { height: convertToUnit(calculatedSize.value) },
            { width: convertToUnit(calculatedSize.value) },
          ]}
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={ props.indeterminate ? undefined : normalizedValue.value }
        >
          <svg
            style={ svgStyles.value }
            xmlns="http://www.w3.org/2000/svg"
            viewBox={ `${viewBoxSize.value} ${viewBoxSize.value} ${2 * viewBoxSize.value} ${2 * viewBoxSize.value}` }
          >
            <circle
              class="v-progress-circular__underlay"
              fill="transparent"
              cx={ 2 * viewBoxSize.value }
              cy={ 2 * viewBoxSize.value}
              r={ radius }
              stroke-width={ strokeWidth.value }
              stroke-dasharray={ strokeDashArray.value }
              stroke-dashoffset={ 0 }
            >
            </circle>
            <circle
              class="v-progress-circular__overlay"
              fill="transparent"
              cx={ 2 * viewBoxSize.value }
              cy={ 2 * viewBoxSize.value}
              r={ radius }
              stroke-width={ strokeWidth.value }
              stroke-dasharray={ strokeDashArray.value }
              stroke-dashoffset={ strokeDashOffset.value }
            >
            </circle>
          </svg>
        </props.tag>
      )
  },
})
