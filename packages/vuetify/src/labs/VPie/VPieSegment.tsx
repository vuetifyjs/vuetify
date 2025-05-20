// Utilities
import { computed, ref } from 'vue'
import { useOuterSlicePath, usePieArc } from './utils'
import { easingPatterns, genericComponent, propsFactory, useTransition } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVPieSegmentProps = propsFactory({
  rotate: {
    type: Number,
    default: 0,
  },
  value: {
    type: Number,
    required: true,
  },
  color: String,
  innerCut: {
    type: Number,
    default: 0,
  },
  hoverScale: Number,
  gap: {
    type: Number,
    default: 0,
  },
  rounded: {
    type: Number,
    default: 0,
  },
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

    const {
      hoverZoomRatio,
      normalizedValue,
      normalizedInnerCut,
      x,
      y,
      arcWidth,
      sliceRadius,
    } = usePieArc(props, isHovering)

    const currentAngle = useTransition(() => (props.rotate + props.gap / 2), transitionConfig)
    const currentSliceRadius = useTransition(() => sliceRadius.value, transitionConfig)

    const arcRadius = computed(() => 50 * (isHovering.value ? 1 : (1 - hoverZoomRatio.value)))
    const currentArcRadius = useTransition(() => arcRadius.value, transitionConfig)
    const currentArcSize = useTransition(() => normalizedValue.value, transitionConfig)
    const currentArcWidth = useTransition(() => arcWidth.value, transitionConfig)

    const outerSlicePath = useOuterSlicePath({
      angle: currentAngle,
      radius: currentArcRadius,
      size: currentArcSize,
      width: currentArcWidth,
      rounded: () => props.rounded,
    })

    const circumference = (radius: number) => 2 * Math.PI * radius
    const strokeDashOffset = (radius: number) => circumference(radius) * (1 - normalizedValue.value / 100)

    const currentSliceCircumference = useTransition(() => circumference(sliceRadius.value), transitionConfig)
    const currentSliceStrokeDashOffset = useTransition(() => strokeDashOffset(sliceRadius.value), transitionConfig)

    return () => (
      <g
        class="v-pie-segment"
        style={{ color: props.color }}
      >
        <path
          key="outer-slice"
          fill="currentColor"
          shape-rendering="geometricPrecision"
          d={ outerSlicePath.value }
        />
        { props.pattern && (
          <path
            key="pattern-overlay"
            shape-rendering="geometricPrecision"
            fill={ props.pattern }
            d={ outerSlicePath.value }
          />
        )}
        { !props.hideSlice && normalizedInnerCut.value > 0 && (
          <circle
            key="inner-slice"
            fill="transparent"
            cx="50%"
            cy="50%"
            r={ currentSliceRadius.value }
            stroke="oklch(from currentColor l c h / calc(alpha / 2))"
            stroke-width={ 2 * currentSliceRadius.value }
            stroke-dasharray={ currentSliceCircumference.value }
            stroke-dashoffset={ `${currentSliceStrokeDashOffset.value}px` }
            transform={ `rotate(${-90 + currentAngle.value} 50 50)` }
          />
        )}
        <path
          transform={ `rotate(${currentAngle.value} 50 50)` }
          class="v-pie-segment__overlay"
          d={ `M 50 0 A 50 50 0 ${normalizedValue.value > 50 ? 1 : 0} 1 ${x.value} ${y.value} L 50 50` }
          onMouseenter={ () => isHovering.value = true }
          onMouseleave={ () => isHovering.value = false }
        />
      </g>
    )
  },
})

export type VPieSegment = InstanceType<typeof VPieSegment>
