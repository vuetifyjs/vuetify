// Types
import type { ComponentPublicInstance } from 'vue'

// Components
import { VTimelineSymbol } from './VTimeline'
import VTimelineDivider from './VTimelineDivider'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeSizeProps } from '@/composables/size'
import { makeElevationProps } from '@/composables/elevation'
import { makeRoundedProps } from '@/composables/rounded'

// Helpers
import { defineComponent, inject, ref, watch } from 'vue'
import { convertToUnit, makeProps } from '@/util'

export default defineComponent({
  name: 'VTimelineItem',

  props: makeProps({
    dotColor: {
      type: String,
      default: 'primary',
    },
    fillDot: Boolean,
    hideDot: Boolean,
    hideOpposite: {
      type: Boolean,
      default: undefined,
    },
    icon: String,
    iconColor: String,
    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
  }),

  setup (props, ctx) {
    const timeline = inject(VTimelineSymbol)

    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider')

    const dotSize = ref(0)
    const dotRef = ref<ComponentPublicInstance>()
    watch(dotRef, newValue => {
      if (!newValue) return
      dotSize.value = newValue.$el.querySelector('.v-timeline-divider__dot')?.getBoundingClientRect().width
    }, {
      flush: 'post',
    })

    return () => (
      <div
        class={[
          'v-timeline-item',
          {
            'v-timeline-item--fill-dot': props.fillDot,
          },
        ]}
        style={{
          // @ts-ignore
          '--v-timeline-dot-size': convertToUnit(dotSize.value),
        }}
      >
        <div class='v-timeline-item__body'>
          { ctx.slots.default?.() }
        </div>

        <VTimelineDivider
          ref={dotRef}
          hideDot={props.hideDot}
          icon={props.icon}
          iconColor={props.iconColor}
          size={props.size}
          elevation={props.elevation}
          dotColor={props.dotColor}
          fillDot={props.fillDot}
          rounded={props.rounded}
          v-slots={{ default: ctx.slots.icon }}
        />

        { timeline.density.value !== 'compact' && (
          <div
            class="v-timeline-item__opposite"
          >
            { !props.hideOpposite && ctx.slots.opposite?.() }
          </div>
        ) }
      </div>
    )
  },
})
