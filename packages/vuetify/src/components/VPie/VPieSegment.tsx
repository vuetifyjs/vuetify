// Utilities
import { computed, ref } from 'vue'
import { clamp, easingPatterns, genericComponent, propsFactory, useTransition } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVPieSegmentProps = propsFactory({
  rotate: Number,
  value: {
    type: Number,
    required: true,
  },
  color: String,
  width: {
    type: Number,
    default: 1,
  },
  zoom: Number,
  speed: {
    type: String as PropType<'fast' | 'slow' | 'default'>,
    default: 'default',
  },
  pattern: String,
  hideSlice: Boolean,
}, 'VPieSegment')

export const VPieSegment = genericComponent()({
  name: 'VPieSegment',

  props: makeVPieSegmentProps(),

  setup (props) {
    const isHovering = ref(false)

    const transitionConfig = {
      duration: { fast: 250, slow: 700, default: 500 }[props.speed],
      transition: easingPatterns.easeInOutCubic,
    }

    const hoverZoomRatio = computed(() => Math.max(0, Math.min(0.5, props.zoom ?? 0.05)))
    const normalizedValue = computed(() => clamp(props.value, 0, 99.99))
    const normalizedWidth = computed(() => clamp(props.width, 0, 1))

    const radians = computed(() => (360 * (-normalizedValue.value / 100) + 90) * (Math.PI / 180))
    const x1 = computed(() => 50 + 50 * Math.cos(radians.value))
    const y1 = computed(() => 50 - 50 * Math.sin(radians.value))

    const radius = computed(() => 50 * (1 - normalizedWidth.value / 2) * (isHovering.value ? 1 : (1 - hoverZoomRatio.value)))

    const diameter = computed(() => (radius.value / (1 - normalizedWidth.value / 2)))
    const strokeWidth = computed(() => normalizedWidth.value * diameter.value)
    const circumference = computed(() => 2 * Math.PI * radius.value)
    const strokeDashOffset = computed(() => (((100 - normalizedValue.value) / 100) * circumference.value))

    const currentAngle = useTransition(() => (props.rotate ?? 0), transitionConfig)
    const currentRadius = useTransition(() => radius.value, transitionConfig)
    const currentStrokeWidth = useTransition(() => strokeWidth.value, transitionConfig)
    const currentCircumference = useTransition(() => circumference.value, transitionConfig)
    const currentStrokeDashOffset = useTransition(() => strokeDashOffset.value, transitionConfig)

    const sliceWidth = computed(() => 1 - normalizedWidth.value)
    const sliceRadius = computed(() => 50 * sliceWidth.value / 2 * (isHovering.value ? 1 : (1 - hoverZoomRatio.value)))
    const sliceDiameter = computed(() => sliceRadius.value / (sliceWidth.value / 2))
    const sliceStrokeWidth = computed(() => sliceWidth.value * sliceDiameter.value)
    const sliceCircumference = computed(() => 2 * Math.PI * sliceRadius.value)
    const sliceStrokeDashOffset = computed(() => (((100 - normalizedValue.value) / 100) * sliceCircumference.value))

    const currentSliceRadius = useTransition(() => sliceRadius.value, transitionConfig)
    const currentSliceStrokeWidth = useTransition(() => sliceStrokeWidth.value, transitionConfig)
    const currentSliceCircumference = useTransition(() => sliceCircumference.value, transitionConfig)
    const currentSliceStrokeDashOffset = useTransition(() => sliceStrokeDashOffset.value, transitionConfig)

    return () => (
      <g
        class="v-pie-segment"
        style={{ color: props.color }}
      >
        <g transform={ `rotate(${-90 + currentAngle.value} 50 50)` }>
          { !props.hideSlice && props.width < 1 && (
            <circle
              key="inner-slice"
              fill="transparent"
              cx="50%"
              cy="50%"
              r={ currentSliceRadius.value }
              stroke="oklch(from currentColor l c h / calc(alpha / 2))"
              stroke-width={ currentSliceStrokeWidth.value }
              stroke-dasharray={ currentSliceCircumference.value }
              stroke-dashoffset={ `${currentSliceStrokeDashOffset.value}px` }
            />
          )}
          <circle
            key="outer-slice"
            fill="transparent"
            cx="50%"
            cy="50%"
            r={ currentRadius.value }
            shape-rendering="geometricPrecision"
            stroke="currentColor"
            stroke-width={ currentStrokeWidth.value }
            stroke-dasharray={ currentCircumference.value }
            stroke-dashoffset={ `${currentStrokeDashOffset.value}px` }
          />
          { props.pattern && (
            <circle
              key="pattern-overlay"
              fill="transparent"
              cx="50%"
              cy="50%"
              r={ currentRadius.value }
              shape-rendering="geometricPrecision"
              stroke={ props.pattern }
              stroke-width={ currentStrokeWidth.value }
              stroke-dasharray={ currentCircumference.value }
              stroke-dashoffset={ `${currentStrokeDashOffset.value}px` }
            />
          )}
        </g>
        <path
          transform={ `rotate(${currentAngle.value} 50 50)` }
          class="v-pie-segment__overlay"
          fill="currentColor"
          d={ `M 50 0 A 50 50 0 ${normalizedValue.value > 50 ? 1 : 0} 1 ${x1.value} ${y1.value} L 50 50` }
          onMouseenter={ () => isHovering.value = true }
          onMouseleave={ () => isHovering.value = false }
        />
      </g>
    )
  },
})

export type VPieSegment = InstanceType<typeof VPieSegment>
