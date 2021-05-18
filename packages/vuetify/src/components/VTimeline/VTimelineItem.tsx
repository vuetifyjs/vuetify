// Types
import type { ComponentPublicInstance, Prop } from 'vue'
import type { TimelineDotAlignment, TimelineSide } from './VTimeline'

// Components
import { VTimelineSymbol } from './VTimeline'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeSizeProps } from '@/composables/size'
import { makeElevationProps } from '@/composables/elevation'

// Helpers
import { computed, defineComponent, inject, onBeforeUnmount, ref, watch } from 'vue'
import { convertToUnit, getUid, makeProps } from '@/util'
import VTimelineSide from './VTimelineSide'
import VTimelineDivider from './VTimelineDivider'

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

    const side = computed(() => {
      let side = timeline.singleSide.value ?? props.side ?? (isEven.value ? 'before' : 'after')

      if (side && timeline.mirror.value) side = side === 'before' ? 'after' : 'before'

      return side
    })

    const hideOpposite = computed(() => props.hideOpposite ?? !!timeline.singleSide.value)

    const body = computed(() => ({
      key: `body-${side.value}`,
      props: {
        class: 'v-timeline-item__body',
        side: side.value,
      },
      slots: {
        default: ctx.slots.default,
      },
    }))

    const opposite = computed(() => ({
      key: `opposite-${side.value}`,
      props: {
        class: 'v-timeline-item__opposite',
        side: side.value === 'before' ? 'after' : 'before',
      },
      slots: {
        default: !hideOpposite.value && ctx.slots.opposite,
      },
    }))

    const before = computed(() => side.value === 'before' ? body.value : opposite.value)
    const after = computed(() => side.value === 'before' ? opposite.value : body.value)

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
        <>
          <VTimelineSide
            key={before.value.key}
            {...before.value.props}
            style={{
              '--v-timeline-dot-size': convertToUnit(dotSize.value),
            }}
            v-slots={before.value.slots}
          />
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
          <VTimelineSide
            key={after.value.key}
            {...after.value.props}
            style={{
              '--v-timeline-dot-size': convertToUnit(dotSize.value),
            }}
            v-slots={after.value.slots}
          />
        </>
      )
    }
  },
})
