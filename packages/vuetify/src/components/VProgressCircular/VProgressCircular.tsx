// Styles
import './VProgressCircular.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, defineComponent, toRef } from 'vue'
import { convertToUnit, makeProps } from '@/util'
import { useTheme } from '@/composables/theme'
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { makeSizeProps, useSize } from '@/composables/size'

export default defineComponent({
  name: 'VProgressCircular',

  props: makeProps({
    indeterminate: Boolean,
    rotate: {
      type: [Number, String],
      default: 0,
    },
    bgColor: {
      type: String,
      default: 'surface',
    },
    color: {
      type: String,
      default: 'primary',
    },
    width: {
      type: [Number, String],
      default: 4,
    },
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'div' }),
  }),

  setup (props, { slots }) {
    const MAGIC_RADIUS_CONSTANT = 20
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT

    const { themeClasses } = useTheme()
    const { sizeClasses, sizeStyles } = useSize(props, 'v-progress-circular')
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))
    const { textColorClasses: underlayColorClasses, textColorStyles: underlayColorStyles } = useTextColor(toRef(props, 'bgColor'))
    const { intersectionRef, isIntersecting } = useIntersectionObserver()

    const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))))
    const width = computed(() => Number(props.width))
    const size = computed(() => {
      // Get size from element if size prop value is small, large etc
      return sizeStyles.value ? Number(props.size) : intersectionRef.value
        ? intersectionRef.value.getBoundingClientRect().width : Math.max(width.value, 32)
    })
    const diameter = computed(() => (MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value)) * 2)
    const strokeWidth = computed(() => width.value / size.value * diameter.value)
    const strokeDashOffset = computed(() => convertToUnit(((100 - normalizedValue.value) / 100) * CIRCUMFERENCE))

    return () => (
      <props.tag
        ref={ intersectionRef }
        class={[
          'v-progress-circular',
          {
            'v-progress-circular--visible': isIntersecting.value,
            'v-progress-circular--indeterminate': props.indeterminate,
          },
          textColorClasses.value,
          sizeClasses.value,
          themeClasses.value,
        ]}
        style={[
          textColorStyles.value,
          sizeStyles.value,
        ]}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={ props.indeterminate ? undefined : normalizedValue.value }
      >
        <svg
          style={{
            transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`,
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={ `0 0 ${diameter.value} ${diameter.value}` }
        >
          <circle
            class={[
              'v-progress-circular__underlay',
              underlayColorClasses.value,
            ]}
            style={ underlayColorStyles.value }
            fill="transparent"
            cx='50%'
            cy='50%'
            r={ MAGIC_RADIUS_CONSTANT }
            stroke-width={ strokeWidth.value }
            stroke-dasharray={ CIRCUMFERENCE }
            stroke-dashoffset={ 0 }
          />
          <circle
            class="v-progress-circular__overlay"
            fill="transparent"
            cx='50%'
            cy='50%'
            r={ MAGIC_RADIUS_CONSTANT }
            stroke-width={ strokeWidth.value }
            stroke-dasharray={ CIRCUMFERENCE }
            stroke-dashoffset={ strokeDashOffset.value }
          />
        </svg>
        { slots.default ? (
          <div class="v-progress-circular__content">
            { slots.default() }
          </div>
        ) : undefined }
      </props.tag>
    )
  },
})
