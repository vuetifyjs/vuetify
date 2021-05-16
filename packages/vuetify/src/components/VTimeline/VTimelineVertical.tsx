// Styles
import './VTimeline.sass'
import './VTimelineVertical.sass'

// Components
import { VTimelineSymbol } from './VTimeline'
import VTimelineDivider from './VTimelineDivider'
import VTimelineSide from './VTimelineSide'

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
            <div
              class="v-timeline-vertical__row"
              key={item.id}
              style={{
                // @ts-ignore
                '--v-timeline-dot-size': convertToUnit(item.elements.divider.dotSize),
              }}
            >
              <div class="v-timeline-vertical__cell">
                <VTimelineSide {...props} {...item.elements.before.props} v-slots={item.elements.before.slots} />
              </div>
              <div
                class="v-timeline-vertical__cell"
                style={{
                  width: '1%',
                }}
              >
                <VTimelineDivider {...props} {...item.elements.divider.props} v-slots={item.elements.divider.slots} />
              </div>
              <div class="v-timeline-vertical__cell">
                <VTimelineSide {...props} {...item.elements.after.props} v-slots={item.elements.after.slots} />
              </div>
            </div>
          ))}
          { ctx.slots.default?.() }
        </div>
      )
    }
  },
})
