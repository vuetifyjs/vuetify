// Types
import type { Prop } from 'vue'
import type { TimelineDotAlignment, TimelineSide } from './VTimeline'

// Components
import { VIcon } from '../VIcon'
import { VTimelineSymbol } from './VTimeline'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeSizeProps, useSize } from '@/composables/size'
import { useBackgroundColor } from '@/composables/color'
import { makeElevationProps, useElevation } from '@/composables/elevation'

// Helpers
import { computed, defineComponent, inject, onBeforeUnmount } from 'vue'
import { getUid, makeProps } from '@/util'

export default defineComponent({
  name: 'VTimelineItem',

  props: makeProps({
    alignDot: {
      type: String,
      validator: (v: any) => v == null || ['start', 'end'].includes(v),
    } as Prop<TimelineDotAlignment>,
    color: {
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
    index: Number,
    side: {
      type: String,
      validator: (v: any) => v == null || ['before', 'after'].includes(v),
    } as Prop<TimelineSide>,
    ...makeElevationProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
  }),

  setup (props, ctx) {
    const timeline = inject(VTimelineSymbol)

    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider')

    const id = getUid()
    const { isEven } = timeline.register(id, props.index)

    onBeforeUnmount(() => timeline.unregister(id))

    const { backgroundColorStyles, backgroundColorClasses } = useBackgroundColor(props, 'color')
    const { sizeClasses, sizeStyles } = useSize(props, 'v-timeline-item__dot')
    const { elevationClasses } = useElevation(props)

    const sideClass = computed(() => {
      let side = props.side ?? timeline.singleSide.value ?? (isEven.value ? 'before' : 'after')

      if (side && timeline.reverse.value) side = side === 'before' ? 'after' : 'before'

      return side && `v-timeline-item--${side}`
    })

    const alignDotClass = computed(() => props.alignDot && `v-timeline-item--align-dot-${props.alignDot}`)

    const hideOpposite = computed(() => props.hideOpposite ?? !!timeline.singleSide.value)

    return () => (
      <props.tag
        class={[
          'v-timeline-item',
          {
            'v-timeline-item--fill-dot': props.fillDot,
          },
          sideClass.value,
          alignDotClass.value,
        ]}
      >
        <div class='v-timeline-item__wrapper'>
          <div class='v-timeline-item__body'>
            { ctx.slots.default?.() }
          </div>

          <div class='v-timeline-item__divider'>
            { !props.hideDot && (
              <div
                class={[
                  'v-timeline-item__dot',
                  sizeClasses.value,
                  elevationClasses.value,
                ]}
                style={sizeStyles.value as any} // TODO: Fix this!
              >
                <div
                  class={[
                    'v-timeline-item__inner-dot',
                    ...backgroundColorClasses.value,
                  ]}
                  style={backgroundColorStyles.value}
                >
                  {
                    ctx.slots.icon ? ctx.slots.icon({ icon: props.icon, iconColor: props.iconColor })
                    : props.icon ? <VIcon icon={props.icon} color={props.iconColor} size={props.size} />
                    : undefined
                  }
                </div>
              </div>
            ) }
          </div>

          { !hideOpposite.value && ctx.slots.opposite && (
            <div class='v-timeline-item__opposite'>
              {ctx.slots.opposite()}
            </div>
          ) }
        </div>
      </props.tag>
    )
  },
})
