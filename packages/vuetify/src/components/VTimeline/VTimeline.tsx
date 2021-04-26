// Styles
import './VTimeline.sass'

// Types
import type { InjectionKey, Ref, Prop } from 'vue'

export type TimelineDirection = 'vertical' | 'horizontal'
export type TimelineSide = 'before' | 'after' | undefined
export type TimelineDotAlignment = 'start' | 'end' | undefined

interface TimelineInstance {
  reverse: Ref<boolean>
  singleSide: Ref<TimelineSide>
  register: (id: number, index?: number) => { isEven: Ref<boolean> }
  unregister: (id: number) => void
}

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeElevationProps } from '@/composables/elevation'

// Helpers
import { computed, defineComponent, provide, ref } from 'vue'
import { makeProps } from '@/util'

export const VTimelineSymbol: InjectionKey<TimelineInstance> = Symbol.for('vuetify:timeline')

export default defineComponent({
  name: 'VTimeline',

  props: makeProps({
    direction: {
      type: String,
      default: 'vertical',
      validator: (v: any) => ['vertical', 'horizontal'].includes(v),
    } as Prop<TimelineDirection>,
    reverse: Boolean,
    singleSide: {
      type: String,
      validator: (v: any) => v == null || ['after', 'before'].includes(v),
    } as Prop<TimelineSide>,
    ...makeElevationProps(),
    ...makeTagProps(),
  }),

  setup (props, ctx) {
    const items = ref<number[]>([])

    function register (id: number, index?: number) {
      if (index) {
        items.value.splice(index, 0, id)
      } else {
        items.value.push(id)
      }

      const isEven = computed(() => items.value.indexOf(id) % 2 === 0)

      return { isEven }
    }

    function unregister (id: number) {
      items.value = items.value.filter(v => v !== id)
    }

    provide(VTimelineSymbol, {
      reverse: computed(() => props.reverse),
      singleSide: computed(() => props.singleSide),
      register,
      unregister,
    })

    return () => (
      <props.tag
        class={[
          'v-timeline',
          `v-timeline--${props.direction}`,
          {
            // Position has to be set as well, otherwise timeline will be misaligned
            'v-timeline--hide-opposite': !!props.singleSide,
            'v-timeline--reverse': props.reverse,
          }
        ]}
      >
        {ctx.slots.default?.()}
      </props.tag>
    )
  }
})
