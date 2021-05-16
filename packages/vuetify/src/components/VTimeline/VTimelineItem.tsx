// Types
import { Prop, ref, watchEffect } from 'vue'
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
    const before = ref<any>()
    const divider = ref<any>()
    const after = ref<any>()
    const timeline = inject(VTimelineSymbol)

    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider')

    const id = getUid()
    const { isEven } = timeline.register(id, { before, divider, after }, props.index)

    onBeforeUnmount(() => timeline.unregister(id))

    const { backgroundColorStyles, backgroundColorClasses } = useBackgroundColor(props, 'color')
    const { sizeClasses, sizeStyles } = useSize(props, 'v-timeline-item__dot')
    const { elevationClasses } = useElevation(props)

    const side = computed(() => {
      let side = timeline.singleSide.value ?? props.side ?? (isEven.value ? 'before' : 'after')

      if (side && timeline.mirror.value) side = side === 'before' ? 'after' : 'before'

      return side
    })
    // const sideClass = computed(() => {
    //   let side = timeline.singleSide.value ?? props.side ?? (isEven.value ? 'before' : 'after')

    //   if (side && timeline.mirror.value) side = side === 'before' ? 'after' : 'before'

    //   return side && `v-timeline-item--${side}`
    // })

    // const alignDotClass = computed(() => props.alignDot && `v-timeline-item--align-dot-${props.alignDot}`)

    const hideOpposite = computed(() => props.hideOpposite ?? !!timeline.singleSide.value)

    const body = computed(() => (
      <div class="v-timeline-item__body">
        { ctx.slots.default?.() }
      </div>
    ))

    const opposite = computed(() => {
      return (
        <div class="v-timeline-item__opposite">
          { !hideOpposite.value && ctx.slots.opposite?.() }
        </div>
      )
    })

    watchEffect(() => {
      before.value = side.value === 'before' ? body.value : opposite.value

      divider.value = (
        <div class="v-timeline-item__divider">
          <div
            class={[
              'v-timeline-item__line',
            ]}
            style={{
              background: 'red',
              height: '4px',
              left: '38px',
              right: '4px',
              // position: 'absolute',
              top: 'calc(50% - 2px)',
            }}
          />
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
      )

      after.value = side.value === 'before' ? opposite.value : body.value
    })

    return () => null
  },
})
