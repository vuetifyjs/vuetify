// Types
import type { ComponentPublicInstance, Prop } from 'vue'
import type { TimelineDotAlignment, TimelineSide } from './VTimeline'

// Components
import { VTimelineSymbol } from './VTimeline'
import VTimelineDivider from './VTimelineDivider'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeSizeProps } from '@/composables/size'
import { makeElevationProps } from '@/composables/elevation'

// Helpers
import { computed, defineComponent, inject, onBeforeUnmount, ref, watch } from 'vue'
import { convertToUnit, getUid, makeProps } from '@/util'

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

    const bodySide = computed(() => {
      let side: string

      if (timeline.density.value !== 'default') {
        side = timeline.side.value ?? 'after'
      } else {
        side = timeline.side.value ?? props.side ?? (isEven.value ? 'after' : 'before')
      }

      if (side && timeline.mirror.value) side = side === 'before' ? 'after' : 'before'

      return side
    })

    const oppositeSide = computed(() => bodySide.value === 'after' ? 'before' : 'after')

    const hideOpposite = computed(() => props.hideOpposite ?? timeline.density.value === 'compact')

    const body = computed(() => (
      <div
        key={`body-${bodySide.value}`}
        class={[
          'v-timeline-item__body',
          `v-timeline-item--${bodySide.value}`
        ]}
      >
        { ctx.slots.default?.() }
      </div>
    ))

    const opposite = computed(() => !hideOpposite.value && (
      <div
        key={`opposite-${oppositeSide.value}`}
        class={[
          'v-timeline-item__opposite',
          `v-timeline-item--${oppositeSide.value}`
        ]}
      >
        { ctx.slots.opposite?.() }
      </div>
    ))

    const before = computed(() => bodySide.value === 'before' ? body.value : opposite.value)
    const after = computed(() => bodySide.value === 'before' ? opposite.value : body.value)

    const dotSize = ref(0)
    const dotRef = ref<ComponentPublicInstance>()
    watch(dotRef, newValue => {
      if (!newValue) return
      dotSize.value = newValue.$el.querySelector('.v-timeline-item__dot')?.getBoundingClientRect().width
    }, {
      flush: 'post',
    })

    return () => {
      return (
        <div
          class={[
            'v-timeline-item',
            {
              'v-timeline-item--fill-dot': props.fillDot,
            }
          ]}
          style={{
            // @ts-ignore
            '--v-timeline-dot-size': convertToUnit(dotSize.value),
          }}
        >
          { before.value }

          <VTimelineDivider
            ref={dotRef}
            hideDot={props.hideDot}
            icon={props.icon}
            iconColor={props.iconColor}
            alignDot={props.alignDot}
            size={props.size}
            elevation={props.elevation}
            color={props.color}
            v-slots={{ default: ctx.slots.icon }}
          />

          { after.value }
        </div>
      )
    }
  },
})
