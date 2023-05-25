// Components
import { VTimelineDivider } from './VTimelineDivider'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { makeRoundedProps } from '@/composables/rounded'
import { makeSizeProps } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { ref, shallowRef, watch } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

// Types
export type VTimelineItemSlots = {
  default: never
  icon: never
  opposite: never
}

export const makeVTimelineItemProps = propsFactory({
  density: String as PropType<'default' | 'compact'>,
  dotColor: String,
  fillDot: Boolean,
  hideDot: Boolean,
  hideOpposite: {
    type: Boolean,
    default: undefined,
  },
  icon: IconValue,
  iconColor: String,
  lineInset: [Number, String],

  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
}, 'v-timeline-item')

export const VTimelineItem = genericComponent<VTimelineItemSlots>()({
  name: 'VTimelineItem',

  props: makeVTimelineItemProps(),

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)

    const dotSize = shallowRef(0)
    const dotRef = ref<VTimelineDivider>()
    watch(dotRef, newValue => {
      if (!newValue) return
      dotSize.value = newValue.$el.querySelector('.v-timeline-divider__dot')?.getBoundingClientRect().width ?? 0
    }, {
      flush: 'post',
    })

    useRender(() => (
      <div
        class={[
          'v-timeline-item',
          {
            'v-timeline-item--fill-dot': props.fillDot,
          },
          props.class,
        ]}
        style={[
          {
            '--v-timeline-dot-size': convertToUnit(dotSize.value),
            '--v-timeline-line-inset': props.lineInset ? `calc(var(--v-timeline-dot-size) / 2 + ${convertToUnit(props.lineInset)})` : convertToUnit(0),
          },
          props.style,
        ]}
      >
        <div
          class="v-timeline-item__body"
          style={ dimensionStyles.value }
        >
          { slots.default?.() }
        </div>

        <VTimelineDivider
          ref={ dotRef }
          hideDot={ props.hideDot }
          icon={ props.icon }
          iconColor={ props.iconColor }
          size={ props.size }
          elevation={ props.elevation }
          dotColor={ props.dotColor }
          fillDot={ props.fillDot }
          rounded={ props.rounded }
          v-slots={{ default: slots.icon }}
        />

        { props.density !== 'compact' && (
          <div class="v-timeline-item__opposite">
            { !props.hideOpposite && slots.opposite?.() }
          </div>
        )}
      </div>
    ))

    return {}
  },
})

export type VTimelineItem = InstanceType<typeof VTimelineItem>
