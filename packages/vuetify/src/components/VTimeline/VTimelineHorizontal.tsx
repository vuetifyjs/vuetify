import './VTimelineHorizontal.sass'
import { defineComponent, inject } from 'vue'
import { VTimelineSymbol } from './VTimeline'

export default defineComponent({
  name: 'VTimelineHorizontal',

  setup (props, ctx) {
    const timeline = inject(VTimelineSymbol)

    if (!timeline) throw new Error('asd')

    return () => {
      return (
        <div class="v-timeline-horizontal">
          <div class="v-timeline-horizontal__before">
            { timeline.items.value.map(item => (
              <div class="v-timeline-horizontal__cell">
                { item.elements.before }
              </div>
            )) }
          </div>
          <div class="v-timeline-horizontal__divider">
            { timeline.items.value.map(item => (
              <div class="v-timeline-horizontal__cell">
                { item.elements.divider }
              </div>
            )) }
          </div>
          <div class="v-timeline-horizontal__after">
            { timeline.items.value.map(item => (
              <div class="v-timeline-horizontal__cell">
                { item.elements.after }
              </div>
            )) }
          </div>
          { ctx.slots.default?.() }
        </div>
      )
    }
  },
})
