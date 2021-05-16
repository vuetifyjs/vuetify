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
import { computed, defineComponent, inject, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
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

    const side = computed(() => {
      let side = timeline.singleSide.value ?? props.side ?? (isEven.value ? 'before' : 'after')

      if (side && timeline.mirror.value) side = side === 'before' ? 'after' : 'before'

      return side
    })

    const hideOpposite = computed(() => props.hideOpposite ?? !!timeline.singleSide.value)

    const body = computed(() => ({
      props: {
        class: 'v-timeline-item__body',
        side: side.value,
      },
      slots: {
        default: ctx.slots.default,
      },
    }))

    const opposite = computed(() => ({
      props: {
        class: 'v-timeline-item__opposite',
        side: side.value === 'before' ? 'after' : 'before',
      },
      slots: {
        default: !hideOpposite.value && ctx.slots.opposite,
      },
    }))

    const dotSize = ref(0)
    const dividerRef = ref<ComponentPublicInstance>()
    watch(dividerRef, newValue => {
      if (!newValue) return
      dotSize.value = newValue.$el.querySelector('.v-timeline-item__dot').getBoundingClientRect().width
    }, {
      flush: 'post',
    })

    watchEffect(() => {
      before.value = side.value === 'before' ? body.value : opposite.value

      divider.value = {
        dotSize,
        props: {
          ref: (e: any) => {
            dividerRef.value = e
          },
          hideDot: props.hideDot,
          icon: props.icon,
          iconColor: props.iconColor,
          alignDot: props.alignDot,
          size: props.size,
          elevation: props.elevation,
          color: props.elevation,
        },
        slots: {
          default: ctx.slots.icon,
        },
      }

      after.value = side.value === 'before' ? opposite.value : body.value
    })

    return () => null
  },
})
