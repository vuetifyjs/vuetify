// Styles
import './VTimeline.sass'
import './VTimelineVertical.sass'

// Components
import { VTimelineSymbol } from './VTimeline'

// Utilities
import { defineComponent, inject } from 'vue'
import { convertToUnit } from '@/util'

export default defineComponent({

  name: 'VTimelineVertical',

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
          class="v-timeline-vertical"
          style={{
            // @ts-ignore
            '--v-timeline-line-width': convertToUnit(props.lineWidth),
          }}
        >
          { timeline.items.value.map((item, index) => (
            <div class="v-timeline-vertical__row" key={item}>
              <div class="v-timeline-vertical__cell" ref={e => timeline.beforeRefs.value[index] = e} />
              <div
                class="v-timeline-vertical__cell"
                style={{
                  width: '1%',
                }}
                ref={e => timeline.dividerRefs.value[index] = e}
              />
              <div class="v-timeline-vertical__cell" ref={e => timeline.afterRefs.value[index] = e} />
            </div>
          ))}
          { ctx.slots.default?.() }
        </div>
      )
    }
  },
})
