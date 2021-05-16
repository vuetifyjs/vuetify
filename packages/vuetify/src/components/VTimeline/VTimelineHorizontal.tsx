// Styles
import './VTimelineHorizontal.sass'

// Components
import { VTimelineSymbol } from './VTimeline'

// Utilities
import { defineComponent, inject } from 'vue'
import { convertToUnit } from '@/util'

export default defineComponent({
  name: 'VTimelineHorizontal',

  inheritAttrs: false,

  props: {
    lineColor: String,
    lineWidth: [String, Number],
  },

  setup (props, ctx) {
    const timeline = inject(VTimelineSymbol)

    if (!timeline) throw new Error('asd')

    return () => {
      return (
        <div
          class="v-timeline-horizontal"
          style={{
            // @ts-ignore
            '--v-timeline-line-width': convertToUnit(props.lineWidth),
          }}
        >
          <div class="v-timeline-horizontal__before">
            { timeline.items.value.map((item, index) => (
              <div class="v-timeline-horizontal__cell" key={item} ref={e => timeline.beforeRefs.value[index] = e}>
              </div>
            )) }
          </div>
          <div class="v-timeline-horizontal__divider">
            { timeline.items.value.map((item, index) => (
              <div class="v-timeline-horizontal__cell" key={item} ref={e => timeline.dividerRefs.value[index] = e}>
              </div>
            )) }
          </div>
          <div class="v-timeline-horizontal__after">
            { timeline.items.value.map((item, index) => (
              <div class="v-timeline-horizontal__cell" key={item} ref={e => timeline.afterRefs.value[index] = e}>
              </div>
            )) }
          </div>
          { ctx.slots.default?.() }
        </div>
      )
    }
  },
})
