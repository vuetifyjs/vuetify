// Components
import { VTimelineDivider } from './VTimelineDivider'

// Composables
import { IconValue } from '@/composables/icons'
import { makeElevationProps } from '@/composables/elevation'
import { makeRoundedProps } from '@/composables/rounded'
import { makeSizeProps } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'

// Utilities
import type { PropType } from 'vue'
import { ref, watch } from 'vue'
import { convertToUnit, defineComponent, useRender } from '@/util'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'

export const VTimelineItem = defineComponent({
  name: 'VTimelineItem',

  props: {
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

    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeDimensionProps(),
  },

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)

    const dotSize = ref(0)
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
        ]}
        style={{
          '--v-timeline-dot-size': convertToUnit(dotSize.value),
        }}
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
        ) }
      </div>
    ))

    return {}
  },
})
